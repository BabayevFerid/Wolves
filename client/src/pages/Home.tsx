import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import NewsCard from "@/components/NewsCard";
import NewsModal from "@/components/NewsModal";
import VideoCard from "@/components/VideoCard";
import CoachCard from "@/components/CoachCard";
import CoachModal from "@/components/CoachModal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import type { News, Video, Coach } from "@shared/schema";

export default function Home() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  const { data: news, isLoading: newsLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const { data: videos, isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const { data: coaches, isLoading: coachesLoading } = useQuery<Coach[]>({
    queryKey: ["/api/coaches"],
  });

  const handleCoachProfile = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsCoachModalOpen(true);
  };

  const handleVideoPlay = (id: number) => {
    // TODO: Implement video modal or redirect to video page
    alert('Video oynadılacaq - bu funksionallıq hazırlanır');
  };

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
      <Hero />
      <StatsSection />
      
      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-club-black mb-4">Son Xəbərlər</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Klubumuzdan ən son xəbərləri və yenilikləri buradan izləyə bilərsiniz
            </p>
          </div>
          
          {newsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : news && news.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.slice(0, 3).map((article) => (
                  <NewsCard 
                    key={article.id} 
                    news={article} 
                    onReadMore={handleNewsReadMore}
                  />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/news">
                  <Button 
                    variant="outline" 
                    className="border-club-gold text-club-gold hover:bg-club-gold hover:text-club-black"
                  >
                    Bütün Xəbərlər
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              Hələlik xəbər yoxdur
            </div>
          )}
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-club-black mb-4">Video Qalereya</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Məşqlərimiz və oyunlarımızdan ən yaxşı anları izləyin
            </p>
          </div>
          
          {videosLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-56 animate-pulse"></div>
              ))}
            </div>
          ) : videos && videos.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    onPlay={handleVideoPlay}
                  />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/videos">
                  <Button 
                    variant="outline" 
                    className="border-club-gold text-club-gold hover:bg-club-gold hover:text-club-black"
                  >
                    Bütün Videolar
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              Hələlik video yoxdur
            </div>
          )}
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-club-black mb-4">Məşqçilərimiz</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Peşəkar və təcrübəli məşqçi heyətimiz
            </p>
          </div>
          
          {coachesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : coaches && coaches.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coaches.map((coach) => (
                  <CoachCard 
                    key={coach.id} 
                    coach={coach} 
                    onViewProfile={handleCoachProfile}
                  />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/coaches">
                  <Button 
                    variant="outline" 
                    className="border-club-gold text-club-gold hover:bg-club-gold hover:text-club-black"
                  >
                    Bütün Məşqçilər
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              Məşqçi məlumatı yoxdur
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
      
      <NewsModal 
        news={selectedNews}
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
      />
    </div>
  );
}
