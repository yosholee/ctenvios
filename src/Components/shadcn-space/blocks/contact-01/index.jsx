import ContactInfo from "@/Components/shadcn-space/blocks/contact-01/contact-info";
import ContactForm from "@/Components/shadcn-space/blocks/contact-01/contact-form";
import Image from "next/image";
import { Marquee } from "@/Components/shadcn-space/animations/marquee";

const Contact = () => {
  return (
    <div className="relative   isolate overflow-hidden bg-gray-900 "> 
    <section className="py-10 md:py-20 bg-image-ctenvios">
      <Image
        src="/ship-new.jpg"
        alt="CTEnvios"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
      />
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto relative z-10">
        <div
          className="grid grid-cols-12 content-center justify-between gap-6 sm:gap-8 md:gap-0">
          <div className="w-full col-span-12 md:col-span-6">
            <ContactInfo />
          </div>
          <div className="col-span-1"></div>
          <div className="w-full col-span-12 md:col-span-5">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-20  w-1/2 mx-auto items-center">
          <Marquee pauseOnHover className="[--duration:20s] p-0">
            <p className="text-base font-normal text-white">
              Ayudamos a nuestros clientes a enviar sus productos a Cuba de forma segura y eficiente.
            </p>
          </Marquee>
        </div>
    </section>
    </div>
  );
};

export default Contact;
