import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KanbanColumn from "@/components/dashboard/KanbanColumn";
import KanbanCard from "@/components/dashboard/KanbanCard";
import OrderDetailsModal from "@/components/dashboard/OrderDetailsModal";
import OrderAlertSettings from "@/components/dashboard/OrderAlertSettings";
import PrintTicketModal from "@/components/dashboard/PrintTicketModal";
import { useOrderAlerts } from "@/hooks/useOrderAlerts";
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

interface StatusHistory {
  status: string;
  timestamp: string;
  note?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "scheduled" | "cancelled";
  createdAt: string;
  estimatedTime: string;
  customerNotes?: string;
  statusHistory?: StatusHistory[];
}

const Orders = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [orderToPrint, setOrderToPrint] = useState<Order | null>(null);
  const { playSound } = useOrderAlerts();
  
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

  const handlePrintOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setOrderToPrint(order);
      setPrintModalOpen(true);
    }
  };

  // Simulate new order arriving (for demo purposes)
  const simulateNewOrder = () => {
    const newOrder: Order = {
      id: `ORD00${Date.now().toString().slice(-4)}`,
      customerName: "Novo Cliente",
      customerPhone: "(11) 12345-6789",
      address: "Rua Nova, 100 - Centro, São Paulo - SP",
      items: [{ name: "Pizza Margherita G", quantity: 1, price: 45.90 }],
      total: 45.90,
      status: "pending",
      createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: "45 min",
      statusHistory: [{ status: "pending", timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), note: "Pedido recebido" }]
    };
    
    setOrders(prev => [newOrder, ...prev]);
    playSound();
    toast.success("Novo pedido recebido!", { description: `Pedido #${newOrder.id}` });
  };

  // Mock orders data with status management
  const [orders, setOrders] = useState<Order[]>([
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
      status: "pending",
      createdAt: "14:23",
      estimatedTime: "45 min",
      customerNotes: "Sem cebola na pizza, por favor.",
      statusHistory: [
        { status: "pending", timestamp: "14:23", note: "Pedido recebido" }
      ]
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
      status: "preparing",
      createdAt: "14:05",
      estimatedTime: "25 min",
      customerNotes: "Ponto da carne: ao ponto",
      statusHistory: [
        { status: "preparing", timestamp: "14:10", note: "Pedido aceito e em preparo" },
        { status: "pending", timestamp: "14:05", note: "Pedido recebido" }
      ]
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
      status: "ready",
      createdAt: "13:45",
      estimatedTime: "Pronto",
      statusHistory: [
        { status: "ready", timestamp: "14:00", note: "Pedido pronto para entrega" },
        { status: "preparing", timestamp: "13:50", note: "Pedido em preparo" },
        { status: "pending", timestamp: "13:45", note: "Pedido recebido" }
      ]
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
      status: "delivered",
      createdAt: "12:30",
      estimatedTime: "Entregue",
      statusHistory: [
        { status: "delivered", timestamp: "13:15", note: "Pedido entregue" },
        { status: "ready", timestamp: "13:00", note: "Pedido pronto" },
        { status: "preparing", timestamp: "12:40", note: "Pedido em preparo" },
        { status: "pending", timestamp: "12:30", note: "Pedido recebido" }
      ]
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
      status: "scheduled",
      createdAt: "10:30",
      estimatedTime: "18:00",
      customerNotes: "Entregar após às 18h",
      statusHistory: [
        { status: "scheduled", timestamp: "10:30", note: "Pedido agendado para 18:00" }
      ]
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
      status: "cancelled",
      createdAt: "13:00",
      estimatedTime: "Cancelado",
      customerNotes: "Cliente cancelou por demora",
      statusHistory: [
        { status: "cancelled", timestamp: "13:30", note: "Cancelado pelo cliente" },
        { status: "pending", timestamp: "13:00", note: "Pedido recebido" }
      ]
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

  const handleViewDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setModalOpen(true);
    }
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    setSelectedOrder(updatedOrder);
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
          <OrderAlertSettings />
          <Button variant="outline" size="sm" onClick={simulateNewOrder}>
            + Simular Pedido
          </Button>
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
                  <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
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
                    onViewDetails={handleViewDetails}
                    onPrint={handlePrintOrder}
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
                  <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
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
                  <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
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
                  <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
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
                  <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
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

      <OrderDetailsModal
        order={selectedOrder}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onUpdateOrder={handleUpdateOrder}
        onPrint={handlePrintOrder}
      />

      <PrintTicketModal
        order={orderToPrint}
        open={printModalOpen}
        onOpenChange={setPrintModalOpen}
      />
    </div>
  );
};

export default Orders;