import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatsCard from "@/components/dashboard/StatsCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { 
  MessageCircle, 
  TrendingUp,
  Phone,
  Send,
  Download,
  Filter,
  Search,
  Star,
  Clock,
  Smartphone,
  Volume2,
  Calendar,
  History,
  Mic
} from "lucide-react";

const WhatsApp = () => {
  const [historyTab, setHistoryTab] = useState<"messages" | "voice">("messages");
  const [historyFilter, setHistoryFilter] = useState("all");
  const [historyDateFilter, setHistoryDateFilter] = useState("7days");
  const [historySearch, setHistorySearch] = useState("");
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<Record<string, number>>({});

  const toggleAudio = (id: string) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
      // Simulate audio progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setAudioProgress(prev => ({ ...prev, [id]: progress }));
        if (progress >= 100) {
          clearInterval(interval);
          setPlayingAudioId(null);
          setAudioProgress(prev => ({ ...prev, [id]: 0 }));
        }
      }, 100);
    }
  };

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

  const messageHistory = [
    { id: "1", customer: "João Silva", phone: "(11) 99999-9999", messages: 12, date: "23/02/2026", status: "converted", lastMessage: "Pedido #1234 confirmado!" },
    { id: "2", customer: "Ana Oliveira", phone: "(11) 96666-6666", messages: 5, date: "23/02/2026", status: "pending", lastMessage: "Vou pensar e retorno..." },
    { id: "3", customer: "Carlos Lima", phone: "(11) 95555-5555", messages: 8, date: "22/02/2026", status: "converted", lastMessage: "Pizza + refrigerante, por favor!" },
    { id: "4", customer: "Maria Santos", phone: "(11) 88888-8888", messages: 3, date: "22/02/2026", status: "info", lastMessage: "Obrigada pela informação!" },
    { id: "5", customer: "Pedro Costa", phone: "(11) 77777-7777", messages: 15, date: "21/02/2026", status: "converted", lastMessage: "Pedido #1230 confirmado!" },
    { id: "6", customer: "Fernanda Souza", phone: "(11) 94444-4444", messages: 2, date: "20/02/2026", status: "abandoned", lastMessage: "..." },
  ];

  const voiceHistory = [
    { id: "1", customer: "João Silva", phone: "(11) 99999-9999", duration: "2:34", date: "23/02/2026", status: "completed", order: "Pizza Margherita" },
    { id: "2", customer: "Maria Santos", phone: "(11) 88888-8888", duration: "1:22", date: "23/02/2026", status: "completed", order: "Consultou cardápio" },
    { id: "3", customer: "Pedro Costa", phone: "(11) 77777-7777", duration: "3:45", date: "22/02/2026", status: "completed", order: "Hambúrguer + Batata" },
    { id: "4", customer: "Ana Oliveira", phone: "(11) 96666-6666", duration: "0:45", date: "21/02/2026", status: "dropped", order: "Desistiu" },
    { id: "5", customer: "Lucas Mendes", phone: "(11) 93333-3333", duration: "4:12", date: "20/02/2026", status: "completed", order: "Combo família" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'abandoned': return 'bg-red-100 text-red-800';
      case 'dropped': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'converted': return 'Convertido';
      case 'pending': return 'Pendente';
      case 'info': return 'Informação';
      case 'abandoned': return 'Abandonado';
      case 'completed': return 'Concluído';
      case 'dropped': return 'Desistiu';
      case 'active': return 'Ativo';
      default: return status;
    }
  };

  const filteredMessageHistory = messageHistory.filter(item => {
    if (historyFilter !== "all" && item.status !== historyFilter) return false;
    if (historySearch && !item.customer.toLowerCase().includes(historySearch.toLowerCase()) && !item.phone.includes(historySearch)) return false;
    return true;
  });

  const filteredVoiceHistory = voiceHistory.filter(item => {
    const statusMatch = historyFilter === "all" || item.status === historyFilter;
    const searchMatch = !historySearch || item.customer.toLowerCase().includes(historySearch.toLowerCase()) || item.phone.includes(historySearch);
    return statusMatch && searchMatch;
  });

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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                              <Badge variant="secondary" className={getStatusColor(chat.status)}>
                                {getStatusLabel(chat.status)}
                              </Badge>
                              {chat.converted && (
                                <Badge className="bg-green-100 text-green-800">Convertido</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{chat.phone}</p>
                            <p className="text-sm">{chat.lastMessage}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">{chat.time} atrás</p>
                          {chat.orderValue && (
                            <Badge variant="outline" className="text-xs">{chat.orderValue}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* History Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <History className="h-5 w-5" />
                    Histórico
                  </CardTitle>
                  <CardDescription>Consulte conversas anteriores</CardDescription>
                  
                  {/* History type toggle */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant={historyTab === "messages" ? "default" : "outline"} 
                      size="sm" 
                      className="flex-1"
                      onClick={() => { setHistoryTab("messages"); setHistoryFilter("all"); }}
                    >
                      <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                      Mensagens
                    </Button>
                    <Button 
                      variant={historyTab === "voice" ? "default" : "outline"} 
                      size="sm" 
                      className="flex-1"
                      onClick={() => { setHistoryTab("voice"); setHistoryFilter("all"); }}
                    >
                      <Mic className="h-3.5 w-3.5 mr-1.5" />
                      Voz
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {/* Filters */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input 
                        placeholder="Buscar cliente ou telefone..." 
                        className="pl-8 h-8 text-sm"
                        value={historySearch}
                        onChange={(e) => setHistorySearch(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={historyFilter} onValueChange={setHistoryFilter}>
                        <SelectTrigger className="h-8 text-xs flex-1">
                          <Filter className="h-3 w-3 mr-1" />
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="converted">Convertido</SelectItem>
                          {historyTab === "messages" && (
                            <>
                              <SelectItem value="pending">Pendente</SelectItem>
                              <SelectItem value="info">Informação</SelectItem>
                              <SelectItem value="abandoned">Abandonado</SelectItem>
                            </>
                          )}
                          {historyTab === "voice" && (
                            <>
                              <SelectItem value="completed">Concluído</SelectItem>
                              <SelectItem value="dropped">Desistiu</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      <Select value={historyDateFilter} onValueChange={setHistoryDateFilter}>
                        <SelectTrigger className="h-8 text-xs flex-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <SelectValue placeholder="Período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Hoje</SelectItem>
                          <SelectItem value="7days">7 dias</SelectItem>
                          <SelectItem value="30days">30 dias</SelectItem>
                          <SelectItem value="90days">90 dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* History list */}
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                    {historyTab === "messages" ? (
                      filteredMessageHistory.length > 0 ? filteredMessageHistory.map((item) => (
                        <div key={item.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm truncate">{item.customer}</span>
                            <Badge variant="secondary" className={`${getStatusColor(item.status)} text-[10px] px-1.5 py-0`}>
                              {getStatusLabel(item.status)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{item.phone}</p>
                          <p className="text-xs truncate">{item.lastMessage}</p>
                          <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground">
                            <span>{item.messages} msgs</span>
                            <span>{item.date}</span>
                          </div>
                        </div>
                      )) : (
                        <p className="text-sm text-muted-foreground text-center py-4">Nenhuma conversa encontrada</p>
                      )
                    ) : (
                      filteredVoiceHistory.length > 0 ? filteredVoiceHistory.map((item) => (
                        <div key={item.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5 text-green-600" />
                              <span className="font-medium text-sm truncate">{item.customer}</span>
                            </div>
                            <Badge variant="secondary" className={`${getStatusColor(item.status)} text-[10px] px-1.5 py-0`}>
                              {getStatusLabel(item.status)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{item.phone}</p>
                          <p className="text-xs truncate">{item.order}</p>
                          <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground">
                            <span>⏱ {item.duration}</span>
                            <span>{item.date}</span>
                          </div>
                        </div>
                      )) : (
                        <p className="text-sm text-muted-foreground text-center py-4">Nenhuma chamada encontrada</p>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
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
              <CardDescription>Performance do bot WhatsApp</CardDescription>
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
      </Tabs>
    </div>
  );
};

export default WhatsApp;
