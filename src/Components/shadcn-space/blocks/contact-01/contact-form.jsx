"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const INITIAL_STATE = {
  email: "",
  phone: "",
  consent: false,
  company: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onConsentChange = (checked) => {
    setFormData((prev) => ({ ...prev, consent: checked === true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    if (!formData.consent) {
      setStatus({ type: "error", message: "Por favor acepta el consentimiento para continuar." });
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "contact" }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          message: payload?.error || "No pudimos enviar tu mensaje. Intenta nuevamente.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Gracias. Recibimos tus datos y te contactaremos pronto.",
      });
      setFormData(INITIAL_STATE);
    } catch {
      setStatus({
        type: "error",
        message: "No pudimos enviar tu mensaje. Verifica tu conexión e intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
      <Card
        className="ring-0 p-8 gap-6 md:gap-8   animate-in fade-in slide-in-from-right-10 duration-1000 delay-100 ease-in-out fill-mode-both">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-semibold text-primary">
            Únete a nuestra familia
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="max-w-md space-y-5">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Entre su Correo
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={onChange}
                placeholder="Entre su Correo"
                className="min-w-0 w-full flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-gray-900 placeholder:text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 dark:bg-background dark:text-foreground"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Entre su Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={formData.phone}
                onChange={onChange}
                placeholder="Entre su Teléfono"
                className="min-w-0 w-full flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-gray-900 placeholder:text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 dark:bg-background dark:text-foreground"
              />
            </div>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={onChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="flex items-center gap-4">
              <Checkbox
                id="consent-checkbox"
                checked={formData.consent}
                onCheckedChange={onConsentChange}
                aria-describedby="consent-description"
                className="border-2"
              />
              <label htmlFor="consent-checkbox" id="consent-description" className="sr-only">
                Consentimiento para recibir emails y mensajes de texto informativos y promocionales
              </label>
              <span className="text-sm text-primary">
                Acepto recibir emails y mensajes de texto con información y promociones de CTEnvíos.
              </span>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
            {status.message && (
              <p
                className={`text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}
                role="status"
              >
                {status.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    
  );
};

export default ContactForm;
