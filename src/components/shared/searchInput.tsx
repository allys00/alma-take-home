import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

export function SearchInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>): React.ReactElement {
  return (
    <div className="relative flex w-full">
      <SearchIcon className="absolute left-2 top-[10px] h-4 w-4 text-gray-400" />
      <Input className={cn('w-full !px-8', className)} {...props} />
    </div>
  );
}
