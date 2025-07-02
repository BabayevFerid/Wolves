import { 
  news, coaches, videos, contacts,
  type News, type InsertNews,
  type Coach, type InsertCoach,
  type Video, type InsertVideo,
  type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // News
  getNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;

  // Coaches
  getCoaches(): Promise<Coach[]>;
  getCoachById(id: number): Promise<Coach | undefined>;
  getMainCoach(): Promise<Coach | undefined>;
  createCoach(coach: InsertCoach): Promise<Coach>;

  // Videos
  getVideos(): Promise<Video[]>;
  getVideoById(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;

  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private news: Map<number, News>;
  private coaches: Map<number, Coach>;
  private videos: Map<number, Video>;
  private contacts: Map<number, Contact>;
  private currentNewsId: number;
  private currentCoachId: number;
  private currentVideoId: number;
  private currentContactId: number;

  constructor() {
    this.news = new Map();
    this.coaches = new Map();
    this.videos = new Map();
    this.contacts = new Map();
    this.currentNewsId = 1;
    this.currentCoachId = 1;
    this.currentVideoId = 1;
    this.currentContactId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample data for the Wolves football club
    
    // Main coach - Fərhad Babayev
    const mainCoach: Coach = {
      id: this.currentCoachId++,
      name: "Fərhad Babayev",
      position: "Baş Məşqçi",
      experience: "5 il təcrübə",
      certificate: "UEFA D kateqoriya sertifikatı",
      description: "Hər uşağın özünəməxsus potensialı var. Mənim məqsədim onların futbol bacarıqlarını inkişaf etdirməklə yanaşı, komanda ruhu və özgüvən aşılamaqdır. Əyləncəli və təhsil verici mühitdə uşaqlar həm öyrənir, həm də sevdikləri oyunu oynayırlar.",
      imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
      achievements: ["50+ məşq etdiyi oyuncu", "3 qazanılan turnir", "95% valideyn məmnuniyyəti"],
      isMainCoach: true,
    };
    this.coaches.set(mainCoach.id, mainCoach);

    // News articles
    const newsArticles: Omit<News, 'id'>[] = [
      {
        title: "Yeni Məşq Sezonuna Start",
        content: "2025-ci il yay sezonuna hazırlıq məşqləri başladı! Wolves Uşaq Futbol Klubu olaraq, yeni mövsümə böyük həvəs və yeniliklər ilə giririk. Bu məvsümdə uşaqlarımız üçün daha texniki və taktiki yönlü məşq proqramı hazırlamışıq. \n\nBaş məşqçimiz Fərhad Babayev rəhbərliyində hazırlanan məşq planı aşağıdakı əsas istiqamətləri əhatə edir:\n\n• Texniki bacarıqların inkişafı (top idarəetməsi, ötürmə, vuruş)\n• Taktiki biliklərin formalaşdırılması (mövqe alma, komanda oyunu)\n• Fiziki hazırlığın gücləndirilməsi (sürət, çeviklik, dözümlülük)\n• Komanda ruhunun artırılması (əməkdaşlıq, dostluq, güvən)\n\nMəşqlərimiz həftənin 3 günü (Çərşənbə axşamı, Cuma və Bazar günləri) Yeni Günəşli məkanında keçirilir. Hər yaş qrupu üçün xüsusi vaxt cədvəli və məşq intensivliyi nəzərdə tutulub.\n\nYeni sezona qoşulmaq istəyən valideynlər bizimə əlaqə bölməsindən yazaraq məlumat ala bilərlər.",
        excerpt: "2025-ci il yay sezonuna hazırlıq məşqləri başladı! Wolves klubu yeni mövsümə böyük həvəs və yeniliklər ilə giririk.",
        category: "Məşq",
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
        publishedAt: new Date('2025-06-15'),
      },
    ];

    newsArticles.forEach(article => {
      const newsItem: News = {
        id: this.currentNewsId++,
        ...article,
      };
      this.news.set(newsItem.id, newsItem);
    });

    // Videos
    const videoItems: Omit<Video, 'id'>[] = [
      {
        title: "Məşq Anları",
        description: "Son məşqimizdən ən yaxşı anlar",
        thumbnailUrl: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
        videoUrl: "#",
        category: "Məşq",
      },
      {
        title: "Oyun Anları",
        description: "Turnir oyunumuzdan qollar",
        thumbnailUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2049&q=80",
        videoUrl: "#",
        category: "Oyun",
      },
      {
        title: "Qələbə Sevinci",
        description: "Kubuk qazandıqdan sonra",
        thumbnailUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        videoUrl: "#",
        category: "Qələbə",
      },
    ];

    videoItems.forEach(video => {
      const videoItem: Video = {
        id: this.currentVideoId++,
        ...video,
      };
      this.videos.set(videoItem.id, videoItem);
    });
  }

  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const newsItem: News = {
      id: this.currentNewsId++,
      ...insertNews,
      publishedAt: new Date(),
    };
    this.news.set(newsItem.id, newsItem);
    return newsItem;
  }

  // Coach methods
  async getCoaches(): Promise<Coach[]> {
    return Array.from(this.coaches.values());
  }

  async getCoachById(id: number): Promise<Coach | undefined> {
    return this.coaches.get(id);
  }

  async getMainCoach(): Promise<Coach | undefined> {
    return Array.from(this.coaches.values()).find(coach => coach.isMainCoach);
  }

  async createCoach(insertCoach: InsertCoach): Promise<Coach> {
    const coach: Coach = {
      id: this.currentCoachId++,
      ...insertCoach,
      achievements: insertCoach.achievements ?? null,
      isMainCoach: insertCoach.isMainCoach ?? null,
    };
    this.coaches.set(coach.id, coach);
    return coach;
  }

  // Video methods
  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values());
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const video: Video = {
      id: this.currentVideoId++,
      ...insertVideo,
    };
    this.videos.set(video.id, video);
    return video;
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: this.currentContactId++,
      ...insertContact,
      phone: insertContact.phone ?? null,
      childAge: insertContact.childAge ?? null,
      createdAt: new Date(),
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
