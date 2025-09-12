import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import StatsCard from "@/components/dashboard/StatsCard";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import { 
  TrendingUp, 
  Calendar, 
  Download, 
  DollarSign,
  Users,
  ShoppingBag,
  Clock,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Filter
} from "lucide-react";

const Analytics = () => {
  // Enhanced analytics data
  const dailySalesData = [
    { name: 'Seg', value: 1200, orders: 18 },
    { name: 'Ter', value: 1900, orders: 24 },
    { name: 'Qua', value: 1600, orders: 21 },
    { name: 'Qui', value: 2100, orders: 28 },
    { name: 'Sex', value: 2800, orders: 35 },
    { name: 'Sáb', value: 3200, orders: 42 },
    { name: 'Dom', value: 2400, orders: 31 }
  ];

  const monthlySalesData = [
    { name: 'Jan', value: 28400 },
    { name: 'Fev', value: 31200 },
    { name: 'Mar', value: 35800 },
    { name: 'Abr', value: 42100 },
    { name: 'Mai', value: 38600 },
    { name: 'Jun', value: 45200 }
  ];

  const customerData = [
    { name: 'Novos', value: 45 },
    { name: 'Recorrentes', value: 78 },
    { name: 'VIP', value: 23 }
  ];

  const productPerformanceData = [
    { name: 'Pizza Margherita', value: 156, category: 'Pizza' },
    { name: 'Hambúrguer Artesanal', value: 134, category: 'Hambúrguer' },
    { name: 'Pasta Carbonara', value: 98, category: 'Massa' },
    { name: 'Salada Caesar', value: 67, category: 'Salada' },
    { name: 'Coca-Cola 2L', value: 203, category: 'Bebida' }
  ];

  const hourlyData = [
    { name: '08h', value: 12 },
    { name: '10h', value: 28 },
    { name: '12h', value: 65 },
    { name: '14h', value: 45 },
    { name: '16h', value: 32 },
    { name: '18h', value: 78 },
    { name: '20h', value: 95 },
    { name: '22h', value: 54 }
  ];

  const stats = [
    {
      title: "Receita Total",
      value: "R$ 45.280,00",
      change: "15.2%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "vs mês passado"
    },
    {
      title: "Pedidos Totais",
      value: "1.247",
      change: "8.7%",
      changeType: "positive" as const,
      icon: ShoppingBag,
      description: "este mês"
    },
    {
      title: "Clientes Únicos",
      value: "892",
      change: "12.3%", 
      changeType: "positive" as const,
      icon: Users,
      description: "novos clientes"
    },
    {
      title: "Tempo Médio Entrega",
      value: "28 min",
      change: "2.1 min",
      changeType: "negative" as const,
      icon: Clock,
      description: "redução"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Avançado</h2>
          <p className="text-muted-foreground">
            Análise detalhada da performance do seu restaurante
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Período
          </Button>
          <Button variant="hero" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Vendas
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Produtos
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Tempo Real
          </TabsTrigger>
        </TabsList>

        {/* Sales Analytics */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Vendas Diárias"
              description="Receita por dia da semana"
              type="bar"
              data={dailySalesData}
            />
            <AnalyticsChart
              title="Tendência Mensal"
              description="Evolução das vendas por mês"
              type="line"
              data={monthlySalesData}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Insights de Vendas</CardTitle>
              <CardDescription>Análises inteligentes baseadas nos dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Melhor Desempenho</h4>
                  <p className="text-sm text-green-700">Sábado é seu melhor dia com R$ 3.200 em vendas</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Crescimento</h4>
                  <p className="text-sm text-blue-700">15.2% de crescimento comparado ao mês anterior</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Oportunidade</h4>
                  <p className="text-sm text-orange-700">Segunda-feira tem potencial para 30% mais vendas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Analytics */}
        <TabsContent value="orders" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Pedidos por Horário"
              description="Distribuição de pedidos ao longo do dia"
              type="line"
              data={hourlyData}
            />
            <AnalyticsChart
              title="Método de Pedido"
              description="Como os clientes fazem pedidos"
              type="pie"
              data={[
                { name: 'WhatsApp', value: 45 },
                { name: 'Website', value: 35 },
                { name: 'Telefone', value: 20 }
              ]}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">R$ 62,50</div>
                <p className="text-sm text-muted-foreground">↑ 5.2% vs mês passado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Taxa de Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                <p className="text-sm text-muted-foreground">↑ 2.1% vs mês passado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tempo Médio Preparo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600 mb-2">28 min</div>
                <p className="text-sm text-muted-foreground">↓ 2.1 min vs mês passado</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customers Analytics */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Segmentação de Clientes"
              description="Distribuição por tipo de cliente"
              type="pie"
              data={customerData}
            />
            <Card>
              <CardHeader>
                <CardTitle>Top Clientes</CardTitle>
                <CardDescription>Clientes que mais gastam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "João Silva", orders: 23, spent: "R$ 1.430,50" },
                    { name: "Maria Santos", orders: 18, spent: "R$ 1.124,30" },
                    { name: "Pedro Costa", orders: 15, spent: "R$ 987,20" }
                  ].map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.orders} pedidos</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{customer.spent}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Analytics */}
        <TabsContent value="products" className="space-y-6">
          <AnalyticsChart
            title="Performance de Produtos"
            description="Produtos mais vendidos do mês"
            type="bar"
            data={productPerformanceData}
          />
          
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Produtos em Alta</CardTitle>
                <CardDescription>Tendências de crescimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Pizza Margherita", growth: "+23%" },
                  { name: "Hambúrguer Artesanal", growth: "+18%" },
                  { name: "Pasta Carbonara", growth: "+15%" }
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{product.name}</span>
                    <Badge className="bg-green-100 text-green-800">{product.growth}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Produtos em Baixa</CardTitle>
                <CardDescription>Items que precisam de atenção</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Salada Tropical", decline: "-12%" },
                  { name: "Suco Natural", decline: "-8%" },
                  { name: "Sobremesa Especial", decline: "-5%" }
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{product.name}</span>
                    <Badge className="bg-red-100 text-red-800">{product.decline}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Real-time Analytics */}
        <TabsContent value="realtime" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <NotificationCenter />
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Atividade em Tempo Real
                </CardTitle>
                <CardDescription>
                  Monitoramento ao vivo do seu restaurante
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">3</div>
                      <div className="text-sm text-green-800">Pedidos Aguardando</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center"> 
                      <div className="text-2xl font-bold text-blue-600">5</div>
                      <div className="text-sm text-blue-800">Em Preparo</div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Últimas Atividades</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Novo pedido - João Silva</span>
                        <span className="text-muted-foreground">2 min atrás</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pedido entregue - Maria Santos</span>
                        <span className="text-muted-foreground">8 min atrás</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nova avaliação - 5 estrelas</span>
                        <span className="text-muted-foreground">12 min atrás</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;