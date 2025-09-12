import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import OrderCard from "@/components/dashboard/OrderCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Clock,
  Star,
  ArrowRight,
  MessageCircle,
  Bot,
  Calendar
} from "lucide-react";

const Overview = () => {
  // Mock data
  const stats = [
    {
      title: "Vendas Hoje",
      value: "R$ 2.847,30",
      change: "12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "vs ontem"
    },
    {
      title: "Pedidos",
      value: "47",
      change: "8 novos",
      changeType: "positive" as const,
      icon: ShoppingBag,
      badge: "3 pendentes"
    },
    {
      title: "Clientes",
      value: "234",
      change: "5.2%",
      changeType: "positive" as const,
      icon: Users,
      description: "este mês"
    },
    {
      title: "Ticket Médio",
      value: "R$ 60,50",
      change: "3.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "vs mês passado"
    }
  ];

  const recentOrders = [
    {
      id: "ORD001234",
      customerName: "João Silva",
      customerPhone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - Vila Madalena",
      items: [
        { name: "Pizza Margherita", quantity: 1, price: 45.90 },
        { name: "Coca-Cola 2L", quantity: 1, price: 8.50 }
      ],
      total: 54.40,
      status: "pending" as const,
      createdAt: "14:23",
      estimatedTime: "45 min"
    },
    {
      id: "ORD001235",
      customerName: "Maria Santos",
      customerPhone: "(11) 88888-8888", 
      address: "Av. Paulista, 456 - Bela Vista",
      items: [
        { name: "Hambúrguer Artesanal", quantity: 2, price: 32.90 },
        { name: "Batata Frita", quantity: 1, price: 15.90 }
      ],
      total: 81.70,
      status: "preparing" as const,
      createdAt: "14:05",
      estimatedTime: "25 min"
    }
  ];

  // Analytics data for charts
  const salesData = [
    { name: 'Seg', value: 1200 },
    { name: 'Ter', value: 1900 },
    { name: 'Qua', value: 1600 },
    { name: 'Qui', value: 2100 },
    { name: 'Sex', value: 2800 },
    { name: 'Sáb', value: 3200 },
    { name: 'Dom', value: 2400 }
  ];

  const ordersData = [
    { name: 'Jan', value: 24 },
    { name: 'Fev', value: 13 },
    { name: 'Mar', value: 98 },
    { name: 'Abr', value: 39 },
    { name: 'Mai', value: 48 },
    { name: 'Jun', value: 38 }
  ];

  const categoryData = [
    { name: 'Pizzas', value: 45 },
    { name: 'Hambúrguers', value: 30 },
    { name: 'Massas', value: 15 },
    { name: 'Bebidas', value: 10 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Visão Geral</h2>
          <p className="text-muted-foreground">
            Acompanhe o desempenho do seu restaurante em tempo real
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Sistema Online
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <AnalyticsChart
          title="Vendas da Semana"
          description="Vendas por dia nos últimos 7 dias"
          type="bar"
          data={salesData}
        />
        <AnalyticsChart
          title="Tendência de Pedidos"
          description="Evolução mensal de pedidos"
          type="line"
          data={ordersData}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <AnalyticsChart
          title="Produtos Mais Vendidos"
          description="Distribuição por categoria"
          type="pie"
          data={categoryData}
          className="lg:col-span-1"
        />
        
        {/* Quick Insights */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Insights Rápidos
            </CardTitle>
            <CardDescription>
              Análises automáticas da sua performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Pico de Vendas</span>
                </div>
                <p className="text-sm text-green-700">
                  Sexta-feira às 19h é seu melhor horário
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Clientes Fiéis</span>
                </div>
                <p className="text-sm text-blue-700">
                  78% dos clientes fazem pedidos recorrentes
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Tempo Médio</span>
                </div>
                <p className="text-sm text-orange-700">
                  Reduza 5min no preparo para melhorar avaliações
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Receita Projetada</span>
                </div>
                <p className="text-sm text-purple-700">
                  R$ 8.500 estimado para este mês
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Pedidos Recentes
                  </CardTitle>
                  <CardDescription>
                    Gerencie seus pedidos em tempo real
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Ver todos
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <OrderCard key={order.id} {...order} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Performance Card */}
          <Card className="gradient-hero text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Star className="h-8 w-8" />
                <Badge className="bg-white/20 text-white border-white/30">
                  Hoje
                </Badge>
              </div>
              <CardTitle className="text-white">Performance</CardTitle>
              <CardDescription className="text-white/80">
                Métricas do dia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Tempo médio preparo</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="font-semibold">28 min</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Taxa de conversão</span>
                  <span className="font-semibold">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Avaliação média</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Integration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <MessageCircle className="h-8 w-8 text-green-600" />
                <Badge variant="secondary">IA Ativa</Badge>
              </div>
              <CardTitle>WhatsApp Bot</CardTitle>
              <CardDescription>
                Atendimento automatizado funcionando
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Conversas hoje</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Taxa conversão</span>
                  <span className="font-semibold">76%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Pedidos via WhatsApp</span>
                  <span className="font-semibold">18</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Bot className="h-4 w-4 mr-2" />
                  Configurar Bot
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Tarefas importantes para hoje
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Criar Promoção
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Ver Feedback Clientes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Configurar Cardápio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;