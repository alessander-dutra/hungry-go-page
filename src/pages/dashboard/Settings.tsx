import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Upload
} from "lucide-react";

const Settings = () => {
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
        
        <Button variant="hero">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="restaurant" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="restaurant">Restaurante</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        {/* Restaurant Settings */}
        <TabsContent value="restaurant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Informações do Restaurante
              </CardTitle>
              <CardDescription>
                Configure as informações básicas do seu negócio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Nome do Restaurante</Label>
                  <Input id="restaurant-name" defaultValue="Restaurante Demo" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurant-phone">Telefone</Label>
                  <Input id="restaurant-phone" defaultValue="(11) 99999-9999" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurant-email">E-mail</Label>
                  <Input id="restaurant-email" type="email" defaultValue="contato@restaurante.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurant-category">Categoria</Label>
                  <Input id="restaurant-category" defaultValue="Pizzaria" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurant-description">Descrição</Label>
                <Textarea 
                  id="restaurant-description" 
                  defaultValue="A melhor pizzaria da região com ingredientes selecionados e massa artesanal."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurant-address">Endereço Completo</Label>
                <Textarea 
                  id="restaurant-address" 
                  defaultValue="Rua das Flores, 123 - Vila Madalena, São Paulo - SP, 05433-000"
                  rows={2}
                />
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Logo do Restaurante</h4>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg gradient-hero flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">R</span>
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Alterar Logo
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
              <CardDescription>
                Configure os horários que seu restaurante aceita pedidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { day: "Segunda-feira", open: "11:00", close: "23:00", active: true },
                  { day: "Terça-feira", open: "11:00", close: "23:00", active: true },
                  { day: "Quarta-feira", open: "11:00", close: "23:00", active: true },
                  { day: "Quinta-feira", open: "11:00", close: "23:00", active: true },
                  { day: "Sexta-feira", open: "11:00", close: "00:00", active: true },
                  { day: "Sábado", open: "11:00", close: "00:00", active: true },
                  { day: "Domingo", open: "11:00", close: "22:00", active: false },
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Switch defaultChecked={schedule.active} />
                      <Label className="font-medium">{schedule.day}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="time" defaultValue={schedule.open} className="w-24" />
                      <span className="text-muted-foreground">às</span>
                      <Input type="time" defaultValue={schedule.close} className="w-24" />
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
              <CardDescription>
                Configure as opções de entrega do seu restaurante
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="delivery-fee">Taxa de Entrega (R$)</Label>
                  <Input id="delivery-fee" type="number" step="0.01" defaultValue="5.90" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="min-order">Pedido Mínimo (R$)</Label>
                  <Input id="min-order" type="number" step="0.01" defaultValue="25.00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="delivery-time">Tempo de Entrega (min)</Label>
                  <Input id="delivery-time" type="number" defaultValue="45" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="delivery-radius">Raio de Entrega (km)</Label>
                  <Input id="delivery-radius" type="number" step="0.1" defaultValue="5.0" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Retirada no Local</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que clientes retirem pedidos no restaurante
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Entrega Grátis</Label>
                    <p className="text-sm text-muted-foreground">
                      Oferecer entrega grátis para pedidos acima de um valor
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="free-delivery-min">Valor para Entrega Grátis (R$)</Label>
                <Input id="free-delivery-min" type="number" step="0.01" defaultValue="50.00" />
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
              <CardDescription>
                Configure as formas de pagamento aceitas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "PIX", description: "Pagamento instantâneo", active: true },
                { name: "Cartão de Crédito", description: "Visa, Mastercard, Elo", active: true },
                { name: "Cartão de Débito", description: "Débito online", active: true },
                { name: "Dinheiro", description: "Pagamento na entrega", active: false },
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="font-medium">{payment.name}</Label>
                    <p className="text-sm text-muted-foreground">{payment.description}</p>
                  </div>
                  <Switch defaultChecked={payment.active} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taxa de Comissão</CardTitle>
              <CardDescription>
                Sua taxa atual na plataforma DeliveryPro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">7%</div>
                <div className="text-sm text-muted-foreground mb-4">
                  por pedido concluído
                </div>
                <Badge variant="secondary">Plano Professional</Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  vs 20-25% dos concorrentes
                </p>
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
              <CardDescription>
                Configure quando e como receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Novos Pedidos", description: "Receber notificação quando há novos pedidos", active: true },
                { name: "Pedidos Cancelados", description: "Notificar quando pedidos são cancelados", active: true },
                { name: "Avaliações", description: "Notificar sobre novas avaliações de clientes", active: true },
                { name: "Relatórios Diários", description: "Resumo diário por email", active: false },
                { name: "Promoções", description: "Sugestões de promoções da IA", active: true },
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="font-medium">{notification.name}</Label>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <Switch defaultChecked={notification.active} />
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
              <CardDescription>
                Configure a integração com WhatsApp Business API
              </CardDescription>
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
                <Textarea 
                  id="whatsapp-message"
                  defaultValue="Olá! 👋 Bem-vindo ao nosso restaurante! Como posso ajudá-lo hoje?"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Inteligência Artificial
              </CardTitle>
              <CardDescription>
                Configure o chatbot inteligente powered by Gemini
              </CardDescription>
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
                    <p className="text-sm text-muted-foreground">
                      IA sugere produtos baseado no histórico do cliente
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Otimização de Preços</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajustar preços automaticamente para maximizar vendas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics Preditivos</Label>
                    <p className="text-sm text-muted-foreground">
                      Previsões de demanda e insights inteligentes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;