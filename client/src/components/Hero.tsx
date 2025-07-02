import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import wolvesLogo from "@assets/image_1751447923977.png";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-club-black via-club-gray to-club-black overflow-hidden">
      {/* Background football field pattern */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Youth football training" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Large logo display */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src={wolvesLogo}
                width="120" 
                height="120" 
                alt="Wolves Football Club Logo" 
                className="rounded-full shadow-2xl border-4 border-club-gold"
              />
              <div className="absolute inset-0 rounded-full bg-club-gold opacity-20 animate-pulse-gold"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            <span className="text-club-gold-light">WOLVES</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-medium">Uşaq Futbol Klubu</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Gələcəyin futbol ulduzlarını yetişdiririk. Peşəkar məşq və dostluq mühitində uşaqlarınızın futbol bacarıqlarını inkişaf etdirin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-club-gold hover:bg-club-gold-light text-club-black font-semibold px-8 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-futbol mr-2"></i>
                Kluba Qoşul
              </Button>
            </Link>
            <Link href="/videos">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-club-gold text-club-gold hover:bg-club-gold hover:text-club-black font-semibold px-8 transition-all duration-300"
              >
                <i className="fas fa-play mr-2"></i>
                Videoları İzlə
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
