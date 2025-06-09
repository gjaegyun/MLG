'use client';

import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';


interface FormItemProps extends PropsWithChildren {
  text: string;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const CustomFormItem = ({ children, text, className, required, fullWidth }: FormItemProps) => {
  return (
    <div className={cn(className, 'flex', 'flex-col', fullWidth ? 'w-full' : 'w-[23.75rem]')}>
      <span className={cn('text-gray-900', 'text-sm', 'font-medium')}>
        {text} {required && <span className="text-red-600">*</span>}
      </span>
      {children}
    </div>
  );
};

export default CustomFormItem;
