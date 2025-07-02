import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Coach } from "@shared/schema";

interface CoachCardProps {
  coach: Coach;
  onViewProfile?: (coach: Coach) => void;
}

export default function CoachCard({ coach, onViewProfile }: CoachCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={coach.imageUrl}
          alt={`${coach.name} - ${coach.position}`}
          className="w-full h-64 object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-club-black mb-2">
            {coach.name}
          </h3>
          <p className="text-club-gold font-semibold mb-4">
            {coach.position}
          </p>
          
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <i className="fas fa-clock text-club-gold mr-3"></i>
              <span className="text-gray-600">{coach.experience}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-certificate text-club-gold mr-3"></i>
              <span className="text-gray-600">{coach.certificate}</span>
            </div>
            {coach.achievements && coach.achievements.length > 0 && (
              <div className="flex items-center">
                <i className="fas fa-trophy text-club-gold mr-3"></i>
                <span className="text-gray-600">
                  {coach.achievements[0]}
                </span>
              </div>
            )}
          </div>
          
          {coach.isMainCoach && (
            <Button 
              className="mt-6 w-full bg-club-gold hover:bg-club-gold-light text-club-black font-semibold transition-colors duration-300"
              onClick={() => onViewProfile?.(coach)}
            >
              <i className="fas fa-user mr-2"></i>
              Profilə Bax
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
