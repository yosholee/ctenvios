import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";

function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidFromField(value) {
	const trimmed = value.trim();
	const plainEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const namedEmail = /^[^<>]+<\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*>$/;
	return plainEmail.test(trimmed) || namedEmail.test(trimmed);
}

function normalizeEnvValue(value) {
	return value?.trim().replace(/^['"]|['"]$/g, "");
}

function buildNewsletterHtml(email, phone, consent) {
	return `
		<h2>Nuevo registro newsletter CTEnvios</h2>
		<p><strong>Fuente:</strong> Newsletter (Únete a nuestra familia)</p>
		<p><strong>Email:</strong> ${email}</p>
		<p><strong>Teléfono:</strong> ${phone}</p>
		<p><strong>Consentimiento:</strong> ${consent ? "Sí" : "No"}</p>
		<p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
	`;
}

function buildContactFormHtml(email, phone, consent) {
	return `
		<h2>Nueva consulta desde formulario de contacto CTEnvios</h2>
		<p><strong>Fuente:</strong> Formulario de contacto</p>
		<p><strong>Email:</strong> ${email}</p>
		<p><strong>Teléfono:</strong> ${phone}</p>
		<p><strong>Consentimiento:</strong> ${consent ? "Sí" : "No"}</p>
		<p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
	`;
}

export async function POST(request) {
	try {
		const body = await request.json();
		const honeypot = body?.company?.trim();
		if (honeypot) {
			return NextResponse.json({ ok: true });
		}

		const isContactForm = body?.source === "contact";
		const resendApiKey = process.env.RESEND_API_KEY;
		if (!resendApiKey) {
			return NextResponse.json(
				{ error: "Falta configurar RESEND_API_KEY en el servidor." },
				{ status: 500 },
			);
		}

		const toEmail = normalizeEnvValue(process.env.CONTACT_TO_EMAIL) || "soporte@ctenvios.com";
		const fromEmailRaw = normalizeEnvValue(process.env.CONTACT_FROM_EMAIL) || "soporte@ctenvios.com";
		const fromEmail = isValidFromField(fromEmailRaw) ? fromEmailRaw : "soporte@ctenvios.com";

		if (isContactForm) {
			const email = body?.email?.trim();
			const phone = body?.phone?.trim();
			const consent = Boolean(body?.consent);

			if (!email || !phone || !consent) {
				return NextResponse.json(
					{ error: "Por favor completa correo, teléfono y acepta el consentimiento." },
					{ status: 400 },
				);
			}
			if (!isValidEmail(email)) {
				return NextResponse.json({ error: "Correo electrónico no válido." }, { status: 400 });
			}

			const html = buildContactFormHtml(email, phone, consent);
			const resendResponse = await fetch(RESEND_API_URL, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${resendApiKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					from: fromEmail,
					to: [toEmail],
					reply_to: email,
					subject: "Nueva consulta desde formulario de contacto",
					html,
				}),
			});

			if (!resendResponse.ok) {
				const errorPayload = await resendResponse.text();
				return NextResponse.json(
					{ error: `Error enviando correo: ${errorPayload}` },
					{ status: 502 },
				);
			}
			return NextResponse.json({ ok: true });
		}

		// Newsletter flow
		const email = body?.email?.trim();
		const phone = body?.phone?.trim();
		const consent = Boolean(body?.consent);

		if (!email || !phone || !consent) {
			return NextResponse.json(
				{ error: "Por favor completa correo, teléfono y consentimiento." },
				{ status: 400 },
			);
		}
		if (!isValidEmail(email)) {
			return NextResponse.json({ error: "Correo electrónico no válido." }, { status: 400 });
		}

		const html = buildNewsletterHtml(email, phone, consent);
		const resendResponse = await fetch(RESEND_API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${resendApiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: fromEmail,
				to: [toEmail],
				reply_to: email,
				subject: "Nuevo registro newsletter CTEnvios",
				html,
			}),
		});

		if (!resendResponse.ok) {
			const errorPayload = await resendResponse.text();
			return NextResponse.json(
				{ error: `Error enviando correo: ${errorPayload}` },
				{ status: 502 },
			);
		}
		return NextResponse.json({ ok: true });
	} catch (error) {
		return NextResponse.json(
			{ error: "No se pudo procesar el formulario. Intenta nuevamente." },
			{ status: 500 },
		);
	}
}
