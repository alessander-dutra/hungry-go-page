import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Clock, Rocket, Settings } from "lucide-react";
import dashboardImage from "@/assets/dashboard-preview.jpg";

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
    }
  ];

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
                  </div>
                );
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

          {/* Visual */}
          <div className="relative">
            <Card className="overflow-hidden shadow-2xl border-0">
              <CardContent className="p-0">
                <img 
                  src={dashboardImage} 
                  alt="Dashboard DeliveryPro" 
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Sistema Online</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-border">
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
    </section>
  );
};

export default HowItWorks;