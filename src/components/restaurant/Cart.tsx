import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, MapPin } from "lucide-react";
import { Cart as CartType } from "@/hooks/useCart";
import CartItem from "./CartItem";

interface CartProps {
  cart: CartType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  minOrderValue: number;
}

const Cart = ({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  minOrderValue 
}: CartProps) => {
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const isMinOrderMet = cart.subtotal >= minOrderValue;
  const remainingForMinOrder = minOrderValue - cart.subtotal;

  if (cart.items.length === 0) {
    return (
      <Card className="sticky top-4">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Seu carrinho está vazio</h3>
          <p className="text-sm text-muted-foreground">
            Adicione itens do cardápio para começar seu pedido
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Seu Pedido
          </span>
          <Badge variant="secondary">
            {itemCount} {itemCount === 1 ? 'item' : 'itens'}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="max-h-64 overflow-y-auto">
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
            />
          ))}
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>R$ {cart.subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Taxa de entrega</span>
            <span>R$ {cart.deliveryFee.toFixed(2)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>R$ {cart.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Minimum Order Warning */}
        {!isMinOrderMet && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="text-sm text-yellow-800">
              <strong>Pedido mínimo:</strong> R$ {minOrderValue.toFixed(2)}
            </div>
            <div className="text-xs text-yellow-700 mt-1">
              Adicione mais R$ {remainingForMinOrder.toFixed(2)} para finalizar o pedido
            </div>
          </div>
        )}

        {/* Delivery Info */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <MapPin className="h-4 w-4" />
            Entregar em:
          </div>
          <p className="text-sm text-muted-foreground">
            Rua das Flores, 123 - Vila Madalena
          </p>
          <Button variant="link" className="p-0 h-auto text-xs mt-1">
            Alterar endereço
          </Button>
        </div>

        {/* Checkout Button */}
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={onCheckout}
          disabled={!isMinOrderMet}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          {isMinOrderMet ? 'Finalizar Pedido' : `Pedido mínimo R$ ${minOrderValue.toFixed(2)}`}
        </Button>

        {/* Payment Methods */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Aceitamos:
          </p>
          <div className="flex justify-center space-x-2">
            <Badge variant="outline" className="text-xs">PIX</Badge>
            <Badge variant="outline" className="text-xs">Cartão</Badge>
            <Badge variant="outline" className="text-xs">Dinheiro</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;