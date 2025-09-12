import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  DollarSign, 
  MessageCircle, 
  TrendingUp, 
  Smartphone, 
  BarChart3,
  Shield,
  Zap,
  Users
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Comissão Justa",
      description: "Apenas 5-8% vs 20-25% dos concorrentes. Mais lucro para o seu negócio.",
      badge: "Economia real",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Bot,
      title: "IA Integrada",
      description: "Chatbot inteligente que aumenta vendas, sugere produtos e atende 24h via WhatsApp.",
      badge: "Powered by Gemini",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Nativo",
      description: "Receba pedidos direto no WhatsApp Business. Sem apps adicionais, sem complicação.",
      badge: "WhatsApp Business",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: TrendingUp,
      title: "Analytics Inteligente",
      description: "Relatórios que mostram o que vende mais, quando vende mais e como aumentar o ticket.",
      badge: "Insights preditivos",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Smartphone,
      title: "Site Próprio",
      description: "Tenha seu próprio site de delivery. Clientes pedem direto de você, não de terceiros.",
      badge: "White-label",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: BarChart3,
      title: "Otimização Automática",
      description: "IA ajusta preços, sugere promoções e otimiza seu cardápio para máxima conversão.",
      badge: "Auto-otimização",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Pagamentos seguros com PIX instantâneo e cartão. Proteção contra fraudes.",
      badge: "Certificado PCI",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Zap,
      title: "Setup Rápido",
      description: "Em 15 minutos seu delivery está funcionando. Suporte dedicado para migração.",
      badge: "15 min setup",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: Users,
      title: "Gestão de Equipe",
      description: "Controle equipe, entregadores e performance. Dashboards para cada função.",
      badge: "Multi-usuário",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Recursos Exclusivos
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Tudo que você precisa para{" "}
            <span className="gradient-text">dominar o mercado</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recursos avançados que grandes plataformas cobram caro, você tem incluso desde o primeiro dia.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-hover border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            E muito mais recursos sendo adicionados semanalmente
          </p>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-primary border-primary">
              Roadmap público disponível
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;