import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Phone, 
  PhoneOff,
  Settings,
  PlayCircle,
  PauseCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VoiceChatProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const VoiceChat = ({ isEnabled, onToggle }: VoiceChatProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [agentId, setAgentId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [voiceId, setVoiceId] = useState("");

  // Simulated ElevenLabs integration
  const startConversation = async () => {
    if (!agentId || !apiKey) {
      toast({
        title: "Configuração Incompleta",
        description: "Configure o Agent ID e API Key primeiro",
        variant: "destructive"
      });
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsConnected(true);
      setIsListening(true);
      
      toast({
        title: "Conversa Iniciada",
        description: "IA de voz ativa e ouvindo"
      });

      // Simulate conversation flow
      setTimeout(() => {
        setIsSpeaking(true);
        setTimeout(() => {
          setIsSpeaking(false);
        }, 3000);
      }, 2000);

    } catch (error) {
      toast({
        title: "Erro de Microfone",
        description: "Permissão de microfone necessária",
        variant: "destructive"
      });
    }
  };

  const endConversation = async () => {
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
    
    toast({
      title: "Conversa Finalizada",
      description: "IA de voz desconectada"
    });
  };

  const toggleMute = () => {
    setIsListening(!isListening);
  };

  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume);
  };

  if (!isEnabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            IA de Voz Desativada
          </CardTitle>
          <CardDescription>
            Ative a funcionalidade de voz para usar o ElevenLabs Voice AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onToggle} variant="hero" className="w-full">
            <Volume2 className="h-4 w-4 mr-2" />
            Ativar IA de Voz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              ElevenLabs Voice AI
            </CardTitle>
            <CardDescription>
              Conversação inteligente por voz
            </CardDescription>
          </div>
          <Badge 
            variant={isConnected ? "default" : "secondary"}
            className={isConnected ? "bg-green-100 text-green-800" : ""}
          >
            {isConnected ? "Conectado" : "Desconectado"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="agent-id">Agent ID</Label>
            <Input 
              id="agent-id"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              placeholder="Digite o Agent ID do ElevenLabs"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input 
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Digite sua API Key"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="voice-id">Voice ID (Opcional)</Label>
            <Input 
              id="voice-id"
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              placeholder="ID da voz personalizada"
            />
          </div>
        </div>

        {/* Connection Status */}
        {isConnected && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">Conversa Ativa</span>
              </div>
              <div className="flex items-center space-x-2">
                {isListening && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <Mic className="h-3 w-3 mr-1" />
                    Ouvindo
                  </Badge>
                )}
                {isSpeaking && (
                  <Badge className="bg-purple-100 text-purple-800">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Falando
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleMute}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-1" />
                    Mute
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-1" />
                    Unmute
                  </>
                )}
              </Button>
              
              <div className="flex items-center space-x-2 flex-1">
                <VolumeX className="h-4 w-4 text-muted-foreground" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => adjustVolume(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {!isConnected ? (
            <Button 
              onClick={startConversation}
              variant="hero"
              className="flex-1"
              disabled={!agentId || !apiKey}
            >
              <Phone className="h-4 w-4 mr-2" />
              Iniciar Conversa por Voz
            </Button>
          ) : (
            <Button 
              onClick={endConversation}
              variant="destructive"
              className="flex-1"
            >
              <PhoneOff className="h-4 w-4 mr-2" />
              Finalizar Conversa
            </Button>
          )}
          
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Conversation Preview */}
        {isConnected && (
          <div className="border rounded-lg p-4 bg-muted/50">
            <h4 className="font-medium mb-3">Prévia da Conversa</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <Volume2 className="h-3 w-3 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-purple-800 font-medium">IA:</p>
                  <p className="text-muted-foreground">
                    Olá! Como posso ajudá-lo hoje? Posso apresentar nosso cardápio ou ajudar com um pedido.
                  </p>
                </div>
              </div>
              
              {isListening && (
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mic className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-800 font-medium">Cliente:</p>
                    <p className="text-muted-foreground italic">
                      {isSpeaking ? "Aguardando resposta..." : "Ouvindo..."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Helper Text */}
        <div className="text-xs text-muted-foreground">
          <p>💡 Dica: Configure seu Agent ID no ElevenLabs Dashboard para personalizar a voz e comportamento da IA.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChat;