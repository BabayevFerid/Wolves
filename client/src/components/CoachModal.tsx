import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Coach } from "@shared/schema";

interface CoachModalProps {
  coach: Coach | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CoachModal({ coach, isOpen, onClose }: CoachModalProps) {
  if (!coach) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="relative">
            {/* Modal header with coach image */}
            <div className="relative h-64 bg-gradient-to-br from-club-gold to-club-gold-light rounded-lg mb-8">
              <img 
                src={coach.imageUrl}
                alt={coach.name}
                className="w-32 h-32 rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 object-cover"
              />
            </div>
            
            <div className="pt-16 text-center">
              <DialogTitle className="text-3xl font-bold text-club-black mb-2">
                {coach.name}
              </DialogTitle>
              <p className="text-club-gold font-semibold text-lg mb-4">
                {coach.position}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-club-black mb-4">
              Təcrübə və Sertifikatlar
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-clock text-club-gold mr-3"></i>
                <span>{coach.experience}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-certificate text-club-gold mr-3"></i>
                <span>{coach.certificate}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-award text-club-gold mr-3"></i>
                <span>Uşaq psixologiyası kursu</span>
              </div>
              {coach.achievements && coach.achievements.length > 0 && (
                <div className="flex items-center">
                  <i className="fas fa-trophy text-club-gold mr-3"></i>
                  <span>3 turnir qalibi</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-club-black mb-4">
              Məşq Fəlsəfəsi
            </h3>
            <p className="text-gray-600 mb-4">
              {coach.description}
            </p>
          </div>
        </div>
        
        {coach.achievements && coach.achievements.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-club-black mb-4">
              Nailiyyətlər
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {coach.achievements.map((achievement, index) => (
                <Card key={index} className="p-4 text-center bg-gray-50">
                  <div className="text-2xl font-bold text-club-gold mb-1">
                    {index === 0 ? "50+" : index === 1 ? "3" : "95%"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-6">
          <Button onClick={onClose} variant="outline">
            Bağla
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
