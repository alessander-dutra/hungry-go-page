import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KanbanColumn from "@/components/dashboard/KanbanColumn";
import KanbanCard from "@/components/dashboard/KanbanCard";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { 
  Filter, 
  Search, 
  RefreshCw, 
  Download,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const Orders = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Mock orders data with status management
  const [orders, setOrders] = useState([
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
    },
    {
      id: "ORD001238",
      customerName: "Carlos Mendes",
      customerPhone: "(11) 55555-5555",
      address: "Rua dos Três Irmãos, 555 - Pinheiros, São Paulo - SP",
      items: [
        { name: "Pizza Portuguesa G", quantity: 1, price: 52.90 },
        { name: "Guaraná 2L", quantity: 1, price: 8.00 }
      ],
      total: 60.90,
      status: "scheduled" as const,
      createdAt: "10:30",
      estimatedTime: "18:00"
    },
    {
      id: "ORD001239",
      customerName: "Beatriz Lima",
      customerPhone: "(11) 44444-4444",
      address: "Av. Faria Lima, 888 - Itaim Bibi, São Paulo - SP",
      items: [
        { name: "Cheeseburger Duplo", quantity: 1, price: 35.90 }
      ],
      total: 35.90,
      status: "cancelled" as const,
      createdAt: "13:00",
      estimatedTime: "Cancelado"
    }
  ]);

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  const getStatusCount = (status: string) => {
    return getOrdersByStatus(status).length;
  };

  const handleAcceptOrder = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: "preparing" as const }
          : order
      )
    );
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the order being dragged
    const activeOrder = orders.find(order => order.id === activeId);
    if (!activeOrder) return;

    // Determine the target status based on the column
    let newStatus: "pending" | "preparing" | "ready" | "delivered" | "scheduled" | "cancelled" | null = null;
    
    if (overId === "pending" || orders.find(o => o.id === overId)?.status === "pending") {
      newStatus = "pending";
    } else if (overId === "preparing" || orders.find(o => o.id === overId)?.status === "preparing") {
      newStatus = "preparing";
    } else if (overId === "ready" || orders.find(o => o.id === overId)?.status === "ready") {
      newStatus = "ready";
    } else if (overId === "delivered" || orders.find(o => o.id === overId)?.status === "delivered") {
      newStatus = "delivered";
    } else if (overId === "scheduled" || orders.find(o => o.id === overId)?.status === "scheduled") {
      newStatus = "scheduled";
    } else if (overId === "cancelled" || orders.find(o => o.id === overId)?.status === "cancelled") {
      newStatus = "cancelled";
    }

    if (newStatus && activeOrder.status !== newStatus) {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === activeId
            ? { ...order, status: newStatus }
            : order
        )
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeOrder = orders.find(order => order.id === activeId);
    if (!activeOrder) return;

    let newStatus: "pending" | "preparing" | "ready" | "delivered" | "scheduled" | "cancelled" | null = null;
    
    if (overId === "pending" || orders.find(o => o.id === overId)?.status === "pending") {
      newStatus = "pending";
    } else if (overId === "preparing" || orders.find(o => o.id === overId)?.status === "preparing") {
      newStatus = "preparing";
    } else if (overId === "ready" || orders.find(o => o.id === overId)?.status === "ready") {
      newStatus = "ready";
    } else if (overId === "delivered" || orders.find(o => o.id === overId)?.status === "delivered") {
      newStatus = "delivered";
    } else if (overId === "scheduled" || orders.find(o => o.id === overId)?.status === "scheduled") {
      newStatus = "scheduled";
    } else if (overId === "cancelled" || orders.find(o => o.id === overId)?.status === "cancelled") {
      newStatus = "cancelled";
    }

    if (newStatus && activeOrder.status !== newStatus) {
      const statusLabels = {
        pending: "Pendente",
        preparing: "Preparando",
        ready: "Pronto",
        delivered: "Entregue",
        scheduled: "Agendado",
        cancelled: "Cancelado"
      };
      toast.success(`Pedido movido para ${statusLabels[newStatus]}`);
    }
  };

  const activeOrder = activeId ? orders.find(order => order.id === activeId) : null;

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

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto pb-4">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 min-h-[calc(100vh-400px)]">
            <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
              <KanbanColumn
                id="scheduled"
                title="Agendados"
                count={getStatusCount("scheduled")}
                color="bg-purple-100 text-purple-800"
                itemIds={getOrdersByStatus("scheduled").map(o => o.id)}
              >
                {getOrdersByStatus("scheduled").map((order) => (
                  <KanbanCard key={order.id} {...order} />
                ))}
              </KanbanColumn>
            </div>

            <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
              <KanbanColumn
                id="pending"
                title="Pendentes"
                count={getStatusCount("pending")}
                color="bg-yellow-100 text-yellow-800"
                itemIds={getOrdersByStatus("pending").map(o => o.id)}
              >
                {getOrdersByStatus("pending").map((order) => (
                  <KanbanCard
                    key={order.id}
                    {...order}
                    onAccept={handleAcceptOrder}
                    onCancel={handleCancelOrder}
                  />
                ))}
              </KanbanColumn>
            </div>

            <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
              <KanbanColumn
                id="preparing"
                title="Preparando"
                count={getStatusCount("preparing")}
                color="bg-orange-100 text-orange-800"
                itemIds={getOrdersByStatus("preparing").map(o => o.id)}
              >
                {getOrdersByStatus("preparing").map((order) => (
                  <KanbanCard key={order.id} {...order} />
                ))}
              </KanbanColumn>
            </div>

            <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
              <KanbanColumn
                id="ready"
                title="Prontos"
                count={getStatusCount("ready")}
                color="bg-green-100 text-green-800"
                itemIds={getOrdersByStatus("ready").map(o => o.id)}
              >
                {getOrdersByStatus("ready").map((order) => (
                  <KanbanCard key={order.id} {...order} />
                ))}
              </KanbanColumn>
            </div>

            <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
              <KanbanColumn
                id="delivered"
                title="Entregues"
                count={getStatusCount("delivered")}
                color="bg-blue-100 text-blue-800"
                itemIds={getOrdersByStatus("delivered").map(o => o.id)}
              >
                {getOrdersByStatus("delivered").map((order) => (
                  <KanbanCard key={order.id} {...order} />
                ))}
              </KanbanColumn>
            </div>

            <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
              <KanbanColumn
                id="cancelled"
                title="Cancelados"
                count={getStatusCount("cancelled")}
                color="bg-red-100 text-red-800"
                itemIds={getOrdersByStatus("cancelled").map(o => o.id)}
              >
                {getOrdersByStatus("cancelled").map((order) => (
                  <KanbanCard key={order.id} {...order} />
                ))}
              </KanbanColumn>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeOrder ? (
            <Card className="opacity-90 rotate-3 cursor-grabbing">
              <CardContent className="p-4">
                <h4 className="font-semibold">Pedido #{activeOrder.id}</h4>
                <p className="text-sm text-muted-foreground">{activeOrder.customerName}</p>
              </CardContent>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Orders;