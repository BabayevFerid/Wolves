import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { News } from "@shared/schema";

interface NewsCardProps {
  news: News;
  onReadMore?: (id: number) => void;
}

export default function NewsCard({ news, onReadMore }: NewsCardProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getBadgeVariant = (category: string) => {
    switch (category.toLowerCase()) {
      case 'qələbə':
        return 'default';
      case 'məşq':
        return 'secondary';
      case 'turnir':
        return 'outline';
      default:
        return 'default';
    }
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
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <Badge 
            variant={getBadgeVariant(news.category)}
            className={`${getBadgeColor(news.category)} px-3 py-1 text-sm font-medium`}
          >
            {news.category}
          </Badge>
          <span className="text-gray-500 text-sm ml-3">
            {formatDate(news.publishedAt)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-club-black mb-3">
          {news.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {news.excerpt}
        </p>
        <Button 
          variant="ghost" 
          className="text-club-gold hover:text-club-gold-light p-0 h-auto font-semibold"
          onClick={() => onReadMore?.(news.id)}
        >
          Ətraflı Oxu 
          <i className="fas fa-arrow-right ml-2"></i>
        </Button>
      </CardContent>
    </Card>
  );
}
