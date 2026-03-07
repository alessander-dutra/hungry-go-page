import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Phone, MapPin, Clock, Eye, Printer } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface KanbanCardProps {
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
  scheduledDate?: string;
  scheduledTime?: string;
  onAccept?: (id: string) => void;
  onCancel?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onPrint?: (id: string) => void;
}

const KanbanCard = ({
  id,
  customerName,
  customerPhone,
  address,
  items,
  total,
  status,
  createdAt,
  estimatedTime,
  onAccept,
  onCancel,
  onViewDetails,
  onPrint,
}: KanbanCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusColor = () => {
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
        return "bg-gray-500";
    }
  };

  const getStatusLabel = () => {
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

  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAccept) {
      onAccept(id);
      toast.success("Pedido aceito!");
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCancel) {
      onCancel(id);
      toast.error("Pedido cancelado");
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(id);
    }
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPrint) {
      onPrint(id);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move hover:shadow-lg transition-shadow touch-none w-full"
    >
      <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold text-sm sm:text-base truncate">#{id}</h4>
            <Badge className={`${getStatusColor()} text-xs mt-1`}>{getStatusLabel()}</Badge>
          </div>
          <div className="text-right text-xs sm:text-sm flex-shrink-0">
            <p className="text-muted-foreground">{createdAt}</p>
            <p className="font-medium flex items-center gap-1 justify-end">
              <Clock className="h-3 w-3" />
              {estimatedTime}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-1.5 border-t pt-2 sm:pt-3">
          <p className="font-medium text-sm truncate">{customerName}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{customerPhone}</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{address}</span>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-1 border-t pt-2 sm:pt-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Itens</p>
          {items.slice(0, 3).map((item, index) => (
            <div key={index} className="flex justify-between text-xs gap-2">
              <span className="text-muted-foreground truncate">
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium flex-shrink-0">
                R$ {item.price.toFixed(2)}
              </span>
            </div>
          ))}
          {items.length > 3 && (
            <p className="text-xs text-muted-foreground">+{items.length - 3} item(s)...</p>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-2 sm:pt-3">
          <span className="font-semibold text-sm">Total:</span>
          <span className="font-bold text-base sm:text-lg">
            R$ {total.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1.5 sm:gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs h-8"
            onClick={handleViewDetails}
          >
            <Eye className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Detalhes</span>
            <span className="sm:hidden">Ver</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePrint}
          >
            <Printer className="h-3 w-3" />
          </Button>
        </div>

        {/* Actions for Pending Orders */}
        {status === "pending" && (
          <div className="flex gap-1.5 sm:gap-2">
            <Button
              size="sm"
              className="flex-1 text-xs h-8"
              onClick={handleAccept}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Aceitar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1 text-xs h-8"
              onClick={handleCancel}
            >
              <X className="h-3 w-3 mr-1" />
              Recusar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KanbanCard;
