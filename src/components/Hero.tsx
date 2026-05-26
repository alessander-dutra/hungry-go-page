import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp, Users, Utensils, Pizza, Coffee, Beef } from "lucide-react";
import heroImageDefault from "@/assets/hero-delivery.jpg";
const clients = [{
  name: "Burger House",
  category: "Hamburguer",
  rating: 4.9,
  orders: "15k+",
  icon: Beef,
  gradient: "from-orange-500 to-red-500"
}, {
  name: "Pizza Express",
  category: "Pizzaria",
  rating: 4.8,
  orders: "22k+",
  icon: Pizza,
  gradient: "from-yellow-500 to-orange-500"
}, {
  name: "Café Gourmet",
  category: "Cafeteria",
  rating: 4.7,
  orders: "8k+",
  icon: Coffee,
  gradient: "from-amber-600 to-yellow-500"
}, {
  name: "Sabor Brasil",
  category: "Brasileira",
  rating: 4.9,
  orders: "12k+",
  icon: Utensils,
  gradient: "from-green-500 to-emerald-500"
}];
const Hero = () => {
  const [heroImage, setHeroImage] = useState(heroImageDefault);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('restaurant_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (data && (data as any).hero_image_url) {
        setHeroImage((data as any).hero_image_url);
      }
    };
    load();
  }, []);

  return <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 hero-pattern">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp size={16} />
              Plataforma mais justa do Brasil
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              O futuro do{" "}
              <span className="gradient-text">delivery</span>{" "}
              está aqui
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Plataforma inteligente com <strong>5-8% de comissão</strong>, 
              integração WhatsApp nativa e IA que aumenta suas vendas automaticamente.
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                <Star className="text-accent" size={16} />
                <span className="text-sm font-medium">Comissão até 50% menor</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                <Users className="text-primary" size={16} />
                <span className="text-sm font-medium">IA personalizada</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="hero" size="xl" className="group" asChild>
                <a href="/register">
                  Começar Grátis Agora
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="/restaurant">Ver Cardápio Demo</a>
              </Button>
            </div>

            {/* Social Proof - Modern Client Showcase */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{["B", "P", "C", "S"][i]}</span>
                    </div>)}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">+1.000</span> restaurantes já confiam em nós
                </p>
              </div>
              
              {/* Client Cards Grid */}
              
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={heroImage} alt="DeliveryPro Platform Interface" className="w-full h-auto" width={1200} height={800} fetchPriority="high" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-border">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-border">
              <div className="text-2xl font-bold text-accent">+40%</div>
              <div className="text-sm text-muted-foreground">Mais vendas</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;