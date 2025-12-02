import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Printer, FileText } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  estimatedTime: string;
  customerNotes?: string;
}

interface PrintTicketModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PrintDestination = "default" | "thermal" | "a4" | "pdf";

const PrintTicketModal = ({ order, open, onOpenChange }: PrintTicketModalProps) => {
  const [destination, setDestination] = useState<PrintDestination>("default");
  const [includeCustomerNotes, setIncludeCustomerNotes] = useState(true);
  const [includeAddress, setIncludeAddress] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  if (!order) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Não foi possível abrir a janela de impressão");
      return;
    }

    const styles = destination === "thermal" 
      ? `
        body { 
          font-family: 'Courier New', monospace; 
          font-size: 12px; 
          width: 80mm; 
          margin: 0 auto;
          padding: 5mm;
        }
        .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
        .item { display: flex; justify-content: space-between; margin: 5px 0; }
        .total { border-top: 1px dashed #000; margin-top: 10px; padding-top: 10px; font-weight: bold; }
        .notes { border-top: 1px dashed #000; margin-top: 10px; padding-top: 10px; font-style: italic; }
        .footer { text-align: center; margin-top: 15px; font-size: 10px; }
      `
      : `
        body { 
          font-family: Arial, sans-serif; 
          font-size: 14px;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
        }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 15px; }
        .header h1 { margin: 0 0 5px 0; }
        .section { margin: 15px 0; }
        .section-title { font-weight: bold; margin-bottom: 8px; color: #333; }
        .item { display: flex; justify-content: space-between; margin: 8px 0; padding: 5px 0; border-bottom: 1px solid #eee; }
        .total { border-top: 2px solid #000; margin-top: 15px; padding-top: 15px; font-weight: bold; font-size: 16px; display: flex; justify-content: space-between; }
        .notes { background: #f5f5f5; padding: 10px; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        .customer-info { background: #f9f9f9; padding: 10px; border-radius: 5px; }
      `;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Pedido #${order.id}</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="header">
          <h1>Pedido #${order.id}</h1>
          <p>${order.createdAt} - ${order.estimatedTime}</p>
        </div>
        
        <div class="section customer-info">
          <div class="section-title">Cliente</div>
          <p><strong>${order.customerName}</strong></p>
          <p>${order.customerPhone}</p>
          ${includeAddress ? `<p>${order.address}</p>` : ''}
        </div>
        
        <div class="section">
          <div class="section-title">Itens</div>
          ${order.items.map(item => `
            <div class="item">
              <span>${item.quantity}x ${item.name}</span>
              <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="total">
          <span>Total:</span>
          <span>R$ ${order.total.toFixed(2)}</span>
        </div>
        
        ${includeCustomerNotes && order.customerNotes ? `
          <div class="notes">
            <div class="section-title">Observações:</div>
            <p>${order.customerNotes}</p>
          </div>
        ` : ''}
        
        <div class="footer">
          <p>Obrigado pela preferência!</p>
          <p>${new Date().toLocaleString('pt-BR')}</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    
    if (destination === "pdf") {
      toast.info("Use 'Salvar como PDF' na janela de impressão");
    }
    
    printWindow.onload = () => {
      printWindow.print();
    };

    toast.success("Ticket enviado para impressão");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            Imprimir Ticket
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Destino da impressão</Label>
            <Select
              value={destination}
              onValueChange={(value) => setDestination(value as PrintDestination)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o destino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">
                  <div className="flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    Impressora Padrão
                  </div>
                </SelectItem>
                <SelectItem value="thermal">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Impressora Térmica (80mm)
                  </div>
                </SelectItem>
                <SelectItem value="a4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Folha A4
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Salvar como PDF
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Opções de conteúdo</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-notes"
                checked={includeCustomerNotes}
                onCheckedChange={(checked) => setIncludeCustomerNotes(checked as boolean)}
              />
              <label
                htmlFor="include-notes"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Incluir observações do cliente
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-address"
                checked={includeAddress}
                onCheckedChange={(checked) => setIncludeAddress(checked as boolean)}
              />
              <label
                htmlFor="include-address"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Incluir endereço de entrega
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-muted/50">
            <p className="text-sm font-medium mb-2">Prévia:</p>
            <div className="text-xs space-y-1">
              <p><strong>Pedido #{order.id}</strong></p>
              <p>{order.customerName}</p>
              <p>{order.items.length} item(s) - R$ {order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintTicketModal;
