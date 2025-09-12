import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-delivery.jpg";

const Hero = () => {
  return (
    <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 hero-pattern">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
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
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group">
                Começar Grátis Agora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Ver Demonstração
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Já escolhido por mais de 1.000 restaurantes
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-8 opacity-60">
                <div className="text-sm font-medium">RestauranteXYZ</div>
                <div className="text-sm font-medium">PizzariaABC</div>
                <div className="text-sm font-medium">BistrôDEF</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="DeliveryPro Platform Interface" 
                className="w-full h-auto"
              />
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
    </section>
  );
};

export default Hero;