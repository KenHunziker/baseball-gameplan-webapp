import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface Props {
  id: string;
  index: number;
  playerName: string;
}

export function SortableBattingItem({ id, index, playerName }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 bg-white border-2 rounded-lg transition-all ${
        isDragging 
          ? 'shadow-2xl border-blue-500 ring-2 ring-blue-100 scale-105 rotate-1' 
          : 'border-gray-200 shadow-sm hover:border-gray-300'
      }`}
    >
      {/* Drag Handle: Specifically for mobile/touch safety */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded text-gray-400 touch-none"
      >
        <GripVertical size={20} />
      </button>
      
      <span className="font-bold text-gray-400 w-6 text-sm">{index + 1}.</span>
      
      <div className="flex-1 font-bold text-gray-800 truncate">
        {playerName}
      </div>
    </div>
  );
}