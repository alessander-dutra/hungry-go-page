import { Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu as MenuIcon } from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import Overview from "./dashboard/Overview";
import MenuPage from "./dashboard/Menu";
import Orders from "./dashboard/Orders";
import Settings from "./dashboard/Settings";
import Analytics from "./dashboard/Analytics";
import WhatsApp from "./dashboard/WhatsApp";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 lg:h-16 border-b border-border bg-white/95 backdrop-blur-md flex items-center px-3 lg:px-6 sticky top-0 z-30">
            {/* Mobile sidebar trigger */}
            <SidebarTrigger className="mr-3 lg:hidden">
              <MenuIcon className="h-5 w-5" />
            </SidebarTrigger>
            
            <div className="flex items-center justify-between flex-1 min-w-0">
              <div className="min-w-0">
                <h1 className="text-lg lg:text-xl font-semibold truncate">Dashboard</h1>
                <p className="text-xs lg:text-sm text-muted-foreground hidden sm:block">Gerencie seu restaurante</p>
              </div>
              
              <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium">Restaurante Demo</div>
                  <div className="text-xs text-muted-foreground">Online • Recebendo pedidos</div>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full gradient-hero flex items-center justify-center">
                  <span className="text-white font-bold text-sm lg:text-base">R</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-3 lg:p-6 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/whatsapp" element={<WhatsApp />} />
              <Route path="/customers" element={<Analytics />} />
              <Route path="/sales" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
