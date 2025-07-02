import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      childAge: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Mesajınız göndərildi!",
        description: "Tezliklə sizinlə əlaqə saxlayacağıq.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: "Xəta baş verdi",
        description: "Xahiş edirik, daha sonra yenidən cəhd edin.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const socialLinks = [
    { icon: "fab fa-facebook-f", href: "https://www.facebook.com/canavarlarufk?mibextid=ZbWKwL", label: "Facebook", bgColor: "bg-blue-600" },
    { icon: "fab fa-instagram", href: "https://www.instagram.com/wolves_fc_azerbaijan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram", bgColor: "bg-pink-600" },
    { icon: "fab fa-youtube", href: "https://youtube.com/@wolves_fc_azerbaijan?si=qNp4uVlirkFUbkBG", label: "YouTube", bgColor: "bg-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club-black via-club-gray to-club-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-club-gold-light">Bizimlə Əlaqə</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Suallarınız və təklifləriniz üçün bizimlə əlaqə saxlayın
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-club-black mb-6">Əlaqə Məlumatları</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-club-gold p-3 rounded-lg mr-4">
                        <i className="fas fa-map-marker-alt text-club-black"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-club-black mb-1">Ünvan</h4>
                        <p className="text-gray-600">Yeni Günəşli</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-club-gold p-3 rounded-lg mr-4">
                        <i className="fas fa-clock text-club-black"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-club-black mb-1">Məşq Vaxtları</h4>
                        <p className="text-gray-600">Həftə içi: 16:00 - 19:00</p>
                        <p className="text-gray-600">Həftə sonu: 09:00 - 12:00</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-club-gold p-3 rounded-lg mr-4">
                        <i className="fas fa-users text-club-black"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-club-black mb-1">Yaş Qrupları</h4>
                        <p className="text-gray-600">6-8 yaş, 9-12 yaş, 13-16 yaş</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Social Media */}
              <Card className="border-none shadow-lg bg-club-gold">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-club-black mb-6">Sosial Şəbəkələr</h3>
                  <p className="text-club-black mb-6">Bizə sosial şəbəkələrdən də izləyə bilərsiniz:</p>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.bgColor} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center`}
                        aria-label={social.label}
                      >
                        <i className={`${social.icon} mr-3`}></i>
                        {social.label}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-club-black mb-6">Bizə Yazın</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ad Soyad *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ad soyadınızı daxil edin" 
                                {...field} 
                                className="focus:ring-club-gold focus:border-club-gold"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Telefon nömrənizi daxil edin" 
                                {...field} 
                                className="focus:ring-club-gold focus:border-club-gold"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="E-mail ünvanınızı daxil edin" 
                              {...field} 
                              className="focus:ring-club-gold focus:border-club-gold"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="childAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Uşağın Yaşı</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="focus:ring-club-gold focus:border-club-gold">
                                <SelectValue placeholder="Yaş seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="6-8">6-8 yaş</SelectItem>
                              <SelectItem value="9-12">9-12 yaş</SelectItem>
                              <SelectItem value="13-16">13-16 yaş</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mesaj *</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4}
                              placeholder="Mesajınızı yazın..." 
                              {...field} 
                              className="focus:ring-club-gold focus:border-club-gold"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-club-gold hover:bg-club-gold-light text-club-black font-semibold py-4 transition-colors duration-300"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Göndərilir...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>
                          Mesajı Göndər
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
