import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  User, 
  CreditCard,
  Truck,
  Home
} from "lucide-react";
import { Cart } from "@/hooks/useCart";
import { CheckoutData } from "@/hooks/useCheckout";

interface OrderSummaryProps {
  cart: Cart;
  checkoutData: Partial<CheckoutData>;
  restaurantInfo: {
    name: string;
    deliveryTime: string;
    phone: string;
  };
}

const OrderSummary = ({ cart, checkoutData, restaurantInfo }: OrderSummaryProps) => {
  const getPaymentMethodName = (method?: string) => {
    switch (method) {
      case 'pix': return 'PIX';
      case 'credit': return 'Cartão de Crédito';
      case 'debit': return 'Cartão de Débito';
      case 'cash': return 'Dinheiro';
      default: return 'Não selecionado';
    }
  };

  const getDeliveryMethodName = (option?: string) => {
    return option === 'pickup' ? 'Retirada no local' : 'Entrega';
  };

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Seu pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>{restaurantInfo.name}</span>
              <Badge variant="outline">
                {cart.items.length} {cart.items.length === 1 ? 'item' : 'itens'}
              </Badge>
            </div>

            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs">
                    {item.quantity}x
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      R$ {item.price.toFixed(2)} cada
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>R$ {cart.subtotal.toFixed(2)}</span>
              </div>
              
              {checkoutData.deliveryOption === 'delivery' && (
                <div className="flex justify-between text-sm">
                  <span>Taxa de entrega</span>
                  <span>R$ {cart.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>R$ {(checkoutData.deliveryOption === 'pickup' ? cart.subtotal : cart.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery/Pickup Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {checkoutData.deliveryOption === 'pickup' ? (
              <Home className="h-5 w-5" />
            ) : (
              <Truck className="h-5 w-5" />
            )}
            {getDeliveryMethodName(checkoutData.deliveryOption)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {checkoutData.deliveryOption === 'pickup' ? '20-30 min' : restaurantInfo.deliveryTime}
            </span>
          </div>

          {checkoutData.deliveryOption === 'delivery' ? (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                {checkoutData.address ? (
                  <div>
                    <div>{checkoutData.address.street}, {checkoutData.address.number}</div>
                    {checkoutData.address.complement && (
                      <div>{checkoutData.address.complement}</div>
                    )}
                    <div>{checkoutData.address.neighborhood}</div>
                    <div>{checkoutData.address.city} - {checkoutData.address.state}</div>
                    <div>{checkoutData.address.zipCode}</div>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Endereço não informado</span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <div>Rua das Flores, 123</div>
                <div>Vila Madalena - São Paulo - SP</div>
                <div className="text-muted-foreground mt-1">
                  Tel: {restaurantInfo.phone}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Dados do cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {checkoutData.customer ? (
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Nome:</span> {checkoutData.customer.name}
              </div>
              <div>
                <span className="font-medium">E-mail:</span> {checkoutData.customer.email}
              </div>
              <div>
                <span className="font-medium">Telefone:</span> {checkoutData.customer.phone}
              </div>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Dados não informados</span>
          )}
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Método:</span> {getPaymentMethodName(checkoutData.payment?.method)}
            </div>
            
            {checkoutData.payment?.method === 'cash' && checkoutData.payment.changeFor && (
              <div>
                <span className="font-medium">Troco para:</span> R$ {checkoutData.payment.changeFor.toFixed(2)}
              </div>
            )}
            
            {(checkoutData.payment?.method === 'credit' || checkoutData.payment?.method === 'debit') && checkoutData.payment.cardNumber && (
              <div>
                <span className="font-medium">Cartão:</span> **** **** **** {checkoutData.payment.cardNumber.slice(-4)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {checkoutData.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{checkoutData.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderSummary;