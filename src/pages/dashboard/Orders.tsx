import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import KanbanColumn from "@/components/dashboard/KanbanColumn";
import KanbanCard from "@/components/dashboard/KanbanCard";
import OrderDetailsModal from "@/components/dashboard/OrderDetailsModal";
import OrderAlertSettings from "@/components/dashboard/OrderAlertSettings";
import PrintTicketModal from "@/components/dashboard/PrintTicketModal";
import { useOrderAlerts } from "@/hooks/useOrderAlerts";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
  AlertCircle,
  LayoutGrid,
  List,
  Phone,
  MapPin,
  Eye,
  Printer,
  CalendarClock,
  Bell
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
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
  scheduledDate?: string;
  scheduledTime?: string;
}

const Orders = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [orderToPrint, setOrderToPrint] = useState<Order | null>(null);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const isMobile = useIsMobile();
  const { playSound } = useOrderAlerts();
  const [scheduledAlerts, setScheduledAlerts] = useState<string[]>([]);

  const allColumns = [
    { id: "scheduled" as const, label: "Agendados", color: "bg-purple-500" },
    { id: "pending" as const, label: "Pendentes", color: "bg-yellow-500" },
    { id: "preparing" as const, label: "Preparando", color: "bg-orange-500" },
    { id: "ready" as const, label: "Prontos", color: "bg-green-500" },
    { id: "delivered" as const, label: "Entregues", color: "bg-blue-500" },
    { id: "cancelled" as const, label: "Cancelados", color: "bg-red-500" },
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allColumns.map(c => c.id)
  );

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };
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
      scheduledDate: new Date(Date.now() + 30 * 60 * 1000).toLocaleDateString('pt-BR'),
      scheduledTime: new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      customerNotes: "Entregar após às 18h",
      statusHistory: [
        { status: "scheduled", timestamp: "10:30", note: "Pedido agendado" }
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

  // Check scheduled orders proximity every 30 seconds
  useEffect(() => {
    const checkScheduledOrders = () => {
      const now = new Date();
      const alertIds: string[] = [];

      orders.forEach(order => {
        if (order.status === "scheduled" && order.scheduledDate && order.scheduledTime) {
          const [day, month, year] = order.scheduledDate.split('/').map(Number);
          const [hour, minute] = order.scheduledTime.split(':').map(Number);
          const scheduledDateTime = new Date(year, month - 1, day, hour, minute);
          const diffMinutes = (scheduledDateTime.getTime() - now.getTime()) / (1000 * 60);

          if (diffMinutes <= 30 && diffMinutes > -5) {
            alertIds.push(order.id);
          }
        }
      });

      setScheduledAlerts(alertIds);
    };

    checkScheduledOrders();
    const interval = setInterval(checkScheduledOrders, 30000);
    return () => clearInterval(interval);
  }, [orders]);

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Pendentes</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">{getStatusCount("pending")}</p>
              </div>
              <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Preparando</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{getStatusCount("preparing")}</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Prontos</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{getStatusCount("ready")}</p>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Hoje</p>
                <p className="text-xl sm:text-2xl font-bold">{orders.length}</p>
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
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === "kanban" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setViewMode("kanban")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Colunas ({visibleColumns.length}/{allColumns.length})
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-3" align="end">
                <p className="text-sm font-medium mb-2">Exibir colunas</p>
                <div className="space-y-2">
                  {allColumns.map(col => (
                    <label key={col.id} className="flex items-center gap-2 cursor-pointer text-sm">
                      <Checkbox
                        checked={visibleColumns.includes(col.id)}
                        onCheckedChange={() => toggleColumn(col.id)}
                      />
                      <div className={`w-2 h-2 rounded-full ${col.color}`} />
                      {col.label}
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Alerts */}
      {scheduledAlerts.length > 0 && (
        <Alert className="border-orange-300 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-800">
          <Bell className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800 dark:text-orange-300">Pedidos agendados próximos!</AlertTitle>
          <AlertDescription className="text-orange-700 dark:text-orange-400">
            {scheduledAlerts.length === 1
              ? `O pedido #${scheduledAlerts[0]} está agendado para os próximos 30 minutos.`
              : `${scheduledAlerts.length} pedidos estão agendados para os próximos 30 minutos: ${scheduledAlerts.map(id => `#${id}`).join(', ')}`
            }
          </AlertDescription>
        </Alert>
      )}

      {viewMode === "list" ? (
        /* List View */
        <div className="space-y-2">
          {(["pending", "preparing", "ready", "scheduled", "delivered", "cancelled"] as const)
            .filter(status => visibleColumns.includes(status))
            .map(status => {
            const statusOrders = getOrdersByStatus(status);
            if (statusOrders.length === 0) return null;
            const statusLabels: Record<string, string> = {
              pending: "Pendentes", preparing: "Preparando", ready: "Prontos",
              scheduled: "Agendados", delivered: "Entregues", cancelled: "Cancelados"
            };
            const statusColors: Record<string, string> = {
              pending: "bg-yellow-500", preparing: "bg-orange-500", ready: "bg-green-500",
              scheduled: "bg-purple-500", delivered: "bg-blue-500", cancelled: "bg-red-500"
            };
            return (
              <div key={status}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status]}`} />
                  <h3 className="font-semibold text-sm">{statusLabels[status]} ({statusOrders.length})</h3>
                </div>
                {statusOrders.map(order => (
                  <Card key={order.id} className="mb-2">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm">#{order.id}</span>
                            <span className="text-sm truncate">{order.customerName}</span>
                            <span className="text-xs text-muted-foreground">{order.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span className="hidden sm:inline">{order.customerPhone}</span>
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{order.address}</span>
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
                          </div>
                          {order.status === "scheduled" && order.scheduledDate && order.scheduledTime && (
                            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/30 rounded px-2 py-1 w-fit border border-purple-200 dark:border-purple-800">
                              <CalendarClock className="h-3 w-3" />
                              <span className="font-medium">Agendado: {order.scheduledDate} às {order.scheduledTime}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-bold text-sm sm:text-base">R$ {order.total.toFixed(2)}</span>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleViewDetails(order.id)}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handlePrintOrder(order.id)}>
                            <Printer className="h-3.5 w-3.5" />
                          </Button>
                          {order.status === "pending" && (
                            <>
                              <Button size="sm" className="h-8 text-xs" onClick={() => handleAcceptOrder(order.id)}>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Aceitar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        /* Kanban Board */
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="overflow-x-auto pb-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-h-[calc(100vh-400px)] min-w-[320px]`} style={{ gridTemplateColumns: visibleColumns.length > 3 ? `repeat(${Math.min(visibleColumns.length, 6)}, minmax(0, 1fr))` : undefined }}>
              {visibleColumns.includes("scheduled") && (
                <KanbanColumn id="scheduled" title="Agendados" count={getStatusCount("scheduled")} color="bg-purple-100 text-purple-800" itemIds={getOrdersByStatus("scheduled").map(o => o.id)}>
                  {getOrdersByStatus("scheduled").map((order) => (
                    <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
                  ))}
                </KanbanColumn>
              )}
              {visibleColumns.includes("pending") && (
                <KanbanColumn id="pending" title="Pendentes" count={getStatusCount("pending")} color="bg-yellow-100 text-yellow-800" itemIds={getOrdersByStatus("pending").map(o => o.id)}>
                  {getOrdersByStatus("pending").map((order) => (
                    <KanbanCard key={order.id} {...order} onAccept={handleAcceptOrder} onCancel={handleCancelOrder} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
                  ))}
                </KanbanColumn>
              )}
              {visibleColumns.includes("preparing") && (
                <KanbanColumn id="preparing" title="Preparando" count={getStatusCount("preparing")} color="bg-orange-100 text-orange-800" itemIds={getOrdersByStatus("preparing").map(o => o.id)}>
                  {getOrdersByStatus("preparing").map((order) => (
                    <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
                  ))}
                </KanbanColumn>
              )}
              {visibleColumns.includes("ready") && (
                <KanbanColumn id="ready" title="Prontos" count={getStatusCount("ready")} color="bg-green-100 text-green-800" itemIds={getOrdersByStatus("ready").map(o => o.id)}>
                  {getOrdersByStatus("ready").map((order) => (
                    <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
                  ))}
                </KanbanColumn>
              )}
              {visibleColumns.includes("delivered") && (
                <KanbanColumn id="delivered" title="Entregues" count={getStatusCount("delivered")} color="bg-blue-100 text-blue-800" itemIds={getOrdersByStatus("delivered").map(o => o.id)}>
                  {getOrdersByStatus("delivered").map((order) => (
                    <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
                  ))}
                </KanbanColumn>
              )}
              {visibleColumns.includes("cancelled") && (
                <KanbanColumn id="cancelled" title="Cancelados" count={getStatusCount("cancelled")} color="bg-red-100 text-red-800" itemIds={getOrdersByStatus("cancelled").map(o => o.id)}>
                  {getOrdersByStatus("cancelled").map((order) => (
                    <KanbanCard key={order.id} {...order} onViewDetails={handleViewDetails} onPrint={handlePrintOrder} />
                  ))}
                </KanbanColumn>
              )}
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
      )}

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