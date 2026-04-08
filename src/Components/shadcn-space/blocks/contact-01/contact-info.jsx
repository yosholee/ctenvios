"use client";;



const ContactInfo = () => {
  return (
    <div className="flex flex-col md:gap-12 gap-8 text-white">
      <div
        className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-10 duration-1000 ease-in-out fill-mode-both">
     
        <p className="text-3xl  md:text-4xl font-medium text-white">
          Contáctanos para obtener más información sobre nuestros servicios.
        </p>
      </div>
      <div
        className="flex flex-col sm:flex-row justify-between gap-6 animate-in fade-in slide-in-from-left-10 duration-1000 delay-100 ease-in-out fill-mode-both">
        <div className="flex flex-col gap-1 bg-gray-200/10 p-4 rounded-lg">
          <p className="text-sm font-normal text-white">Teléfono</p>
          <a href="tel:+17867163382" className="text-base font-medium text-white">
            +17867163382
          </a>
        </div>
        <div className="flex flex-col gap-1 bg-gray-200/10 p-4 rounded-lg">
          <p className="text-sm font-normal text-white">Correo</p>
          <a
            href="mailto:soporte@ctenvios.com"
            className="text-base font-medium text-white">
            soporte@ctenvios.com
          </a>
        </div>
      </div>
      <div
        className="flex flex-col gap-1 bg-gray-200/10 p-4 rounded-lg animate-in fade-in slide-in-from-left-10 duration-1000 delay-100 ease-in-out fill-mode-both">
        <p className="text-sm font-normal text-white">Ubicación</p>
        <p className="text-base font-medium text-white">
            10230 NW 80th Ave. Hialeah Gardens
        </p>
      </div>
       
    </div>
  );
};

export default ContactInfo;
