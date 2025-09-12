import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCard from "@/components/dashboard/OrderCard";
import { 
  Filter, 
  Search, 
  RefreshCw, 
  Download,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Orders = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Mock orders data
  const orders = [
    {
      id: "ORD001234",
      customerName: "João Silva",
      customerPhone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
      items: [
        { name: "Pizza Margherita G", quantity: 1, price: 45.90 },
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
      address: "Av. Paulista, 456 - Bela Vista, São Paulo - SP",
      items: [
        { name: "Hambúrguer Artesanal", quantity: 2, price: 32.90 },
        { name: "Batata Frita G", quantity: 1, price: 15.90 }
      ],
      total: 81.70,
      status: "preparing" as const,
      createdAt: "14:05",
      estimatedTime: "25 min"
    },
    {
      id: "ORD001236",
      customerName: "Pedro Costa",
      customerPhone: "(11) 77777-7777",
      address: "Rua Augusta, 789 - Consolação, São Paulo - SP",
      items: [
        { name: "Salada Caesar", quantity: 1, price: 28.90 },
        { name: "Suco Natural", quantity: 1, price: 12.50 }
      ],
      total: 41.40,
      status: "ready" as const,
      createdAt: "13:45",
      estimatedTime: "Pronto"
    },
    {
      id: "ORD001237",
      customerName: "Ana Oliveira",
      customerPhone: "(11) 66666-6666",
      address: "Rua da Consolação, 321 - República, São Paulo - SP",
      items: [
        { name: "Pasta Carbonara", quantity: 1, price: 38.90 },
        { name: "Água com Gás", quantity: 1, price: 6.50 }
      ],
      total: 45.40,
      status: "delivered" as const,
      createdAt: "12:30",
      estimatedTime: "Entregue"
    }
  ];

  const getOrdersByStatus = (status: string) => {
    if (status === "all") return orders;
    return orders.filter(order => order.status === status);
  };

  const getStatusCount = (status: string) => {
    return getOrdersByStatus(status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pedidos</h2>
          <p className="text-muted-foreground">
            Gerencie todos os pedidos do seu restaurante
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{getStatusCount("pending")}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Preparando</p>
                <p className="text-2xl font-bold text-orange-600">{getStatusCount("preparing")}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prontos</p>
                <p className="text-2xl font-bold text-green-600">{getStatusCount("ready")}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hoje</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por cliente, pedido ou telefone..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">
            Todos ({orders.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pendentes ({getStatusCount("pending")})
          </TabsTrigger>
          <TabsTrigger value="preparing">
            Preparando ({getStatusCount("preparing")})
          </TabsTrigger>
          <TabsTrigger value="ready">
            Prontos ({getStatusCount("ready")})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Entregues ({getStatusCount("delivered")})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelados (0)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} {...order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {getOrdersByStatus("pending").map((order) => (
              <OrderCard key={order.id} {...order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preparing" className="space-y-4">
          <div className="grid gap-4">
            {getOrdersByStatus("preparing").map((order) => (
              <OrderCard key={order.id} {...order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ready" className="space-y-4">
          <div className="grid gap-4">
            {getOrdersByStatus("ready").map((order) => (
              <OrderCard key={order.id} {...order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          <div className="grid gap-4">
            {getOrdersByStatus("delivered").map((order) => (
              <OrderCard key={order.id} {...order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum pedido cancelado</h3>
              <p className="text-muted-foreground">
                Ótimo! Você não tem pedidos cancelados hoje.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;