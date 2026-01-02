import { 
    DndContext, 
    closestCenter, 
    PointerSensor, 
    TouchSensor, 
    useSensor, 
    useSensors,
    DragEndEvent,
    DragOverlay,
    defaultDropAnimationSideEffects
  } from '@dnd-kit/core';
  import { 
    arrayMove, 
    SortableContext, 
    verticalListSortingStrategy 
  } from '@dnd-kit/sortable';
  import { SortableBattingItem } from './SortableBattingItem';
  
  interface Props {
    battingOrder: string[];
    setBattingOrder: (newOrder: string[]) => void;
  }
  
  export default function InteractiveBattingOrder({ battingOrder, setBattingOrder }: Props) {
    // Setup Sensors: Pointer for mouse, Touch for mobile (with delay to allow scrolling)
    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
      useSensor(TouchSensor, { 
        activationConstraint: { delay: 250, tolerance: 5 } 
      })
    );
  
    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = battingOrder.indexOf(active.id as string);
        const newIndex = battingOrder.indexOf(over.id as string);
        setBattingOrder(arrayMove(battingOrder, oldIndex, newIndex));
      }
    };
  
    if (battingOrder.length === 0) return null;
  
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Batting Order</h2>
          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
            Drag handles to reorder
          </span>
        </div>
        
        <div className="bg-gray-50 p-4 md:p-6 rounded-xl border-2 border-gray-200">
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={battingOrder} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {battingOrder.map((player, index) => (
                  <SortableBattingItem 
                    key={player} 
                    id={player} 
                    index={index} 
                    playerName={player} 
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    );
  }