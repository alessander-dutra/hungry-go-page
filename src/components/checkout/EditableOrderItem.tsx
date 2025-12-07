import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface EditableOrderItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const EditableOrderItem = ({ item, onUpdateQuantity, onRemove }: EditableOrderItemProps) => {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showQuantityDialog, setShowQuantityDialog] = useState(false);
  const [pendingQuantity, setPendingQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      setShowRemoveDialog(true);
      return;
    }
    setPendingQuantity(newQuantity);
    setShowQuantityDialog(true);
  };

  const confirmQuantityChange = () => {
    onUpdateQuantity(item.id, pendingQuantity);
    setShowQuantityDialog(false);
  };

  const confirmRemove = () => {
    onRemove(item.id);
    setShowRemoveDialog(false);
  };

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-3 flex-1">
          <div className="flex items-center gap-1 bg-muted rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{item.name}</div>
            <div className="text-xs text-muted-foreground">
              R$ {item.price.toFixed(2)} cada
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            R$ {(item.price * item.quantity).toFixed(2)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setShowRemoveDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Confirm Quantity Change Dialog */}
      <AlertDialog open={showQuantityDialog} onOpenChange={setShowQuantityDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alterar quantidade?</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja alterar a quantidade de "{item.name}" de {item.quantity} para {pendingQuantity}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmQuantityChange}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Remove Dialog */}
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover item?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover "{item.name}" do seu pedido?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditableOrderItem;
