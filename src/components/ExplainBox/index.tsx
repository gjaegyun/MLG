import { TwincleIcon } from "@/assets/svg"
import { cn } from "@/lib/utils"

interface ExplainBoxType {
  name: string;
  age: number;
  messages: string;
}

const ExplainBox = ({name, age, messages} : ExplainBoxType) => {
  return (
    <div className={cn('w-[24.25rem]',  'h-[19.125rem]', 'flex', 'rounded-xl', 'bg-white', '[box-shadow:0px_4px_40px_0px_rgba(175,198,209,0.20)]')}>
      <div className={cn('p-[2rem]', 'w-full', 'flex-col', 'h-full', 'flex', 'justify-between', 'items-start')}>
        <div className={cn('w-[4rem]', 'h-[4rem]', 'bg-[#7ACDF4]', 'flex', 'justify-center', 'items-center', 'rounded-xl')}>
          <TwincleIcon/>
        </div>
        <div className={cn('text-xl', 'font-bold')}>{name}의 {age}살 생활은?</div>
        <div className={cn('text-md', 'font-bold')}>{messages}</div>
      </div>
    </div>
  )
}

export default ExplainBox