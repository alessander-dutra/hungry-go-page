import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Repeat, Wallet } from "lucide-react";

const customers = [
  { name: "Mariana Souza", phone: "(11) 98765-4321", orders: 24, spent: 1840.5, last: "Hoje" },
  { name: "Carlos Mendes", phone: "(11) 97654-3210", orders: 15, spent: 1120.0, last: "Ontem" },
  { name: "Fernanda Lima", phone: "(21) 99876-5432", orders: 9, spent: 640.9, last: "3 dias atrás" },
  { name: "João Pereira", phone: "(31) 98123-4567", orders: 31, spent: 2450.3, last: "Hoje" },
  { name: "Ana Rodrigues", phone: "(11) 96543-2109", orders: 2, spent: 98.0, last: "2 semanas atrás" },
  { name: "Ricardo Alves", phone: "(41) 99234-5678", orders: 6, spent: 410.7, last: "1 semana atrás" },
];

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Customers = () => {
  const [q, setQ] = useState("");
  const list = useMemo(
    () => customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q)),
    [q],
  );
  const total = customers.reduce((s, c) => s + c.spent, 0);
  const recurring = customers.filter((c) => c.orders >= 5).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Clientes</h1>
        <p className="text-muted-foreground">Acompanhe quem compra no seu restaurante</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total de clientes", value: customers.length, icon: Users },
          { label: "Clientes recorrentes", value: recurring, icon: Repeat },
          { label: "Total gasto", value: brl(total), icon: Wallet },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon className="h-8 w-8 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <div className="text-xl font-bold">{s.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <CardTitle>Lista de clientes</CardTitle>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8" placeholder="Buscar nome ou telefone" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {list.map((c) => (
            <div key={c.phone} className="py-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.phone}</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Badge variant={c.orders >= 5 ? "default" : "secondary"}>{c.orders} pedidos</Badge>
                <span className="font-semibold">{brl(c.spent)}</span>
                <span className="text-muted-foreground">{c.last}</span>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="py-6 text-center text-muted-foreground">Nenhum cliente encontrado</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
