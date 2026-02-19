import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KanbanColumnProps {
  id: string;
  title: string;
  count: number;
  color: string;
  children: React.ReactNode;
  itemIds: string[];
}

const KanbanColumn = ({ id, title, count, color, children, itemIds }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Card className={`flex flex-col h-full ${isOver ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-2 px-3 sm:px-6 sm:pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className={`${color} text-xs`}>
            {count}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto px-3 sm:px-6">
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className="space-y-2 sm:space-y-3 min-h-[120px] sm:min-h-[200px]">
            {children}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
