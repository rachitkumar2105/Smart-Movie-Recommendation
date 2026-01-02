import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success';
  className?: string;
}

export function PerformanceCard({
  label,
  value,
  subtext,
  icon,
  variant = 'default',
  className,
}: PerformanceCardProps) {
  return (
    <div className={cn('glass-card p-5 space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon && (
          <div className={cn(
            'p-2 rounded-lg',
            variant === 'primary' && 'bg-primary/10 text-primary',
            variant === 'secondary' && 'bg-secondary/10 text-secondary',
            variant === 'success' && 'bg-score-high/10 text-score-high',
            variant === 'default' && 'bg-muted text-muted-foreground'
          )}>
            {icon}
          </div>
        )}
      </div>
      <div>
        <p className={cn(
          'text-3xl font-bold',
          variant === 'primary' && 'text-primary',
          variant === 'secondary' && 'text-secondary',
          variant === 'success' && 'text-score-high',
        )}>
          {value}
        </p>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        )}
      </div>
    </div>
  );
}
