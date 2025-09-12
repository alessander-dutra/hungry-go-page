import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  popular?: boolean;
  available?: boolean;
  onAddToCart: (product: { id: string; name: string; price: number; image?: string }) => void;
  cartQuantity?: number;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  popular = false,
  available = true,
  onAddToCart,
  cartQuantity = 0,
  onUpdateQuantity
}: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    if (!available) return;
    
    setIsLoading(true);
    onAddToCart({ id, name, price, image });
    
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  return (
    <Card className={`card-hover ${!available ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        {/* Product Image */}
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-muted-foreground text-4xl">🍽️</div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {popular && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                Popular
              </Badge>
            )}
            {!available && (
              <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                Indisponível
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary">
            R$ {price.toFixed(2)}
          </div>
        </div>

        {/* Add to Cart Controls */}
        {cartQuantity > 0 ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(cartQuantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="font-semibold min-w-[2rem] text-center">
                {cartQuantity}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(cartQuantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              No carrinho
            </div>
          </div>
        ) : (
          <Button
            variant="hero"
            size="lg"
            className="w-full group"
            onClick={handleAddToCart}
            disabled={!available || isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adicionando...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Adicionar
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;