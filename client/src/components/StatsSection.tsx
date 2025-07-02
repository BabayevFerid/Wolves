import { Card } from "@/components/ui/card";

export default function StatsSection() {
  const stats = [
    {
      number: "3",
      label: "Yaş Qrupu",
      icon: "fas fa-child",
    },
    {
      number: "6",
      label: "Həftəlik Məşq",
      icon: "fas fa-running",
    },
    {
      number: "100%",
      label: "Təhlükəsizlik",
      icon: "fas fa-shield-alt",
    },
    {
      number: "4.9",
      label: "Valideyn Reytinqi",
      icon: "fas fa-star",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="p-6 text-center hover:shadow-md transition-shadow duration-300 border-none bg-gray-50"
            >
              <div className="flex flex-col items-center">
                <i className={`${stat.icon} text-3xl text-club-gold mb-4`}></i>
                <div className="text-3xl font-bold text-club-gold mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
