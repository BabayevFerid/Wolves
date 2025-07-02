import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import NewsCard from "@/components/NewsCard";
import NewsModal from "@/components/NewsModal";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import type { News } from "@shared/schema";

export default function News() {
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  const { data: news, isLoading, error } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const handleNewsReadMore = (id: number) => {
    const newsItem = news?.find(item => item.id === id);
    if (newsItem) {
      setSelectedNews(newsItem);
      setIsNewsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club-black via-club-gray to-club-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-club-gold-light">Xəbərlər</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Wolves futbol klubundan ən son xəbərlər və yenilikləri buradan izləyə bilərsiniz
          </p>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <i className="fas fa-exclamation-triangle text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Xəbərlər yüklənə bilmədi</h3>
              <p className="text-gray-600">Xahiş edirik, daha sonra yenidən cəhd edin.</p>
            </div>
          ) : news && news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article) => (
                <NewsCard 
                  key={article.id} 
                  news={article} 
                  onReadMore={handleNewsReadMore}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <i className="fas fa-newspaper text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hələlik xəbər yoxdur</h3>
              <p className="text-gray-600">Tezliklə yeni xəbərlərlə geri qayıdacağıq!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      
      <NewsModal 
        news={selectedNews}
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
      />
    </div>
  );
}
