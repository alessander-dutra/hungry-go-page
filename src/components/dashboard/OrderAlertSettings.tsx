import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Bell, BellOff, Volume2, Play } from "lucide-react";
import { useOrderAlerts, SOUND_OPTIONS, AlertSound } from "@/hooks/useOrderAlerts";

const OrderAlertSettings = () => {
  const { settings, toggleEnabled, setSound, setVolume, testSound } = useOrderAlerts();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          {settings.enabled ? (
            <Bell className="h-4 w-4 mr-2" />
          ) : (
            <BellOff className="h-4 w-4 mr-2" />
          )}
          Alertas
          {settings.enabled && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Configurações de Alerta</h4>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="alert-enabled" className="text-sm">
              Alertas sonoros
            </Label>
            <Switch
              id="alert-enabled"
              checked={settings.enabled}
              onCheckedChange={toggleEnabled}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Som do alerta</Label>
            <div className="flex gap-2">
              <Select
                value={settings.sound}
                onValueChange={(value) => setSound(value as AlertSound)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione o som" />
                </SelectTrigger>
                <SelectContent>
                  {SOUND_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={testSound}
                title="Testar som"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Volume</Label>
              <span className="text-sm text-muted-foreground">
                {Math.round(settings.volume * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[settings.volume]}
                onValueChange={([value]) => setVolume(value)}
                max={1}
                step={0.1}
                className="flex-1"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Os alertas sonoros serão emitidos quando novos pedidos chegarem.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderAlertSettings;
