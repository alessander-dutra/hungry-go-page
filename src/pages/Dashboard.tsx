import { Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import Overview from "./dashboard/Overview";
import Menu from "./dashboard/Menu";
import Orders from "./dashboard/Orders";
import Settings from "./dashboard/Settings";
import Analytics from "./dashboard/Analytics";
import WhatsApp from "./dashboard/WhatsApp";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-white/95 backdrop-blur-md flex items-center px-4 lg:px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between flex-1">
              <div>
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Gerencie seu restaurante</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium">Restaurante Demo</div>
                  <div className="text-xs text-muted-foreground">Online • Recebendo pedidos</div>
                </div>
                <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/menu" element={<Menu />} />
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