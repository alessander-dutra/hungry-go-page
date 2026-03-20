import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { useRestaurantBranding } from "@/hooks/useRestaurantBranding";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import MenuSection from "@/components/restaurant/MenuSection";
import Cart from "@/components/restaurant/Cart";
import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaPepperoni from "@/assets/pizza-pepperoni.jpg";
import pizzaPortuguesa from "@/assets/pizza-portuguesa.jpg";
import hamburguerArtesanal from "@/assets/hamburguer-artesanal.jpg";
import cheeseburgerDuplo from "@/assets/cheeseburger-duplo.jpg";
import batataFrita from "@/assets/batata-frita.jpg";
import onionRings from "@/assets/onion-rings.jpg";
import cocaCola from "@/assets/coca-cola.jpg";
import sucoLaranja from "@/assets/suco-laranja.jpg";
import brownieSorvete from "@/assets/brownie-sorvete.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

const Restaurant = () => {
  const navigate = useNavigate();
  const { cart, addItem, removeItem, updateQuantity, clearCart, getItemCount } = useCart();
  const { toast } = useToast();
  const { bannerUrl } = useRestaurantBranding();

  const restaurant = {
    name: "Pizzaria Demo",
    description:
      "A melhor pizzaria da região! Massa artesanal, ingredientes frescos e sabores únicos que vão conquistar seu paladar. Tradição italiana com o tempero brasileiro.",
    rating: 4.8,
    reviewCount: 1247,
    deliveryTime: "30-45 min",
    deliveryFee: 5.9,
    minOrder: 25.0,
    address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
    phone: "(11) 99999-9999",
    image: bannerUrl || heroBanner,
    banner: bannerUrl || heroBanner,
    isOpen: true,
  };

  const products = [
    {
      id: "1",
      name: "Pizza Margherita",
      description: "Molho de tomate caseiro, mussarela de búfala, manjericão fresco e azeite extravirgem",
      price: 45.9,
      category: "Pizzas",
      image: pizzaMargherita,
      popular: true,
      available: true,
    },
    {
      id: "2",
      name: "Pizza Pepperoni",
      description: "Molho de tomate, mussarela, pepperoni italiano e orégano",
      price: 52.9,
      category: "Pizzas",
      image: pizzaPepperoni,
      popular: true,
      available: true,
    },
    {
      id: "3",
      name: "Pizza Portuguesa",
      description: "Molho de tomate, mussarela, presunto, ovo, cebola, azeitona e orégano",
      price: 48.9,
      category: "Pizzas",
      image: pizzaPortuguesa,
      popular: false,
      available: true,
    },
    {
      id: "4",
      name: "Hambúrguer Artesanal",
      description: "Blend 180g, queijo cheddar, alface, tomate, cebola roxa e molho especial",
      price: 32.9,
      category: "Hambúrguers",
      image: hamburguerArtesanal,
      popular: true,
      available: true,
    },
    {
      id: "5",
      name: "Cheeseburger Duplo",
      description: "Dois blends 150g, queijo cheddar duplo, picles, cebola e molho burger",
      price: 42.9,
      category: "Hambúrguers",
      image: cheeseburgerDuplo,
      popular: false,
      available: true,
    },
    {
      id: "6",
      name: "Batata Frita Grande",
      description: "Batatas cortadas na hora, temperadas com sal e ervas especiais",
      price: 18.9,
      category: "Acompanhamentos",
      image: batataFrita,
      popular: false,
      available: true,
    },
    {
      id: "7",
      name: "Onion Rings",
      description: "Anéis de cebola empanados e fritos, acompanha molho barbecue",
      price: 16.9,
      category: "Acompanhamentos",
      image: onionRings,
      popular: false,
      available: true,
    },
    {
      id: "8",
      name: "Coca-Cola 2L",
      description: "Refrigerante de cola gelado, perfeito para acompanhar sua refeição",
      price: 8.5,
      category: "Bebidas",
      image: cocaCola,
      popular: false,
      available: true,
    },
    {
      id: "9",
      name: "Suco Natural de Laranja",
      description: "Suco de laranja 100% natural, sem conservantes ou açúcar adicionado",
      price: 7.9,
      category: "Bebidas",
      image: sucoLaranja,
      popular: false,
      available: true,
    },
    {
      id: "10",
      name: "Brownie com Sorvete",
      description: "Brownie de chocolate quente com uma bola de sorvete de baunilha",
      price: 15.9,
      category: "Sobremesas",
      image: brownieSorvete,
      popular: true,
      available: false,
    },
  ];

  const cartItems = cart.items.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {} as { [key: string]: number });

  const handleAddToCart = (product: { id: string; name: string; price: number; image?: string }) => {
    addItem(product);
    toast({
      title: "Item adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de finalizar o pedido.",
        variant: "destructive",
      });
      return;
    }

    navigate("/checkout", { state: { cart } });
  };

  return (
    <div className="min-h-screen bg-background">
      <RestaurantHeader {...restaurant} />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <MenuSection
            products={products}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
          />
        </div>

        <div className="lg:w-80 lg:pr-4">
          <div className="lg:sticky lg:top-4">
            <Cart
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onCheckout={handleCheckout}
              minOrderValue={restaurant.minOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
