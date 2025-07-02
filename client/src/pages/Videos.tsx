import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import VideoCard from "@/components/VideoCard";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import type { Video } from "@shared/schema";

export default function Videos() {
  const { data: videos, isLoading, error } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const handleVideoPlay = (id: number) => {
    // TODO: Implement video modal or redirect to video page
    alert('Video oynadılacaq - bu funksionallıq hazırlanır');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club-black via-club-gray to-club-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-club-gold-light">Video Qalereya</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Məşqlərimiz, oyunlarımız və xüsusi anlarımızdan videolar
          </p>
        </div>
      </section>

      {/* Videos Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-56 w-full rounded-xl" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <i className="fas fa-exclamation-triangle text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Videolar yüklənə bilmədi</h3>
              <p className="text-gray-600">Xahiş edirik, daha sonra yenidən cəhd edin.</p>
            </div>
          ) : videos && videos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  onPlay={handleVideoPlay}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <i className="fas fa-video text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hələlik video yoxdur</h3>
              <p className="text-gray-600">Tezliklə yeni videolarla geri qayıdacağıq!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
