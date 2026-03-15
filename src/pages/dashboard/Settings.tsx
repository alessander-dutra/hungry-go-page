import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  DollarSign,
  Bell,
  Shield,
  Smartphone,
  Bot,
  Save,
  Upload,
  Loader2,
  MessageCircle,
  Volume2,
  CheckCircle,
  AlertCircle,
  Settings as SettingsIcon,
  Mic,
  MicOff
} from "lucide-react";

interface RestaurantInfo {
  name: string;
  phone: string;
  email: string;
  category: string;
  description: string;
  address: string;
}

interface DeliveryConfig {
  fee: string;
  minOrder: string;
  deliveryTime: string;
  deliveryRadius: string;
  pickupEnabled: boolean;
  freeDeliveryEnabled: boolean;
  freeDeliveryMin: string;
}

interface PaymentMethod {
  name: string;
  description: string;
  active: boolean;
}

interface NotificationPref {
  name: string;
  description: string;
  active: boolean;
}

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  // Restaurant Info State
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
    name: "Restaurante Demo",
    phone: "(11) 99999-9999",
    email: "contato@restaurante.com",
    category: "Pizzaria",
    description: "A melhor pizzaria da região com ingredientes selecionados e massa artesanal.",
    address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP, 05433-000"
  });

  // Delivery Config State
  const [deliveryConfig, setDeliveryConfig] = useState<DeliveryConfig>({
    fee: "5.90",
    minOrder: "25.00",
    deliveryTime: "45",
    deliveryRadius: "5.0",
    pickupEnabled: true,
    freeDeliveryEnabled: true,
    freeDeliveryMin: "50.00"
  });

  // Schedule State
  const [schedule, setSchedule] = useState([
    { day: "Segunda-feira", open: "11:00", close: "23:00", active: true },
    { day: "Terça-feira", open: "11:00", close: "23:00", active: true },
    { day: "Quarta-feira", open: "11:00", close: "23:00", active: true },
    { day: "Quinta-feira", open: "11:00", close: "23:00", active: true },
    { day: "Sexta-feira", open: "11:00", close: "00:00", active: true },
    { day: "Sábado", open: "11:00", close: "00:00", active: true },
    { day: "Domingo", open: "11:00", close: "22:00", active: false },
  ]);

  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { name: "PIX", description: "Pagamento instantâneo", active: true },
    { name: "Cartão de Crédito", description: "Visa, Mastercard, Elo", active: true },
    { name: "Cartão de Débito", description: "Débito online", active: true },
    { name: "Dinheiro", description: "Pagamento na entrega", active: false },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationPref[]>([
    { name: "Novos Pedidos", description: "Receber notificação quando há novos pedidos", active: true },
    { name: "Pedidos Cancelados", description: "Notificar quando pedidos são cancelados", active: true },
    { name: "Avaliações", description: "Notificar sobre novas avaliações de clientes", active: true },
    { name: "Relatórios Diários", description: "Resumo diário por email", active: false },
    { name: "Promoções", description: "Sugestões de promoções da IA", active: true },
  ]);

  // AI Features State
  const [aiFeatures, setAiFeatures] = useState({
    recommendations: true,
    priceOptimization: true,
    predictiveAnalytics: true
  });

  const [whatsappMessage, setWhatsappMessage] = useState(
    "Olá! 👋 Bem-vindo ao nosso restaurante! Como posso ajudá-lo hoje?"
  );

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "✅ Configurações salvas!",
        description: "Todas as alterações foram aplicadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao salvar",
        description: "Não foi possível salvar as configurações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = () => {
    logoInputRef.current?.click();
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione um arquivo de imagem (JPG, PNG, etc.).",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
      toast({
        title: "✅ Logo atualizada!",
        description: "A nova logo foi carregada com sucesso.",
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const updateSchedule = (index: number, field: string, value: any) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setSchedule(newSchedule);
  };

  const togglePaymentMethod = (index: number) => {
    const newMethods = [...paymentMethods];
    newMethods[index].active = !newMethods[index].active;
    setPaymentMethods(newMethods);
  };

  const toggleNotification = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications[index].active = !newNotifications[index].active;
    setNotifications(newNotifications);
  };

  const toggleVoice = () => setIsVoiceEnabled(!isVoiceEnabled);
  const toggleListening = () => setIsListening(!isListening);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Configurações</h2>
          <p className="text-muted-foreground">
            Gerencie as configurações do seu restaurante
          </p>
        </div>
        
        <Button variant="hero" onClick={handleSaveSettings} disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {saving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <Tabs defaultValue="restaurant" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="restaurant">Restaurante</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="whatsapp-bot">Config Bot</TabsTrigger>
          <TabsTrigger value="voice-ai">IA de Voz</TabsTrigger>
          <TabsTrigger value="whatsapp-api">WhatsApp API</TabsTrigger>
        </TabsList>

        {/* Restaurant Settings */}
        <TabsContent value="restaurant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Informações do Restaurante
              </CardTitle>
              <CardDescription>Configure as informações básicas do seu negócio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Nome do Restaurante</Label>
                  <Input id="restaurant-name" value={restaurantInfo.name} onChange={(e) => setRestaurantInfo({...restaurantInfo, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-phone">Telefone</Label>
                  <Input id="restaurant-phone" value={restaurantInfo.phone} onChange={(e) => setRestaurantInfo({...restaurantInfo, phone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-email">E-mail</Label>
                  <Input id="restaurant-email" type="email" value={restaurantInfo.email} onChange={(e) => setRestaurantInfo({...restaurantInfo, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-category">Categoria</Label>
                  <Input id="restaurant-category" value={restaurantInfo.category} onChange={(e) => setRestaurantInfo({...restaurantInfo, category: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="restaurant-description">Descrição</Label>
                <Textarea id="restaurant-description" value={restaurantInfo.description} onChange={(e) => setRestaurantInfo({...restaurantInfo, description: e.target.value})} rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="restaurant-address">Endereço Completo</Label>
                <Textarea id="restaurant-address" value={restaurantInfo.address} onChange={(e) => setRestaurantInfo({...restaurantInfo, address: e.target.value})} rows={2} />
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Logo do Restaurante</h4>
                <div className="flex items-center space-x-4">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-16 h-16 rounded-lg object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg gradient-hero flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">R</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" onClick={handleLogoUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                      {logoPreview ? "Trocar Logo" : "Alterar Logo"}
                    </Button>
                    {logoPreview && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => setLogoPreview(null)}>
                        Remover Logo
                      </Button>
                    )}
                  </div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoFileChange}
                  />
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Banner Promocional</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Tamanho ideal: <strong>1920x512 pixels</strong> (proporção aproximadamente 4:1)
                </p>
                <div className="space-y-3">
                  <div className="w-full h-32 rounded-lg bg-muted border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Nenhum banner carregado</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleLogoUpload} className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Enviar Banner (1920x512px)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horário de Funcionamento
              </CardTitle>
              <CardDescription>Configure os horários que seu restaurante aceita pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Switch checked={item.active} onCheckedChange={(checked) => updateSchedule(index, 'active', checked)} />
                      <Label className="font-medium">{item.day}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="time" value={item.open} onChange={(e) => updateSchedule(index, 'open', e.target.value)} className="w-24" />
                      <span className="text-muted-foreground">às</span>
                      <Input type="time" value={item.close} onChange={(e) => updateSchedule(index, 'close', e.target.value)} className="w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delivery Settings */}
        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Configurações de Entrega
              </CardTitle>
              <CardDescription>Configure as opções de entrega do seu restaurante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="delivery-fee">Taxa de Entrega (R$)</Label>
                  <Input id="delivery-fee" type="number" step="0.01" value={deliveryConfig.fee} onChange={(e) => setDeliveryConfig({...deliveryConfig, fee: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-order">Pedido Mínimo (R$)</Label>
                  <Input id="min-order" type="number" step="0.01" value={deliveryConfig.minOrder} onChange={(e) => setDeliveryConfig({...deliveryConfig, minOrder: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-time">Tempo de Entrega (min)</Label>
                  <Input id="delivery-time" type="number" value={deliveryConfig.deliveryTime} onChange={(e) => setDeliveryConfig({...deliveryConfig, deliveryTime: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-radius">Raio de Entrega (km)</Label>
                  <Input id="delivery-radius" type="number" step="0.1" value={deliveryConfig.deliveryRadius} onChange={(e) => setDeliveryConfig({...deliveryConfig, deliveryRadius: e.target.value})} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Retirada no Local</Label>
                    <p className="text-sm text-muted-foreground">Permitir que clientes retirem pedidos no restaurante</p>
                  </div>
                  <Switch checked={deliveryConfig.pickupEnabled} onCheckedChange={(checked) => setDeliveryConfig({...deliveryConfig, pickupEnabled: checked})} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Entrega Grátis</Label>
                    <p className="text-sm text-muted-foreground">Oferecer entrega grátis para pedidos acima de um valor</p>
                  </div>
                  <Switch checked={deliveryConfig.freeDeliveryEnabled} onCheckedChange={(checked) => setDeliveryConfig({...deliveryConfig, freeDeliveryEnabled: checked})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="free-delivery-min">Valor para Entrega Grátis (R$)</Label>
                <Input id="free-delivery-min" type="number" step="0.01" value={deliveryConfig.freeDeliveryMin} onChange={(e) => setDeliveryConfig({...deliveryConfig, freeDeliveryMin: e.target.value})} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Settings */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Métodos de Pagamento
              </CardTitle>
              <CardDescription>Configure as formas de pagamento aceitas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="font-medium">{payment.name}</Label>
                    <p className="text-sm text-muted-foreground">{payment.description}</p>
                  </div>
                  <Switch checked={payment.active} onCheckedChange={() => togglePaymentMethod(index)} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Comissão</CardTitle>
              <CardDescription>Sua taxa atual na plataforma DeliveryPro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">7%</div>
                <div className="text-sm text-muted-foreground mb-4">por pedido concluído</div>
                <Badge variant="secondary">Plano Professional</Badge>
                <p className="text-xs text-muted-foreground mt-2">vs 20-25% dos concorrentes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>Configure quando e como receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="font-medium">{notification.name}</Label>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <Switch checked={notification.active} onCheckedChange={() => toggleNotification(index)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                WhatsApp Business
              </CardTitle>
              <CardDescription>Configure a integração com WhatsApp Business API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">WhatsApp Conectado</div>
                    <div className="text-sm text-muted-foreground">(11) 99999-9999</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-message">Mensagem de Boas-vindas</Label>
                <Textarea id="whatsapp-message" value={whatsappMessage} onChange={(e) => setWhatsappMessage(e.target.value)} rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Inteligência Artificial
              </CardTitle>
              <CardDescription>Configure o chatbot inteligente powered by Gemini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-purple-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">IA Ativa</div>
                    <div className="text-sm text-muted-foreground">Powered by Gemini Pro</div>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Funcionando</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Recomendações Automáticas</Label>
                    <p className="text-sm text-muted-foreground">IA sugere produtos baseado no histórico do cliente</p>
                  </div>
                  <Switch checked={aiFeatures.recommendations} onCheckedChange={(checked) => setAiFeatures({...aiFeatures, recommendations: checked})} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Otimização de Preços</Label>
                    <p className="text-sm text-muted-foreground">Ajustar preços automaticamente para maximizar vendas</p>
                  </div>
                  <Switch checked={aiFeatures.priceOptimization} onCheckedChange={(checked) => setAiFeatures({...aiFeatures, priceOptimization: checked})} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics Preditivos</Label>
                    <p className="text-sm text-muted-foreground">Previsões de demanda e insights inteligentes</p>
                  </div>
                  <Switch checked={aiFeatures.predictiveAnalytics} onCheckedChange={(checked) => setAiFeatures({...aiFeatures, predictiveAnalytics: checked})} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WhatsApp Bot Config Tab (moved from WhatsApp page) */}
        <TabsContent value="whatsapp-bot" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesso rápido às funções do bot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Bot className="h-4 w-4 mr-2" />
                  Treinar IA
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Mensagens Modelo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Config Avançada
                </Button>
              </CardContent>
            </Card>

            {/* Status do Sistema */}
            <Card>
              <CardHeader>
                <CardTitle>Status do Sistema</CardTitle>
                <CardDescription>Estado atual dos serviços</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">WhatsApp API</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Conectado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">IA Gemini</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Webhook</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Verificando</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração do Bot</CardTitle>
                <CardDescription>Personalize o comportamento da IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bot-name">Nome do Bot</Label>
                  <Input id="bot-name" defaultValue="DeliveryBot" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
                  <Textarea id="welcome-message" defaultValue="Olá! 👋 Bem-vindo ao nosso restaurante! Sou a IA que vai te ajudar. Como posso ajudar você hoje?" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personality">Personalidade da IA</Label>
                  <Textarea id="personality" defaultValue="Seja amigável, prestativo e eficiente. Use emojis ocasionalmente. Foque em ajudar o cliente a fazer pedidos e responder dúvidas sobre o cardápio." rows={4} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-resposta</Label>
                    <p className="text-sm text-muted-foreground">Responder automaticamente às mensagens</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sugestões Inteligentes</Label>
                    <p className="text-sm text-muted-foreground">IA sugere produtos baseado no histórico</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fluxos Automáticos</CardTitle>
                <CardDescription>Configure respostas automáticas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { trigger: "cardápio", response: "Aqui está nosso cardápio completo! 📋" },
                  { trigger: "preço", response: "Vou consultar os preços para você! 💰" },
                  { trigger: "horário", response: "Funcionamos de segunda a domingo, das 11h às 23h! 🕐" },
                  { trigger: "entrega", response: "Entregamos em toda a região! Taxa: R$ 5,90 📦" }
                ].map((flow, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">Palavra-chave: {flow.trigger}</Badge>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">{flow.response}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Voice AI Tab (moved from WhatsApp page) */}
        <TabsContent value="voice-ai" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  IA de Voz - ElevenLabs
                </CardTitle>
                <CardDescription>Atendimento por voz com IA avançada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Volume2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">ElevenLabs Voice AI</div>
                      <div className="text-sm text-muted-foreground">
                        {isVoiceEnabled ? "Ativo e funcionando" : "Clique para ativar"}
                      </div>
                    </div>
                  </div>
                  <Switch checked={isVoiceEnabled} onCheckedChange={toggleVoice} />
                </div>

                {isVoiceEnabled && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="voice-id">ID da Voz</Label>
                      <Input id="voice-id" placeholder="Digite o ID da voz do ElevenLabs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agent-id">Agent ID</Label>
                      <Input id="agent-id" placeholder="Digite o Agent ID" />
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button variant={isListening ? "destructive" : "hero"} onClick={toggleListening} className="flex-1">
                        {isListening ? (
                          <><MicOff className="h-4 w-4 mr-2" />Parar Gravação</>
                        ) : (
                          <><Mic className="h-4 w-4 mr-2" />Testar Voz</>
                        )}
                      </Button>
                    </div>
                    {isListening && (
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-red-800">Gravando...</span>
                        </div>
                        <p className="text-sm text-red-700">Fale agora para testar a funcionalidade de voz da IA</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Configurações de Voz</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Reconhecimento de Voz</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Síntese de Voz</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Resposta por Áudio</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuração ElevenLabs</CardTitle>
                <CardDescription>Configure a integração com ElevenLabs Voice AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="elevenlabs-api">ElevenLabs API Key</Label>
                  <Input id="elevenlabs-api" type="password" placeholder="Digite sua chave da API ElevenLabs" />
                  <p className="text-sm text-muted-foreground">Necessário para funcionalidades de voz. Obtenha em elevenlabs.io</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voice-model">Modelo de Voz</Label>
                  <Input id="voice-model" placeholder="Digite o ID do modelo de voz" />
                </div>
                <Button variant="outline" className="w-full">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Configurar Agente de Voz
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* WhatsApp API Tab (moved from WhatsApp page) */}
        <TabsContent value="whatsapp-api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integração WhatsApp Business</CardTitle>
              <CardDescription>Configure a conexão com WhatsApp Business API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Número WhatsApp Business</Label>
                  <Input id="phone-number" defaultValue="+55 11 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" defaultValue="https://api.deliverypro.com/webhook" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verify-token">Verify Token</Label>
                  <Input id="verify-token" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="access-token">Access Token</Label>
                  <Input id="access-token" type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="hero">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Testar Conexão
                </Button>
                <Button variant="outline">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Configurações Avançadas
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
