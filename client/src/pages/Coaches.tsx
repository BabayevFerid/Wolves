import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import CoachCard from "@/components/CoachCard";
import CoachModal from "@/components/CoachModal";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import type { Coach } from "@shared/schema";

export default function Coaches() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);

  const { data: coaches, isLoading, error } = useQuery<Coach[]>({
    queryKey: ["/api/coaches"],
  });

  const handleCoachProfile = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsCoachModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club-black via-club-gray to-club-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-club-gold-light">Məşqçilərimiz</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Peşəkar və təcrübəli məşqçi heyətimiz ilə tanış olun
          </p>
        </div>
      </section>

      {/* Coaches Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-8 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <i className="fas fa-exclamation-triangle text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Məşqçi məlumatları yüklənə bilmədi</h3>
              <p className="text-gray-600">Xahiş edirik, daha sonra yenidən cəhd edin.</p>
            </div>
          ) : coaches && coaches.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coaches.map((coach) => (
                <CoachCard 
                  key={coach.id} 
                  coach={coach} 
                  onViewProfile={handleCoachProfile}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <i className="fas fa-users text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Məşqçi məlumatı yoxdur</h3>
              <p className="text-gray-600">Tezliklə məşqçi heyətimizi təqdim edəcəyik!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      
      <CoachModal 
        coach={selectedCoach}
        isOpen={isCoachModalOpen}
        onClose={() => setIsCoachModalOpen(false)}
      />
    </div>
  );
}
