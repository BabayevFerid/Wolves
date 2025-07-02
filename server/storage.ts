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

    // Assistant coaches
    const assistantCoach1: Coach = {
      id: this.currentCoachId++,
      name: "Elxan Əliyev",
      position: "Köməkçi Məşqçi",
      experience: "3 il təcrübə",
      certificate: "Futbol federasiyası sertifikatı",
      description: "Uşaqlarla işləməkdə ixtisaslaşmış məşqçi. Gənc oyunçuların bacarıqlarını inkişaf etdirməyə fokuslanır.",
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      achievements: ["Uşaq məşqçisi", "Gənc oyunçu inkişafı mütəxəssisi"],
      isMainCoach: false,
    };
    this.coaches.set(assistantCoach1.id, assistantCoach1);

    const fitnessCoach: Coach = {
      id: this.currentCoachId++,
      name: "Səbinə Həsənova",
      position: "Fitnes Məşqçisi",
      experience: "4 il təcrübə",
      certificate: "Beynəlxalq fitnes sertifikatı",
      description: "Oyunçuların fiziki hazırlığı və sağlamlığı üçün məsul mütəxəssis. Yaralanmaların qarşısının alınması və performansın artırılması üzrə işləyir.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      achievements: ["Fiziki hazırlıq mütəxəssisi", "Beynəlxalq sertifikat"],
      isMainCoach: false,
    };
    this.coaches.set(fitnessCoach.id, fitnessCoach);

    // News articles
    const newsArticles: Omit<News, 'id'>[] = [
      {
        title: "Böyük Qələbə Turnirdə!",
        content: "Komandamız rayon turnirində əla nəticə göstərərək 1-ci yeri qazandı. Bütün oyunçularımızı təbrik edirik! Bu qələbə həm oyunçular, həm də məşqçilərimiz üçün böyük sevinc mənbəyidir.",
        excerpt: "Komandamız rayon turnirində əla nəticə göstərərək 1-ci yeri qazandı. Bütün oyunçularımızı təbrik edirik!",
        category: "Qələbə",
        imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1993&q=80",
        publishedAt: new Date('2024-01-15'),
      },
      {
        title: "Yeni Məşq Sezonuna Start",
        content: "2024-cü il üçün yeni məşq proqramımız başladı. Daha intensiv və əyləncəli məşqlər! Uşaqlarımız üçün yeni texnikalar və oyun strategiyaları öyrənəcəyik.",
        excerpt: "2024-cü il üçün yeni məşq proqramımız başladı. Daha intensiv və əyləncəli məşqlər!",
        category: "Məşq",
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
        publishedAt: new Date('2024-01-12'),
      },
      {
        title: "Yaz Turniri Elanı",
        content: "Mart ayında böyük yaz turniri keçiriləcək. Qeydiyyat başladı! Bu turnirdə müxtəlif yaş qruplarından komandalar iştirak edəcək.",
        excerpt: "Mart ayında böyük yaz turniri keçiriləcək. Qeydiyyat başladı!",
        category: "Turnir",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        publishedAt: new Date('2024-01-08'),
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
      createdAt: new Date(),
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
