import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, CheckCircle, XCircle } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderCardProps {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";
  createdAt: string;
  estimatedTime?: string;
}

const OrderCard = ({ 
  id, 
  customerName, 
  customerPhone, 
  address, 
  items, 
  total, 
  status, 
  createdAt,
  estimatedTime 
}: OrderCardProps) => {
  const getStatusBadge = () => {
    const statusConfig = {
      pending: { label: "Pendente", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      confirmed: { label: "Confirmado", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
      preparing: { label: "Preparando", variant: "default" as const, color: "bg-orange-100 text-orange-800" },
      ready: { label: "Pronto", variant: "default" as const, color: "bg-green-100 text-green-800" },
      delivered: { label: "Entregue", variant: "outline" as const, color: "bg-gray-100 text-gray-800" },
      cancelled: { label: "Cancelado", variant: "destructive" as const, color: "bg-red-100 text-red-800" }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getStatusActions = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex space-x-2">
            <Button size="sm" variant="default">
              <CheckCircle className="h-4 w-4 mr-1" />
              Aceitar
            </Button>
            <Button size="sm" variant="destructive">
              <XCircle className="h-4 w-4 mr-1" />
              Recusar
            </Button>
          </div>
        );
      case "confirmed":
        return (
          <Button size="sm" variant="default">
            Iniciar Preparo
          </Button>
        );
      case "preparing":
        return (
          <Button size="sm" variant="default">
            Marcar como Pronto
          </Button>
        );
      case "ready":
        return (
          <Button size="sm" variant="default">
            Saiu para Entrega
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pedido #{id.slice(-6)}</CardTitle>
          {getStatusBadge()}
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {createdAt}
          </div>
          {estimatedTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {estimatedTime}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="border rounded-lg p-3 bg-muted/30">
          <div className="font-medium">{customerName}</div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Phone className="h-4 w-4 mr-1" />
            {customerPhone}
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {address}
          </div>
        </div>

        {/* Order Items */}
        <div>
          <div className="text-sm font-medium mb-2">Itens do Pedido:</div>
          <div className="space-y-1">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>R$ {item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {getStatusActions()}
      </CardContent>
    </Card>
  );
};

export default OrderCard;