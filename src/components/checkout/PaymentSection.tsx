import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Smartphone, 
  Banknote,
  Shield,
  Zap,
  Clock
} from "lucide-react";
import { PaymentData } from "@/hooks/useCheckout";

interface PaymentSectionProps {
  paymentData?: PaymentData;
  onPaymentChange: (data: PaymentData) => void;
  orderTotal: number;
}

const PaymentSection = ({ paymentData, onPaymentChange, orderTotal }: PaymentSectionProps) => {
  const [payment, setPayment] = useState<PaymentData>(
    paymentData || { method: 'pix' }
  );

  useEffect(() => {
    onPaymentChange(payment);
  }, [payment, onPaymentChange]);

  const handleMethodChange = (method: PaymentData['method']) => {
    setPayment(prev => ({ 
      ...prev, 
      method,
      // Clear card data when switching methods
      ...(method !== 'credit' && method !== 'debit' && {
        cardNumber: undefined,
        cardName: undefined,
        cardExpiry: undefined,
        cardCvv: undefined
      }),
      // Clear change amount when not cash
      ...(method !== 'cash' && {
        changeFor: undefined
      })
    }));
  };

  const handleCardChange = (field: string, value: string) => {
    setPayment(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{2,4}/g);
    const match = matches && matches[0] || '';
    
    if (match.length >= 2) {
      return match.substring(0, 2) + (match.length > 2 ? '/' + match.substring(2, 4) : '');
    }
    
    return match;
  };

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      description: 'Pagamento instantâneo',
      icon: Smartphone,
      badge: 'Instantâneo',
      badgeColor: 'bg-green-100 text-green-800',
      benefits: ['Sem taxas', 'Aprovação imediata', 'Mais seguro']
    },
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      description: 'Visa, Mastercard, Elo',
      icon: CreditCard,
      badge: 'Parcelado',
      badgeColor: 'bg-blue-100 text-blue-800',
      benefits: ['Parcelamento', 'Cashback', 'Pontos']
    },
    {
      id: 'debit',
      name: 'Cartão de Débito',
      description: 'Débito online',
      icon: CreditCard,
      badge: 'À vista',
      badgeColor: 'bg-purple-100 text-purple-800',
      benefits: ['Desconto direto', 'Sem juros', 'Aprovação rápida']
    },
    {
      id: 'cash',
      name: 'Dinheiro',
      description: 'Pagamento na entrega',
      icon: Banknote,
      badge: 'Na entrega',
      badgeColor: 'bg-orange-100 text-orange-800',
      benefits: ['Sem taxas online', 'Tradicional', 'Troco disponível']
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Forma de pagamento
          </CardTitle>
          <CardDescription>
            Como você quer pagar seu pedido?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={payment.method}
            onValueChange={handleMethodChange}
            className="space-y-3"
          >
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                  payment.method === method.id ? 'border-primary bg-primary/5' : ''
                }`}
              >
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <method.icon className="h-5 w-5" />
                    <Label htmlFor={method.id} className="cursor-pointer font-medium">
                      {method.name}
                    </Label>
                    <Badge className={method.badgeColor}>
                      {method.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {method.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {method.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* PIX Details */}
      {payment.method === 'pix' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              PIX - Pagamento Instantâneo
            </CardTitle>
            <CardDescription>
              Após confirmar o pedido, você receberá o QR Code para pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">100% Seguro</span>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Pagamento processado pelo Banco Central</li>
                <li>• Aprovação em até 30 segundos</li>
                <li>• Sem taxas adicionais</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Card Details */}
      {(payment.method === 'credit' || payment.method === 'debit') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Dados do cartão
            </CardTitle>
            <CardDescription>
              Insira os dados do seu cartão com segurança
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número do cartão</Label>
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={payment.cardNumber || ''}
                onChange={(e) => handleCardChange('cardNumber', formatCardNumber(e.target.value))}
                maxLength={19}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Nome no cartão</Label>
              <Input
                id="cardName"
                placeholder="Nome como está no cartão"
                value={payment.cardName || ''}
                onChange={(e) => handleCardChange('cardName', e.target.value.toUpperCase())}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardExpiry">Validade</Label>
                <Input
                  id="cardExpiry"
                  placeholder="MM/AA"
                  value={payment.cardExpiry || ''}
                  onChange={(e) => handleCardChange('cardExpiry', formatExpiry(e.target.value))}
                  maxLength={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardCvv">CVV</Label>
                <Input
                  id="cardCvv"
                  placeholder="000"
                  value={payment.cardCvv || ''}
                  onChange={(e) => handleCardChange('cardCvv', e.target.value.replace(/\D/g, ''))}
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Seus dados estão protegidos</span>
              </div>
              <p className="text-sm text-blue-700">
                Utilizamos criptografia SSL e não armazenamos dados do seu cartão.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cash Details */}
      {payment.method === 'cash' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="h-5 w-5" />
              Pagamento em dinheiro
            </CardTitle>
            <CardDescription>
              Pague na entrega com dinheiro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="changeFor">Precisa de troco? (opcional)</Label>
              <Input
                id="changeFor"
                type="number"
                placeholder={`Ex: ${(orderTotal + 10).toFixed(2)}`}
                value={payment.changeFor || ''}
                onChange={(e) => handleCardChange('changeFor', e.target.value)}
                min={orderTotal}
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">
                Valor total: R$ {orderTotal.toFixed(2)}
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-orange-800 mb-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Importante</span>
              </div>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Tenha o valor separado para agilizar a entrega</li>
                <li>• Nossos entregadores sempre portam troco</li>
                <li>• Pedido será preparado após confirmação</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentSection;