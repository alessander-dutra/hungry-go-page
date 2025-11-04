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
  Image as ImageIcon,
  Upload,
  DollarSign,
  Eye,
  EyeOff,
  X
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
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // Mock menu data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
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
  ]);

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
    setImageUrl(item.image || "");
    setImagePreview(item.image || "");
    setImageFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageUrl(""); // Limpa URL se arquivo foi selecionado
    }
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    if (url) {
      setImagePreview(url);
      setImageFile(null); // Limpa arquivo se URL foi inserida
    }
  };

  const clearImage = () => {
    setImageUrl("");
    setImageFile(null);
    setImagePreview("");
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    // Se imageFile existe, fazer upload do arquivo; se URL existe, usar a URL; caso contrário manter a atual
    const finalImage = imageFile ? imagePreview : (imageUrl || editingItem.image);

    // Mescla dados existentes do item com o formulário e a imagem final, preservando o id
    const updatedData: MenuItem = {
      ...editingItem,
      ...editFormData,
      image: finalImage || editingItem.image,
    };

    // Atualiza o array de items
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.id === editingItem.id ? updatedData : item))
    );

    console.log("Dados salvos:", updatedData);

    toast.success("Item atualizado com sucesso!");
    setEditingItem(null);
    setEditFormData({});
    clearImage();
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setEditFormData({});
    clearImage();
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
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`Imagem do produto ${item.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
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
                      aria-label={item.available ? "Produto disponível" : "Produto indisponível"}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {/* Imagem do Produto */}
            <div className="grid gap-2">
              <Label>Imagem do Produto</Label>
              
              {imagePreview && (
                <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="imageUrl" className="text-sm">URL da Imagem</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={imageUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 border-t" />
                  <span className="text-xs text-muted-foreground">OU</span>
                  <div className="flex-1 border-t" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="imageFile" className="text-sm">Upload de Arquivo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" asChild>
                      <label htmlFor="imageFile" className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                      </label>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
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

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleCloseDialog} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="w-full sm:w-auto">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;