import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Bot, 
  User, 
  Smartphone,
  Clock,
  CheckCircle2,
  ShoppingCart,
  MessageCircle
} from "lucide-react";

interface Message {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
  type: 'text' | 'order' | 'menu';
  metadata?: {
    orderId?: string;
    items?: string[];
    total?: number;
  };
}

interface ChatInterfaceProps {
  customerName: string;
  customerPhone: string;
  onClose?: () => void;
}

const ChatInterface = ({ customerName, customerPhone, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      content: "Olá! 👋 Bem-vindo ao nosso restaurante! Sou a IA que vai te ajudar hoje. Como posso ajudá-lo?",
      timestamp: "14:23",
      type: "text"
    },
    {
      id: "2", 
      sender: "user",
      content: "Oi! Quero ver o cardápio de vocês",
      timestamp: "14:24",
      type: "text"
    },
    {
      id: "3",
      sender: "bot", 
      content: "Perfeito! 📋 Aqui estão nossas categorias:\n\n🍕 Pizzas - a partir de R$ 35,90\n🍔 Hambúrguers - a partir de R$ 28,90\n🍝 Massas - a partir de R$ 32,90\n🥗 Saladas - a partir de R$ 24,90\n🥤 Bebidas - a partir de R$ 6,50\n\nQual categoria te interessa mais?",
      timestamp: "14:24",
      type: "menu"
    },
    {
      id: "4",
      sender: "user",
      content: "Quero uma pizza margherita grande",
      timestamp: "14:25", 
      type: "text"
    },
    {
      id: "5",
      sender: "bot",
      content: "Excelente escolha! 🍕 Pizza Margherita Grande por R$ 45,90\n\n📝 Seu pedido:\n• 1x Pizza Margherita G - R$ 45,90\n\nGostaria de adicionar alguma bebida ou sobremesa?",
      timestamp: "14:25",
      type: "order",
      metadata: {
        orderId: "ORD001234",
        items: ["Pizza Margherita G"],
        total: 45.90
      }
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot", 
        content: generateBotResponse(newMessage),
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        type: "text"
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("preço") || input.includes("valor") || input.includes("quanto")) {
      return "💰 Nossos preços variam por categoria:\n\n🍕 Pizzas: R$ 35,90 - R$ 55,90\n🍔 Hambúrguers: R$ 28,90 - R$ 42,90\n🍝 Massas: R$ 32,90 - R$ 48,90\n\nQual produto específico você gostaria de saber o preço?";
    }
    
    if (input.includes("entrega") || input.includes("delivery")) {
      return "🚚 Informações sobre entrega:\n\n• Taxa: R$ 5,90\n• Tempo: 35-45 minutos\n• Entrega grátis para pedidos acima de R$ 50,00\n• Raio de entrega: 5km\n\nQual seu endereço para confirmar se entregamos?";
    }
    
    if (input.includes("horário") || input.includes("funcionamento")) {
      return "🕐 Nosso horário de funcionamento:\n\n• Segunda a Quinta: 11h às 23h\n• Sexta e Sábado: 11h às 00h\n• Domingo: 11h às 22h\n\nEstamos abertos agora e recebendo pedidos! 😊";
    }
    
    if (input.includes("obrigad") || input.includes("valeu")) {
      return "😊 Por nada! Foi um prazer ajudar você!\n\nSe precisar de mais alguma coisa ou quiser fazer um pedido, é só chamar. Estamos sempre aqui para te atender! 🍕❤️";
    }
    
    return "Entendi! 🤔 Deixe-me ajudar você com isso.\n\nPosso te mostrar nosso cardápio completo, informar preços, ou se preferir, já podemos começar seu pedido. O que você gostaria de fazer?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getMessageIcon = (sender: string, type: string) => {
    if (sender === "bot") {
      if (type === "order") return <ShoppingCart className="h-4 w-4" />;
      if (type === "menu") return <MessageCircle className="h-4 w-4" />;
      return <Bot className="h-4 w-4" />;
    }
    return <User className="h-4 w-4" />;
  };

  const getMessageBgColor = (sender: string, type: string) => {
    if (sender === "bot") {
      if (type === "order") return "bg-green-50 border-green-200";
      if (type === "menu") return "bg-blue-50 border-blue-200";
      return "bg-gray-50 border-gray-200";
    }
    return "bg-primary/10 border-primary/20";
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{customerName}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                {customerPhone}
                <Badge className="bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </Badge>
              </CardDescription>
            </div>
          </div>
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              Fechar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`p-3 rounded-lg border ${getMessageBgColor(message.sender, message.type)}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      {getMessageIcon(message.sender, message.type)}
                      <span className="text-xs font-medium">
                        {message.sender === 'bot' ? 'DeliveryBot' : customerName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {message.metadata && message.type === "order" && (
                      <div className="mt-3 p-2 bg-white rounded border">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium">Pedido #{message.metadata.orderId}</span>
                          <span className="text-green-600 font-bold">
                            R$ {message.metadata.total?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className="p-3 rounded-lg border bg-gray-50 border-gray-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">DeliveryBot</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={sendMessage}
              disabled={!newMessage.trim() || isTyping}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;