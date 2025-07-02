import { db } from "./db";
import { news, coaches, videos } from "@shared/schema";

async function seedDatabase() {
  try {
    console.log("Seeding database...");
    
    // Insert main coach
    const [coach] = await db.insert(coaches).values({
      name: "Fərhad Babayev",
      position: "Baş Məşqçi", 
      experience: "5 il təcrübə",
      certificate: "UEFA D kateqoriya sertifikatı",
      description: "Hər uşağın özünəməxsus potensialı var. Mənim məqsədim onların futbol bacarıqlarını inkişaf etdirməklə yanaşı, komanda ruhu və özgüvən aşılamaqdır. Əyləncəli və təhsil verici mühitdə uşaqlar həm öyrənir, həm də sevdikləri oyunu oynayırlar.",
      imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
      achievements: ["3 yaş qrupu", "6 həftəlik məşq", "100% təhlükəsizlik", "4.9 valideyn reytinqi"],
      isMainCoach: true
    }).returning();
    
    console.log("Coach inserted:", coach);
    
    // Insert news article
    const [newsItem] = await db.insert(news).values({
      title: "Yeni Məşq Sezonuna Start",
      content: "2025-ci il yay sezonuna hazırlıq məşqləri başladı! Wolves Uşaq Futbol Klubu olaraq, yeni mövsümə böyük həvəs və yeniliklər ilə giririk. Bu məvsümdə uşaqlarımız üçün daha texniki və taktiki yönlü məşq proqramı hazırlamışıq. \n\nBaş məşqçimiz Fərhad Babayev rəhbərliyində hazırlanan məşq planı aşağıdakı əsas istiqamətləri əhatə edir:\n\n• Texniki bacarıqların inkişafı (top idarəetməsi, ötürmə, vuruş)\n• Taktiki biliklərin formalaşdırılması (mövqe alma, komanda oyunu)\n• Fiziki hazırlığın gücləndirilməsi (sürət, çeviklik, dözümlülük)\n• Komanda ruhunun artırılması (əməkdaşlıq, dostluq, güvən)\n\nMəşqlərimiz həftənin 3 günü (Çərşənbə axşamı, Cuma və Bazar günləri) Yeni Günəşli məkanında keçirilir. Hər yaş qrupu üçün xüsusi vaxt cədvəli və məşq intensivliyi nəzərdə tutulub.\n\nYeni sezona qoşulmaq istəyən valideynlər bizimə əlaqə bölməsindən yazaraq məlumat ala bilərlər.",
      excerpt: "2025-ci il yay sezonuna hazırlıq məşqləri başladı! Wolves klubu yeni mövsümə böyük həvəs və yeniliklər ilə giririk.",
      category: "Məşq",
      imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
      publishedAt: new Date("2025-06-15")
    }).returning();
    
    console.log("News inserted:", newsItem);
    
    // Insert sample video
    const [video] = await db.insert(videos).values({
      title: "Məşq Anları",
      description: "Son məşqdən çəkilmiş görüntülər",
      thumbnailUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      videoUrl: "https://www.youtube.com/watch?v=example",
      category: "Məşq"
    }).returning();
    
    console.log("Video inserted:", video);
    console.log("Database seeded successfully!");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase().then(() => process.exit(0));