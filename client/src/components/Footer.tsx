import { Link } from "wouter";
import wolvesLogo from "@assets/image_1751447923977.png";

export default function Footer() {
  const navLinks = [
    { path: "/", label: "Ana Səhifə" },
    { path: "/news", label: "Xəbərlər" },
    { path: "/videos", label: "Videolar" },
    { path: "/coaches", label: "Məşqçilər" },
    { path: "/contact", label: "Əlaqə" },
  ];

  const socialLinks = [
    { icon: "fab fa-facebook-f", href: "#", label: "Facebook" },
    { icon: "fab fa-instagram", href: "#", label: "Instagram" },
    { icon: "fab fa-youtube", href: "#", label: "YouTube" },
    { icon: "fab fa-whatsapp", href: "#", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-club-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src={wolvesLogo}
                width="32" 
                height="32" 
                alt="Wolves Logo" 
                className="rounded-full"
              />
              <span className="ml-3 text-club-gold-light font-bold text-xl">WOLVES</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Gələcəyin futbol ulduzlarını yetişdirən peşəkar uşaq futbol klubu. Dostluq, inkişaf və qələbə!
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-club-gold mb-4">Sürətli Keçidlər</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="text-gray-400 hover:text-club-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-club-gold mb-4">Əlaqə</h3>
            <div className="space-y-2">
              <p className="text-gray-400 flex items-center">
                <i className="fas fa-map-marker-alt text-club-gold mr-2"></i>
                Yeni Günəşli
              </p>
              <p className="text-gray-400 flex items-center">
                <i className="fas fa-clock text-club-gold mr-2"></i>
                B.e - Cümə: 16:00-19:00
              </p>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-club-gold mb-3">Sosial Şəbəkələr</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-club-gray text-club-gold p-2 rounded-lg hover:bg-gray-600 transition-colors"
                    aria-label={social.label}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Wolves Uşaq Futbol Klubu. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  );
}
