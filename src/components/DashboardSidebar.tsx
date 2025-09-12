import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  ChefHat, 
  ShoppingBag, 
  Settings, 
  Home,
  MessageCircle,
  TrendingUp,
  Users,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mainItems = [
  { title: "Visão Geral", url: "/dashboard", icon: Home, exact: true },
  { title: "Pedidos", url: "/dashboard/orders", icon: ShoppingBag, badge: "3" },
  { title: "Cardápio", url: "/dashboard/menu", icon: ChefHat },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "WhatsApp", url: "/dashboard/whatsapp", icon: MessageCircle },
];

const businessItems = [
  { title: "Clientes", url: "/dashboard/customers", icon: Users },
  { title: "Vendas", url: "/dashboard/sales", icon: TrendingUp },
  { title: "Configurações", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string, exact = false) => {
    const active = isActive(path, exact);
    return active ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-border">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <div className="font-semibold text-sm">DeliveryPro</div>
                <div className="text-xs text-muted-foreground">Restaurante Demo</div>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">D</span>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls(item.url, item.exact)}
                      end={item.exact}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Negócio</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Actions */}
        <div className="mt-auto p-4 border-t border-border">
          {!collapsed ? (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground mb-2">Plano Professional</div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Comissão atual</div>
                <div className="text-2xl font-bold text-primary">7%</div>
                <div className="text-xs text-muted-foreground">vs 25% concorrentes</div>
              </div>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="w-full">
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}