import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, CheckCircle, XCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (status !== "pending") return;
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || status !== "pending") return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    setSwipeX(diff);
  };
  
  const handleTouchEnd = () => {
    if (!isDragging || status !== "pending") return;
    setIsDragging(false);
    
    const threshold = 120;
    
    if (swipeX > threshold) {
      // Aceitar pedido (swipe direita)
      console.log("Pedido aceito:", id);
      // Aqui você pode chamar a função de aceitar
    } else if (swipeX < -threshold) {
      // Recusar pedido (swipe esquerda)
      console.log("Pedido recusado:", id);
      // Aqui você pode chamar a função de recusar
    }
    
    setSwipeX(0);
  };
  
  const getSwipeBackground = () => {
    if (swipeX > 50) {
      return "bg-green-500/20";
    } else if (swipeX < -50) {
      return "bg-red-500/20";
    }
    return "";
  };
  
  const getSwipeIcon = () => {
    if (swipeX > 50) {
      return <CheckCircle className="h-8 w-8 text-green-500" />;
    } else if (swipeX < -50) {
      return <XCircle className="h-8 w-8 text-red-500" />;
    }
    return null;
  };
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
    <div className="relative overflow-hidden">
      {/* Swipe background indicators */}
      {status === "pending" && (
        <>
          <div 
            className={`absolute inset-0 flex items-center justify-start pl-8 transition-opacity ${
              swipeX > 50 ? "opacity-100" : "opacity-0"
            }`}
            style={{ pointerEvents: "none" }}
          >
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <div 
            className={`absolute inset-0 flex items-center justify-end pr-8 transition-opacity ${
              swipeX < -50 ? "opacity-100" : "opacity-0"
            }`}
            style={{ pointerEvents: "none" }}
          >
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
        </>
      )}
      
      {/* Card with swipe transform */}
      <Card 
        ref={cardRef}
        className={`card-hover ${getSwipeBackground()} transition-colors`}
        style={{
          transform: `translateX(${swipeX}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
          touchAction: status === "pending" ? "pan-y" : "auto"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
        
        {/* Swipe hint for mobile */}
        {status === "pending" && (
          <div className="text-xs text-muted-foreground text-center mt-2 md:hidden">
            👈 Deslize para recusar | Deslize para aceitar 👉
          </div>
        )}
      </CardContent>
      </Card>
    </div>
  );
};

export default OrderCard;