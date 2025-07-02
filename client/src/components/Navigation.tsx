import { Link, useLocation } from "wouter";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import wolvesLogo from "@assets/image_1751447075567.png";

export default function Navigation() {
  const [location] = useLocation();
  const { isOpen, toggle, close } = useMobileMenu();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { path: "/", label: "Ana Səhifə" },
    { path: "/news", label: "Xəbərlər" },
    { path: "/videos", label: "Videolar" },
    { path: "/coaches", label: "Məşqçilər" },
    { path: "/contact", label: "Əlaqə" },
  ];

  return (
    <nav className="bg-club-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" onClick={close}>
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <img 
                  src={wolvesLogo} 
                  width="40" 
                  height="40" 
                  alt="Wolves Logo" 
                  className="rounded-full"
                />
                <span className="ml-3 text-club-gold-light font-bold text-xl">WOLVES</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-club-gold-light"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggle}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-club-gray">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={close}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "text-club-gold-light"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
