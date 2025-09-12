import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  popular?: boolean;
  available?: boolean;
}

interface MenuSectionProps {
  products: Product[];
  onAddToCart: (product: { id: string; name: string; price: number; image?: string }) => void;
  cartItems: { [key: string]: number };
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuSection = ({ 
  products, 
  onAddToCart, 
  cartItems, 
  onUpdateQuantity 
}: MenuSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Get unique categories
  const categories = ["Todos", ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group products by category for display
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const getCategoryCount = (category: string) => {
    if (category === "Todos") return products.length;
    return products.filter(p => p.category === category).length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pratos, bebidas, sobremesas..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter Button (Mobile) */}
          <Button variant="outline" className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              <Badge variant="secondary" className="ml-2">
                {getCategoryCount(category)}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      {selectedCategory === "Todos" ? (
        // Show all categories grouped
        Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{category}</h2>
              <Badge variant="outline">
                {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'itens'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={onAddToCart}
                  cartQuantity={cartItems[product.id] || 0}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        // Show selected category only
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{selectedCategory}</h2>
            <Badge variant="outline">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'itens'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={onAddToCart}
                cartQuantity={cartItems[product.id] || 0}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar sua busca ou navegue pelas categorias
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuSection;