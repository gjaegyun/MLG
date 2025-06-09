import OtherGraphs from "@/components/OtherGraphs";
import { cn } from "@/lib/utils";

const graphNames = ["김재균", "엄지성", "김주은"];

export default function OthersPage() {
  return (
    <div className={cn('flex', 'w-full', 'h-[calc(100vh-6rem)]', 'justify-center', 'items-center', 'flex-col')}>
      <div className={cn('flex', 'w-full', 'h-full', 'justify-center', 'items-center', 'gap-[1rem]')}>
        {graphNames.map((name, id) => (
          <OtherGraphs key={id} name={name} id={id} />
        ))}
      </div>
    </div>
  )
}