import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/dashboard/StatsCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { 
  MessageCircle, 
  Bot, 
  Settings, 
  Users, 
  TrendingUp,
  Phone,
  Mic,
  MicOff,
  Send,
  Download,
  Filter,
  Search,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Volume2,
  Smartphone
} from "lucide-react";

const WhatsApp = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Mock data
  const stats = [
    {
      title: "Conversas Hoje",
      value: "47",
      change: "12.5%",
      changeType: "positive" as const,
      icon: MessageCircle,
      description: "vs ontem"
    },
    {
      title: "Taxa Conversão",
      value: "76%",
      change: "3.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "pedidos concluídos"
    },
    {
      title: "Tempo Resposta",
      value: "2.3s",
      change: "0.8s",
      changeType: "negative" as const,
      icon: Clock,
      description: "mais rápido"
    },
    {
      title: "Satisfação IA",
      value: "4.8",
      change: "0.2",
      changeType: "positive" as const,
      icon: Star,
      description: "avaliação média"
    }
  ];

  const conversationData = [
    { name: 'Seg', value: 23, converted: 18 },
    { name: 'Ter', value: 31, converted: 24 },
    { name: 'Qua', value: 28, converted: 21 },
    { name: 'Qui', value: 35, converted: 27 },
    { name: 'Sex', value: 42, converted: 32 },
    { name: 'Sáb', value: 38, converted: 29 },
    { name: 'Dom', value: 25, converted: 19 }
  ];

  const intentsData = [
    { name: 'Fazer Pedido', value: 45 },
    { name: 'Ver Cardápio', value: 30 },  
    { name: 'Consultar Preços', value: 15 },
    { name: 'Horário Funcionamento', value: 10 }
  ];

  const recentChats = [
    {
      id: "1",
      customerName: "João Silva",
      phone: "(11) 99999-9999",
      lastMessage: "Quero uma pizza margherita grande",
      time: "2 min",
      status: "active" as const,
      converted: true,
      orderValue: "R$ 45,90"
    },
    {
      id: "2", 
      customerName: "Maria Santos",
      phone: "(11) 88888-8888",
      lastMessage: "Qual o horário de funcionamento?",
      time: "8 min",
      status: "completed" as const,
      converted: false,
      orderValue: null
    },
    {
      id: "3",
      customerName: "Pedro Costa", 
      phone: "(11) 77777-7777",
      lastMessage: "Obrigado pelo atendimento!",
      time: "15 min",
      status: "completed" as const,
      converted: true,
      orderValue: "R$ 78,50"
    }
  ];

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">WhatsApp Business + IA</h2>
          <p className="text-muted-foreground">
            Atendimento automatizado inteligente powered by Gemini
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Bot Ativo
          </Badge>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="hero" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="conversations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="bot-config">Config Bot</TabsTrigger>
          <TabsTrigger value="voice-ai">IA de Voz</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="integration">Integração</TabsTrigger>
        </TabsList>

        {/* Conversations Tab */}
        <TabsContent value="conversations" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Conversas Ativas
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar conversas..." className="pl-10 w-64" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentChats.map((chat) => (
                    <div key={chat.id} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{chat.customerName}</p>
                              <Badge 
                                variant="secondary" 
                                className={getStatusColor(chat.status)}
                              >
                                {chat.status}
                              </Badge>
                              {chat.converted && (
                                <Badge className="bg-green-100 text-green-800">
                                  Convertido
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {chat.phone}
                            </p>
                            <p className="text-sm">{chat.lastMessage}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">
                            {chat.time} atrás
                          </p>
                          {chat.orderValue && (
                            <Badge variant="outline" className="text-xs">
                              {chat.orderValue}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
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
                    <Settings className="h-4 w-4 mr-2" />
                    Config Avançada
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status do Sistema</CardTitle>
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
          </div>
        </TabsContent>

        {/* Bot Configuration Tab */}
        <TabsContent value="bot-config" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração do Bot</CardTitle>
                <CardDescription>
                  Personalize o comportamento da IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bot-name">Nome do Bot</Label>
                  <Input id="bot-name" defaultValue="DeliveryBot" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
                  <Textarea 
                    id="welcome-message"
                    defaultValue="Olá! 👋 Bem-vindo ao nosso restaurante! Sou a IA que vai te ajudar. Como posso ajudar você hoje?"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="personality">Personalidade da IA</Label>
                  <Textarea 
                    id="personality"
                    defaultValue="Seja amigável, prestativo e eficiente. Use emojis ocasionalmente. Foque em ajudar o cliente a fazer pedidos e responder dúvidas sobre o cardápio."
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-resposta</Label>
                    <p className="text-sm text-muted-foreground">
                      Responder automaticamente às mensagens
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sugestões Inteligentes</Label>
                    <p className="text-sm text-muted-foreground">
                      IA sugere produtos baseado no histórico
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fluxos Automáticos</CardTitle>
                <CardDescription>
                  Configure respostas automáticas
                </CardDescription>
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

        {/* Voice AI Tab */}
        <TabsContent value="voice-ai" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  IA de Voz - ElevenLabs
                </CardTitle>
                <CardDescription>
                  Atendimento por voz com IA avançada
                </CardDescription>
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
                  <Switch 
                    checked={isVoiceEnabled} 
                    onCheckedChange={toggleVoice}
                  />
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
                      <Button 
                        variant={isListening ? "destructive" : "hero"}
                        onClick={toggleListening}
                        className="flex-1"
                      >
                        {isListening ? (
                          <>
                            <MicOff className="h-4 w-4 mr-2" />
                            Parar Gravação
                          </>
                        ) : (
                          <>
                            <Mic className="h-4 w-4 mr-2" />
                            Testar Voz
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {isListening && (
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-red-800">Gravando...</span>
                        </div>
                        <p className="text-sm text-red-700">
                          Fale agora para testar a funcionalidade de voz da IA
                        </p>
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
                <CardTitle>Histórico de Conversas por Voz</CardTitle>
                <CardDescription>
                  Últimas interações por voz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { customer: "João Silva", duration: "2:34", status: "completed", order: "Pizza Margherita" },
                    { customer: "Maria Santos", duration: "1:22", status: "active", order: "Consultando cardápio" },
                    { customer: "Pedro Costa", duration: "3:45", status: "completed", order: "Hambúrguer + Batata" }
                  ].map((call, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{call.customer}</span>
                        </div>
                        <Badge 
                          variant="secondary"
                          className={call.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                        >
                          {call.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Duração: {call.duration}</span>
                        <span>{call.order}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Conversas por Dia"
              description="Volume de conversas e conversões"
              type="bar"
              data={conversationData}
            />
            <AnalyticsChart
              title="Intenções dos Clientes"
              description="O que os clientes mais buscam"
              type="pie"
              data={intentsData}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Métricas Detalhadas</CardTitle>
              <CardDescription>
                Performance do bot WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">76%</div>
                  <div className="text-sm font-medium">Taxa de Conversão</div>
                  <div className="text-xs text-muted-foreground">Conversas → Pedidos</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2.3s</div>
                  <div className="text-sm font-medium">Tempo de Resposta</div>
                  <div className="text-xs text-muted-foreground">Média da IA</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
                  <div className="text-sm font-medium">Satisfação</div>
                  <div className="text-xs text-muted-foreground">Avaliação clientes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integração WhatsApp Business</CardTitle>
              <CardDescription>
                Configure a conexão com WhatsApp Business API
              </CardDescription>
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
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações Avançadas
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuração ElevenLabs</CardTitle>
              <CardDescription>
                Configure a integração com ElevenLabs Voice AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="elevenlabs-api">ElevenLabs API Key</Label>
                <Input id="elevenlabs-api" type="password" placeholder="Digite sua chave da API ElevenLabs" />
                <p className="text-sm text-muted-foreground">
                  Necessário para funcionalidades de voz. Obtenha em elevenlabs.io
                </p>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsApp;