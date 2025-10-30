import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Image,
  DollarSign,
  Eye,
  EyeOff
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  popular: boolean;
}

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<MenuItem>>({});

  // Mock menu data
  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Pizza Margherita",
      description: "Molho de tomate, mussarela, manjericão fresco e azeite",
      price: 45.90,
      category: "Pizzas",
      image: "/placeholder.svg",
      available: true,
      popular: true
    },
    {
      id: "2", 
      name: "Hambúrguer Artesanal",
      description: "Blend 180g, queijo cheddar, alface, tomate, cebola roxa",
      price: 32.90,
      category: "Hambúrguers",
      image: "/placeholder.svg",
      available: true,
      popular: false
    },
    {
      id: "3",
      name: "Salada Caesar",
      description: "Alface romana, croutons, parmesão, molho caesar",
      price: 28.90,
      category: "Saladas",
      image: "/placeholder.svg",
      available: false,
      popular: false
    },
    {
      id: "4",
      name: "Pasta Carbonara",
      description: "Espaguete, bacon, ovos, parmesão, pimenta preta",
      price: 38.90,
      category: "Massas",
      image: "/placeholder.svg",
      available: true,
      popular: true
    },
    {
      id: "5",
      name: "Coca-Cola 2L",
      description: "Refrigerante de cola gelado",
      price: 8.50,
      category: "Bebidas",
      image: "/placeholder.svg",
      available: true,
      popular: false
    }
  ];

  const categories = ["Todos", "Pizzas", "Hambúrguers", "Saladas", "Massas", "Bebidas"];

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (category: string) => {
    if (category === "Todos") return menuItems.length;
    return menuItems.filter(item => item.category === category).length;
  };

  const handleEditClick = (item: MenuItem) => {
    setEditingItem(item);
    setEditFormData(item);
  };

  const handleSaveEdit = () => {
    // Aqui você implementaria a lógica de salvar no backend
    toast.success("Item atualizado com sucesso!");
    setEditingItem(null);
    setEditFormData({});
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setEditFormData({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Cardápio</h2>
          <p className="text-muted-foreground">
            Gerencie os produtos do seu restaurante
          </p>
        </div>
        
        <Button variant="hero" className="group">
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
          Adicionar Item
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Itens</p>
                <p className="text-2xl font-bold">{menuItems.length}</p>
              </div>
              <div className="text-xs text-muted-foreground">Produtos</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disponíveis</p>
                <p className="text-2xl font-bold text-green-600">
                  {menuItems.filter(item => item.available).length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Indisponíveis</p>
                <p className="text-2xl font-bold text-red-600">
                  {menuItems.filter(item => !item.available).length}
                </p>
              </div>
              <EyeOff className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Preço Médio</p>
                <p className="text-2xl font-bold">
                  R$ {(menuItems.reduce((acc, item) => acc + item.price, 0) / menuItems.length).toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar produtos..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category} ({getCategoryCount(category)})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    <Image className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {item.name}
                        {item.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-primary">
                      R$ {item.price.toFixed(2)}
                    </div>
                    <Badge 
                      variant={item.available ? "default" : "secondary"}
                      className={item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {item.available ? "Disponível" : "Indisponível"}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditClick(item)}
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Tente ajustar os filtros ou adicione novos produtos ao seu cardápio.
                </p>
                <Button variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Produto
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Item do Cardápio</DialogTitle>
            <DialogDescription>
              Faça as alterações necessárias no item do cardápio
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                value={editFormData.name || ""}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={editFormData.description || ""}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={editFormData.price || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={editFormData.category || ""}
                  onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pizzas">Pizzas</SelectItem>
                    <SelectItem value="Hambúrguers">Hambúrguers</SelectItem>
                    <SelectItem value="Saladas">Saladas</SelectItem>
                    <SelectItem value="Massas">Massas</SelectItem>
                    <SelectItem value="Bebidas">Bebidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="available">Disponível para venda</Label>
                <p className="text-sm text-muted-foreground">
                  O produto estará visível no cardápio
                </p>
              </div>
              <Switch
                id="available"
                checked={editFormData.available || false}
                onCheckedChange={(checked) => setEditFormData({ ...editFormData, available: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="popular">Marcar como popular</Label>
                <p className="text-sm text-muted-foreground">
                  Destaque este item no cardápio
                </p>
              </div>
              <Switch
                id="popular"
                checked={editFormData.popular || false}
                onCheckedChange={(checked) => setEditFormData({ ...editFormData, popular: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;