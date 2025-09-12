import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Home,
  ShoppingBag,
  Clock
} from "lucide-react";
import { CustomerData, AddressData } from "@/hooks/useCheckout";

interface CustomerFormProps {
  customerData?: CustomerData;
  addressData?: AddressData;
  deliveryOption: 'delivery' | 'pickup';
  onCustomerChange: (data: CustomerData) => void;
  onAddressChange: (data: AddressData) => void;
  onDeliveryOptionChange: (option: 'delivery' | 'pickup') => void;
  onNotesChange: (notes: string) => void;
  notes?: string;
}

const CustomerForm = ({
  customerData,
  addressData,
  deliveryOption,
  onCustomerChange,
  onAddressChange,
  onDeliveryOptionChange,
  onNotesChange,
  notes = ""
}: CustomerFormProps) => {
  const [customer, setCustomer] = useState<CustomerData>(
    customerData || { name: "", email: "", phone: "" }
  );
  
  const [address, setAddress] = useState<AddressData>(
    addressData || {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "São Paulo",
      state: "SP",
      zipCode: ""
    }
  );

  useEffect(() => {
    if (customer.name && customer.email && customer.phone) {
      onCustomerChange(customer);
    }
  }, [customer, onCustomerChange]);

  useEffect(() => {
    if (address.street && address.number && address.neighborhood && address.city && address.zipCode) {
      onAddressChange(address);
    }
  }, [address, onAddressChange]);

  const handleCustomerChange = (field: keyof CustomerData, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: keyof AddressData, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const fillDemoData = () => {
    setCustomer({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999"
    });
    
    setAddress({
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Vila Madalena",
      city: "São Paulo",
      state: "SP",
      zipCode: "05433-000"
    });
  };

  return (
    <div className="space-y-6">
      {/* Delivery Option */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Como você quer receber?
          </CardTitle>
          <CardDescription>
            Escolha entre entrega ou retirada no local
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={deliveryOption}
            onValueChange={(value) => onDeliveryOptionChange(value as 'delivery' | 'pickup')}
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="delivery" id="delivery" />
              <div className="flex-1">
                <Label htmlFor="delivery" className="cursor-pointer font-medium">
                  Entrega
                </Label>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    30-45 min
                  </div>
                  <Badge variant="secondary">+ R$ 5,90</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="pickup" id="pickup" />
              <div className="flex-1">
                <Label htmlFor="pickup" className="cursor-pointer font-medium">
                  Retirada no local
                </Label>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    20-30 min
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Grátis
                  </Badge>
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Customer Data */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Seus dados
              </CardTitle>
              <CardDescription>
                Informações para contato e entrega
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={fillDemoData}>
              Preencher demo
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  className="pl-10"
                  value={customer.name}
                  onChange={(e) => handleCustomerChange("name", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  className="pl-10"
                  value={customer.phone}
                  onChange={(e) => handleCustomerChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-10"
                value={customer.email}
                onChange={(e) => handleCustomerChange("email", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address (only for delivery) */}
      {deliveryOption === 'delivery' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço de entrega
            </CardTitle>
            <CardDescription>
              Onde você quer receber seu pedido?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3 space-y-2">
                <Label htmlFor="street">Rua/Avenida *</Label>
                <Input
                  id="street"
                  placeholder="Nome da rua"
                  value={address.street}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="number">Número *</Label>
                <Input
                  id="number"
                  placeholder="123"
                  value={address.number}
                  onChange={(e) => handleAddressChange("number", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  placeholder="Apto, bloco, casa..."
                  value={address.complement}
                  onChange={(e) => handleAddressChange("complement", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  placeholder="Nome do bairro"
                  value={address.neighborhood}
                  onChange={(e) => handleAddressChange("neighborhood", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  placeholder="São Paulo"
                  value={address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado *</Label>
                <Input
                  id="state"
                  placeholder="SP"
                  value={address.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP *</Label>
                <Input
                  id="zipCode"
                  placeholder="00000-000"
                  value={address.zipCode}
                  onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Observações
          </CardTitle>
          <CardDescription>
            Alguma informação adicional sobre seu pedido? (opcional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Ex: Sem cebola na pizza, entregar no portão azul..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerForm;