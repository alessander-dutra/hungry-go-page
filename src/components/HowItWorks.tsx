import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Clock, Rocket, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import dashboardImage from "@/assets/dashboard-preview.jpg";
import whatsappBot from "@/assets/whatsapp-bot.jpg";
import hamburguerArtesanal from "@/assets/hamburguer-artesanal.jpg";
import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import salada from "@/assets/salada-caesar.jpg";

const carouselSlides = [
{
  src: dashboardImage,
  alt: "Dashboard DeliveryPro",
  label: "📊 Dashboard Completo",
  description: "Gerencie pedidos em tempo real"
},
{
  src: whatsappBot,
  alt: "Integração WhatsApp",
  label: "💬 WhatsApp Integrado",
  description: "Pedidos direto no seu celular"
},
{
  src: hamburguerArtesanal,
  alt: "Cardápio Digital",
  label: "🍔 Cardápio Digital",
  description: "Monte seu menu com fotos incríveis"
},
{
  src: pizzaMargherita,
  alt: "Pizza no cardápio",
  label: "🍕 Qualquer Culinária",
  description: "Funciona para todo tipo de restaurante"
},
{
  src: salada,
  alt: "Salada no cardápio",
  label: "🥗 Diversidade de Produtos",
  description: "Adicione quantos itens quiser"
}];


const HowItWorks = () => {
  const steps = [
  {
    number: "01",
    title: "Cadastro Rápido",
    description: "Crie sua conta em 2 minutos. Adicione informações básicas do seu restaurante.",
    time: "2 min",
    icon: Clock
  },
  {
    number: "02",
    title: "Configure seu Cardápio",
    description: "Adicione produtos, fotos e preços. Nossa IA ajuda com descrições otimizadas.",
    time: "10 min",
    icon: Settings
  },
  {
    number: "03",
    title: "Conecte o WhatsApp",
    description: "Vincule seu WhatsApp Business. Receba pedidos direto no seu celular.",
    time: "3 min",
    icon: CheckCircle
  },
  {
    number: "04",
    title: "Comece a Vender",
    description: "Está pronto! Clientes podem pedir pelo seu site e WhatsApp. IA cuida do resto.",
    time: "0 min",
    icon: Rocket
  }];


  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
  Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <Badge variant="outline" className="mb-4">
              Processo Simples
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Seu delivery funcionando em{" "}
              <span className="gradient-text">15 minutos</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Sem burocracia, sem complicação. Nossa equipe te ajuda na migração se precisar.
            </p>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-6 group">
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {step.time}
                        </Badge>
                        <Icon size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>);

              })}
            </div>

            {/* CTA */}
            <div className="mt-12 p-6 bg-muted/50 rounded-xl border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">Precisa de ajuda na migração?</h4>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe transfere todos os seus dados gratuitamente
                  </p>
                </div>
                <Button variant="premium" size="lg" className="group">
                  Falar com Especialista
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <Card className="overflow-hidden shadow-2xl border-0">
              <CardContent className="p-0 relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {carouselSlides.map((slide, index) =>
                    <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                        <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-72 lg:h-96 object-cover" />

                        {/* Slide label */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                          <div className="text-white font-semibold text-lg">{slide.label}</div>
                          <div className="text-white/80 text-sm">{slide.description}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-md"
                  aria-label="Anterior">

                  <ChevronLeft size={18} className="text-foreground" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-md"
                  aria-label="Próximo">

                  <ChevronRight size={18} className="text-foreground" />
                </button>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-background rounded-xl p-4 shadow-lg border border-border z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Sistema Online</span>
              </div>
            </div>

          </div>

          {/* Below carousel badge */}
          <div className="mt-6 flex justify-start">
            <div className="<div className=\"absolute -bottom-4 -left-4 bg-background rounded-xl p-4 shadow-lg border border-border z-10 px-[16px]\">">
              <div className="text-sm font-medium text-primary">💡 IA ativa</div>
              <div className="text-xs text-muted-foreground">Otimizando vendas</div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">15min</div>
            <div className="text-sm text-muted-foreground">Setup médio</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Suporte</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">0%</div>
            <div className="text-sm text-muted-foreground">Taxa de setup</div>
          </div>
        </div>
      </div>
    </section>);

};

export default HowItWorks;