import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  ShoppingBag,
  MessageCircle,
  Star,
  Clock
} from "lucide-react";

interface Notification {
  id: string;
  type: 'order' | 'review' | 'system' | 'promotion';
  title: string;
  message: string;
  time: string;
  read: boolean;
  urgent?: boolean;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      title: "Novo Pedido",
      message: "João Silva fez um pedido de R$ 54,40",
      time: "2 min atrás",
      read: false,
      urgent: true
    },
    {
      id: "2", 
      type: "review",
      title: "Nova Avaliação",
      message: "Maria deu 5 estrelas: 'Excelente atendimento!'",
      time: "15 min atrás",
      read: false
    },
    {
      id: "3",
      type: "system",
      title: "WhatsApp Conectado",
      message: "Integração com WhatsApp Business ativada com sucesso",
      time: "1 hora atrás", 
      read: true
    },
    {
      id: "4",
      type: "promotion",
      title: "IA Sugere Promoção",
      message: "Crie uma oferta de pizza para aumentar vendas em 23%",
      time: "2 horas atrás",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-4 w-4 text-green-600" />;
      case 'review':
        return <Star className="h-4 w-4 text-yellow-600" />;
      case 'system':
        return <Info className="h-4 w-4 text-blue-600" />;
      case 'promotion':
        return <MessageCircle className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'order':
        return "bg-green-100 text-green-800";
      case 'review':
        return "bg-yellow-100 text-yellow-800";
      case 'system':
        return "bg-blue-100 text-blue-800";
      case 'promotion':
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Acompanhe atividades importantes do seu restaurante
            </CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                    !notification.read 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-background border-border'
                  } ${notification.urgent ? 'ring-2 ring-red-200' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-blue-900' : ''}`}>
                            {notification.title}
                          </p>
                          {notification.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgente
                            </Badge>
                          )}
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getBadgeColor(notification.type)}`}
                          >
                            {notification.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {notification.time}
                          </div>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs h-6 px-2"
                              >
                                Marcar como lida
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeNotification(notification.id)}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma notificação</h3>
                <p className="text-muted-foreground">
                  Você está em dia com todas as atividades!
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;