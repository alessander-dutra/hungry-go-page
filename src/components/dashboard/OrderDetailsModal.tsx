import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Phone,
  MapPin,
  Clock,
  Edit2,
  Save,
  X,
  History,
  MessageSquare,
  Package,
  User,
  Printer,
} from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

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
  items: OrderItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "scheduled" | "cancelled";
  createdAt: string;
  estimatedTime: string;
  customerNotes?: string;
  statusHistory?: StatusHistory[];
  scheduledDate?: string;
  scheduledTime?: string;
}

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateOrder?: (order: Order) => void;
  onPrint?: (orderId: string) => void;
}

const OrderDetailsModal = ({
  order,
  open,
  onOpenChange,
  onUpdateOrder,
  onPrint,
}: OrderDetailsModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);

  if (!order) return null;

  const currentOrder = isEditing && editedOrder ? editedOrder : order;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "preparing":
        return "bg-orange-500";
      case "ready":
        return "bg-green-500";
      case "delivered":
        return "bg-blue-500";
      case "scheduled":
        return "bg-purple-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "preparing":
        return "Preparando";
      case "ready":
        return "Pronto";
      case "delivered":
        return "Entregue";
      case "scheduled":
        return "Agendado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const handleEdit = () => {
    setEditedOrder({ ...order });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedOrder && onUpdateOrder) {
      onUpdateOrder(editedOrder);
      toast.success("Pedido atualizado com sucesso!");
    }
    setIsEditing(false);
    setEditedOrder(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedOrder(null);
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    if (!editedOrder) return;
    const newItems = [...editedOrder.items];
    newItems[index] = { ...newItems[index], [field]: value };
    const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setEditedOrder({ ...editedOrder, items: newItems, total: newTotal });
  };

  const defaultHistory: StatusHistory[] = [
    { status: order.status, timestamp: order.createdAt, note: "Status atual" },
    { status: "pending", timestamp: order.createdAt, note: "Pedido recebido" },
  ];

  const statusHistory = order.statusHistory || defaultHistory;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              Pedido #{currentOrder.id}
            </DialogTitle>
            <Badge className={getStatusColor(currentOrder.status)}>
              {getStatusLabel(currentOrder.status)}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Customer Info Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Informações do Cliente
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                {isEditing ? (
                  <>
                    <Input
                      value={editedOrder?.customerName || ""}
                      onChange={(e) =>
                        setEditedOrder(prev => prev ? { ...prev, customerName: e.target.value } : null)
                      }
                      placeholder="Nome do cliente"
                    />
                    <Input
                      value={editedOrder?.customerPhone || ""}
                      onChange={(e) =>
                        setEditedOrder(prev => prev ? { ...prev, customerPhone: e.target.value } : null)
                      }
                      placeholder="Telefone"
                    />
                    <Textarea
                      value={editedOrder?.address || ""}
                      onChange={(e) =>
                        setEditedOrder(prev => prev ? { ...prev, address: e.target.value } : null)
                      }
                      placeholder="Endereço"
                    />
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-lg">{currentOrder.customerName}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{currentOrder.customerPhone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <span>{currentOrder.address}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Order Items Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Package className="h-4 w-4" />
                Itens do Pedido
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                {currentOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    {isEditing ? (
                      <div className="flex gap-2 flex-1">
                        <Input
                          type="number"
                          className="w-16"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                          min={1}
                        />
                        <Input
                          className="flex-1"
                          value={item.name}
                          onChange={(e) => updateItem(index, "name", e.target.value)}
                        />
                        <Input
                          type="number"
                          className="w-24"
                          value={item.price}
                          onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                          step={0.01}
                        />
                      </div>
                    ) : (
                      <>
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">R$ {item.price.toFixed(2)}</span>
                      </>
                    )}
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span>R$ {currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Customer Notes Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MessageSquare className="h-4 w-4" />
                Observações do Cliente
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                {isEditing ? (
                  <Textarea
                    value={editedOrder?.customerNotes || ""}
                    onChange={(e) =>
                      setEditedOrder(prev => prev ? { ...prev, customerNotes: e.target.value } : null)
                    }
                    placeholder="Observações do cliente..."
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {currentOrder.customerNotes || "Nenhuma observação"}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Status History Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <History className="h-4 w-4" />
                Histórico de Status
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="space-y-4">
                  {statusHistory.map((history, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(history.status)}`} />
                        {index < statusHistory.length - 1 && (
                          <div className="w-0.5 h-8 bg-border mt-1" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {getStatusLabel(history.status)}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {history.timestamp}
                          </span>
                        </div>
                        {history.note && (
                          <p className="text-sm text-muted-foreground mt-1">{history.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scheduled Date/Time */}
            {currentOrder.status === "scheduled" && currentOrder.scheduledDate && currentOrder.scheduledTime && (
              <div className="flex items-center gap-3 text-sm bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <Clock className="h-5 w-5" />
                <div>
                  <p className="font-semibold">Agendado para</p>
                  <p>{currentOrder.scheduledDate} às {currentOrder.scheduledTime}</p>
                </div>
              </div>
            )}

            {/* Time Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Criado às {currentOrder.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Tempo estimado: {currentOrder.estimatedTime}</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </>
          ) : (
            <>
              {onPrint && (
                <Button variant="outline" onClick={() => onPrint(order.id)}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
              )}
              <Button onClick={handleEdit}>
                <Edit2 className="h-4 w-4 mr-2" />
                Editar Pedido
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
