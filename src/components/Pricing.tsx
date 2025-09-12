import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Zap } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "5%",
      description: "Perfeito para começar",
      badge: null,
      features: [
        "Site próprio de delivery",
        "Integração WhatsApp básica", 
        "Gestão de cardápio",
        "Relatórios básicos",
        "Suporte por email",
        "PIX + Cartão",
        "Até 100 pedidos/mês"
      ],
      cta: "Começar Grátis",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "Professional", 
      price: "7%",
      description: "Para restaurantes em crescimento",
      badge: "Mais Popular",
      features: [
        "Tudo do Starter +",
        "IA integrada (chatbot avançado)",
        "Analytics preditivos",
        "Otimização automática de preços",
        "WhatsApp Business API completa",
        "Suporte prioritário",
        "App mobile personalizado",
        "Pedidos ilimitados"
      ],
      cta: "Teste Grátis 30 dias",
      variant: "hero" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "8%",
      description: "Para redes e grandes volumes",
      badge: "Máximo Poder",
      features: [
        "Tudo do Professional +",
        "Multi-lojas (gestão centralizada)",
        "API personalizada",
        "Integrações ERP/POS",
        "Manager dedicado",
        "SLA garantido",
        "White-label completo",
        "Relatórios personalizados"
      ],
      cta: "Falar com Vendas",
      variant: "premium" as const,
      popular: false
    }
  ];

  const comparison = [
    { feature: "iFood", price: "20-25%", color: "text-red-600" },
    { feature: "Rappi", price: "22-27%", color: "text-red-600" },
    { feature: "Uber Eats", price: "18-30%", color: "text-red-600" },
    { feature: "DeliveryPro", price: "5-8%", color: "text-green-600 font-bold" }
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Preços Justos
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Comissões que fazem{" "}
            <span className="gradient-text">sentido</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Pare de pagar 20-30% de comissão. Nossa tecnologia permite preços justos sem perder qualidade.
          </p>

          {/* Comparison Table */}
          <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg border border-border mb-12">
            <h3 className="font-semibold mb-4">Comparação de Comissões</h3>
            <div className="space-y-3">
              {comparison.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{item.feature}</span>
                  <span className={item.color}>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative card-hover ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''} bg-white/90 backdrop-blur-sm`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="gradient-hero text-white px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {plan.name === "Starter" && <Zap className="w-8 h-8 text-primary" />}
                  {plan.name === "Professional" && <Star className="w-8 h-8 text-primary" />}
                  {plan.name === "Enterprise" && <Crown className="w-8 h-8 text-primary" />}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">por pedido</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.variant} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Features */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Todos os planos incluem:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Setup gratuito",
              "Sem taxa de adesão", 
              "Sem fidelidade",
              "Suporte em português",
              "Migração assistida"
            ].map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center bg-white rounded-xl p-8 shadow-lg border border-border max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Garantia de 30 dias</h3>
          <p className="text-muted-foreground">
            Não ficou satisfeito? Devolvemos 100% do que você pagou, sem perguntas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;