import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { News } from "@shared/schema";

interface NewsModalProps {
  news: News | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsModal({ news, isOpen, onClose }: NewsModalProps) {
  if (!news) return null;

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'qələbə':
        return 'bg-club-gold text-club-black';
      case 'məşq':
        return 'bg-field-green text-white';
      case 'turnir':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-club-gold text-club-black';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="relative">
            {/* News image */}
            <div className="relative h-64 bg-gradient-to-br from-club-gold to-club-gold-light rounded-lg mb-6 overflow-hidden">
              <img 
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute bottom-4 left-4">
                <Badge 
                  className={`${getBadgeColor(news.category)} px-3 py-1 text-sm font-medium`}
                >
                  {news.category}
                </Badge>
              </div>
            </div>
            
            <div className="text-left">
              <DialogTitle className="text-3xl font-bold text-club-black mb-2">
                {news.title}
              </DialogTitle>
              <p className="text-gray-500 text-sm mb-6">
                {formatDate(news.publishedAt)}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="prose max-w-none">
          <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
        </div>
        
        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
          <Button onClick={onClose} variant="outline">
            Bağla
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}