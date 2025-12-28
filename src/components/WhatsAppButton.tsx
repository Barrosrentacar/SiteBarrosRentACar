import { useState } from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Replace with your WhatsApp number (international format without + or spaces)
  const phoneNumber = "2389876543"; // Example: Cape Verde number
  const message = encodeURIComponent(
    "Bonjour, j'aimerais avoir plus d'informations pour une location de voiture au Cap-Vert."
  );
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`bg-card text-card-foreground px-4 py-2 rounded-xl shadow-elevated text-sm font-medium transition-all duration-300 ${
          isHovered 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        Une question ? Contactez-nous !
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Contactez-nous sur WhatsApp"
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        
        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="w-7 h-7 md:w-8 md:h-8 relative z-10"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.924 15.924 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.318 22.614c-.396 1.116-1.954 2.042-3.216 2.312-.864.184-1.992.33-5.792-1.244-4.86-2.014-7.986-6.95-8.228-7.272-.232-.322-1.95-2.6-1.95-4.96s1.234-3.52 1.672-4.002c.396-.436.924-.628 1.326-.628.16 0 .304.008.434.016.44.02.66.046.95.736.362.862 1.246 3.04 1.354 3.262.11.222.22.522.07.832-.14.32-.262.462-.484.714-.222.252-.432.446-.654.718-.2.24-.426.496-.184.936.242.44 1.078 1.776 2.314 2.876 1.59 1.418 2.93 1.858 3.344 2.066.316.158.694.128.946-.142.318-.34.71-.904 1.108-1.46.284-.396.642-.446.99-.302.352.134 2.224 1.048 2.606 1.238.382.19.636.286.73.444.092.158.092.912-.304 2.028z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
