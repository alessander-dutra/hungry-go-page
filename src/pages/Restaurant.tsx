import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import MenuSection from "@/components/restaurant/MenuSection";
import Cart from "@/components/restaurant/Cart";

const Restaurant = () => {
  const navigate = useNavigate();
  const { cart, addItem, removeItem, updateQuantity, clearCart, getItemCount } = useCart();
  const { toast } = useToast();

  // Mock restaurant data
  const restaurant = {
    name: "Pizzaria Demo",
    description: "A melhor pizzaria da região! Massa artesanal, ingredientes frescos e sabores únicos que vão conquistar seu paladar. Tradição italiana com o tempero brasileiro.",
    rating: 4.8,
    reviewCount: 1247,
    deliveryTime: "30-45 min",
    deliveryFee: 5.90,
    minOrder: 25.00,
    address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
    phone: "(11) 99999-9999",
    image: "/placeholder.svg",
    isOpen: true
  };

  // Mock products data
  const products = [
    {
      id: "1",
      name: "Pizza Margherita",
      description: "Molho de tomate caseiro, mussarela de búfala, manjericão fresco e azeite extravirgem",
      price: 45.90,
      category: "Pizzas",
      image: "/pizzaria-margarita,jpg",
      popular: true,
      available: true
    },
    {
      id: "2", 
      name: "Pizza Pepperoni",
      description: "Molho de tomate, mussarela, pepperoni italiano e orégano",
      price: 52.90,
      category: "Pizzas",
      image: "/placeholder.svg",
      popular: true,
      available: true
    },
    {
      id: "3",
      name: "Pizza Portuguesa",
      description: "Molho de tomate, mussarela, presunto, ovo, cebola, azeitona e orégano",
      price: 48.90,
      category: "Pizzas",
      image: "/placeholder.svg",
      popular: false,
      available: true
    },
    {
      id: "4",
      name: "Hambúrguer Artesanal",
      description: "Blend 180g, queijo cheddar, alface, tomate, cebola roxa e molho especial",
      price: 32.90,
      category: "Hambúrguers",
      image: "/placeholder.svg",
      popular: true,
      available: true
    },
    {
      id: "5",
      name: "Cheeseburger Duplo",
      description: "Dois blends 150g, queijo cheddar duplo, picles, cebola e molho burger",
      price: 42.90,
      category: "Hambúrguers", 
      image: "/placeholder.svg",
      popular: false,
      available: true
    },
    {
      id: "6",
      name: "Batata Frita Grande",
      description: "Batatas cortadas na hora, temperadas com sal e ervas especiais",
      price: 18.90,
      category: "Acompanhamentos",
      image: "/placeholder.svg",
      popular: false,
      available: true
    },
    {
      id: "7",
      name: "Onion Rings",
      description: "Anéis de cebola empanados e fritos, acompanha molho barbecue",
      price: 16.90,
      category: "Acompanhamentos",
      image: "/placeholder.svg",
      popular: false,
      available: true
    },
    {
      id: "8",
      name: "Coca-Cola 2L",
      description: "Refrigerante de cola gelado, perfeito para acompanhar sua refeição",
      price: 8.50,
      category: "Bebidas",
      image: "/placeholder.svg",
      popular: false,
      available: true
    },
    {
      id: "9",
      name: "Suco Natural de Laranja",
      description: "Suco de laranja 100% natural, sem conservantes ou açúcar adicionado",
      price: 7.90,
      category: "Bebidas",
      image: "/placeholder.svg",
      popular: false,
      available: true
    },
    {
      id: "10",
      name: "Brownie com Sorvete",
      description: "Brownie de chocolate quente com uma bola de sorvete de baunilha",
      price: 15.90,
      category: "Sobremesas",
      image: "/placeholder.svg",
      popular: true,
      available: false
    }
  ];

  // Convert cart items to format needed by MenuSection
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
        variant: "destructive"
      });
      return;
    }

    // Navigate to checkout with cart data
    navigate("/checkout", { state: { cart } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Restaurant Header */}
      <RestaurantHeader {...restaurant} />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Menu Section */}
        <div className="flex-1">
          <MenuSection
            products={products}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
          />
        </div>

        {/* Cart Sidebar */}
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