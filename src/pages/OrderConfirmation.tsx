import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone,
  MessageCircle,
  Home,
  Share2,
  Download
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(30);

  const { orderData, cart } = location.state || {};

  // Redirect if no order data
  useEffect(() => {
    if (!orderData || !cart) {
      navigate("/restaurant");
    }
  }, [orderData, cart, navigate]);

  // Countdown for estimated time
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!orderData || !cart) {
    return null;
  }

  const formatTime = (minutes: number) => {
    if (minutes <= 0) return "Em breve";
    return `${minutes} min`;
  };

  const downloadReceipt = () => {
    const receiptContent = `
COMPROVANTE DE PEDIDO
===================

Pedido: #${orderData.orderId?.slice(-6)}
Data: ${new Date().toLocaleDateString('pt-BR')}
Hora: ${new Date().toLocaleTimeString('pt-BR')}

${isDelivery ? 'ENTREGA' : 'RETIRADA'}
Tempo estimado: ${estimatedTime} minutos

ITENS:
${cart.items.map((item: any) => 
  `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

RESUMO:
Subtotal: R$ ${cart.subtotal.toFixed(2)}
${isDelivery ? `Taxa de entrega: R$ ${cart.deliveryFee.toFixed(2)}\n` : ''}Total: R$ ${(isDelivery ? cart.total : cart.subtotal).toFixed(2)}

${orderData.payment?.method === 'pix' ? 'PAGAMENTO: PIX - Confirmado' : ''}

Obrigado pela preferência!
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprovante-pedido-${orderData.orderId?.slice(-6)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareOrder = async () => {
    const total = (isDelivery ? cart.total : cart.subtotal).toFixed(2);
    const id = orderData.orderId?.slice(-6);
    const text = `Pedido #${id} - Total: R$ ${total}`;
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Pedido confirmado',
          text: `${text}\n${isDelivery ? 'Entrega' : 'Retirada'} • Estimado: ${estimatedTime} min`,
          url
        });
        toast({ title: "Compartilhado", description: "Pedido compartilhado com sucesso." });
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        toast({ title: "Link copiado", description: "Comprovante copiado para a área de transferência." });
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = `${text}\n${url}`;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        toast({ title: "Link copiado", description: "Comprovante copiado para a área de transferência." });
      }
    } catch (err) {
      toast({ title: "Falha ao compartilhar", description: "Não foi possível compartilhar agora.", variant: "destructive" });
    }
  };

  const isDelivery = orderData.deliveryOption === 'delivery';
  const estimatedTime = isDelivery ? "30-45" : "20-30";

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Header */}
          <Card className="text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Pedido Confirmado! 🎉</h1>
              <p className="text-muted-foreground mb-4">
                Seu pedido foi recebido e está sendo preparado
              </p>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Pedido #{orderData.orderId?.slice(-6)}
              </Badge>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Status do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-medium text-green-800">Pedido Confirmado</div>
                      <div className="text-sm text-green-600">Restaurante já recebeu seu pedido</div>
                    </div>
                  </div>
                  <Badge className="bg-green-600">Agora</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <div>
                      <div className="font-medium">Preparando</div>
                      <div className="text-sm text-muted-foreground">Seu pedido está sendo preparado</div>
                    </div>
                  </div>
                  <Badge variant="outline">Em breve</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <div>
                      <div className="font-medium">
                        {isDelivery ? 'Saindo para entrega' : 'Pronto para retirada'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {isDelivery ? 'Entregador a caminho' : 'Você pode retirar seu pedido'}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {formatTime(countdown)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery/Pickup Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isDelivery ? (
                  <MapPin className="h-5 w-5" />
                ) : (
                  <Home className="h-5 w-5" />
                )}
                {isDelivery ? 'Entrega' : 'Retirada'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Tempo estimado: {estimatedTime} minutos</span>
                </div>

                {isDelivery ? (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      {orderData.address && (
                        <>
                          <div>{orderData.address.street}, {orderData.address.number}</div>
                          {orderData.address.complement && (
                            <div>{orderData.address.complement}</div>
                          )}
                          <div>{orderData.address.neighborhood}</div>
                          <div>{orderData.address.city} - {orderData.address.state}</div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div>Rua das Flores, 123</div>
                      <div>Vila Madalena - São Paulo - SP</div>
                      <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        (11) 99999-9999
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cart.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {item.quantity}x
                      </Badge>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {cart.subtotal.toFixed(2)}</span>
                  </div>
                  
                  {isDelivery && (
                    <div className="flex justify-between text-sm">
                      <span>Taxa de entrega</span>
                      <span>R$ {cart.deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>R$ {(isDelivery ? cart.total : cart.subtotal).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          {orderData.payment?.method === 'pix' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">PIX - Pagamento Processado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800 mb-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Pagamento confirmado</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Seu pagamento PIX foi processado com sucesso. Não é necessário nenhuma ação adicional.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full" onClick={shareOrder}>
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            
            <Button variant="outline" className="w-full" onClick={downloadReceipt}>
              <Download className="h-4 w-4 mr-2" />
              Baixar Comprovante
            </Button>
            
            <Button variant="outline" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4 pt-6">
            <Button variant="outline" onClick={() => navigate("/restaurant")}>
              Fazer Novo Pedido
            </Button>
            <Button variant="hero" onClick={() => navigate("/")}>
              Voltar ao Início
            </Button>
          </div>

          {/* Support */}
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Precisa de ajuda com seu pedido?
              </p>
              <Button variant="link" className="p-0">
                Entre em contato conosco
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;