import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Heart,
  Share2,
  Info
} from "lucide-react";

interface RestaurantHeaderProps {
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  address: string;
  phone: string;
  image: string;
  isOpen: boolean;
}

const RestaurantHeader = ({
  name,
  description,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  minOrder,
  address,
  phone,
  image,
  isOpen
}: RestaurantHeaderProps) => {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="h-64 lg:h-80 relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm border-white/20">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm border-white/20">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge 
            variant={isOpen ? "default" : "secondary"}
            className={isOpen ? "bg-green-600 hover:bg-green-600" : "bg-red-600 hover:bg-red-600"}
          >
            {isOpen ? "Aberto" : "Fechado"}
          </Badge>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{name}</h1>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {description}
              </p>
              
              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-muted-foreground">({reviewCount} avaliações)</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{phone}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info Card */}
            <div className="bg-muted/50 rounded-xl p-6 lg:w-80">
              <h3 className="font-semibold mb-4">Informações de Entrega</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Tempo de entrega</span>
                  </div>
                  <span className="font-semibold">{deliveryTime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Taxa de entrega</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? "Grátis" : `R$ ${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pedido mínimo</span>
                  <span className="font-semibold">R$ {minOrder.toFixed(2)}</span>
                </div>
              </div>

              {deliveryFee === 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Info className="h-4 w-4" />
                    <span className="text-sm font-medium">Entrega grátis!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;