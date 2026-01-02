import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { User as UserType } from '@/types/recommendation';

interface UserSelectorProps {
  users: UserType[];
  selectedUserId: string | null;
  onSelect: (userId: string) => void;
}

export function UserSelector({ users, selectedUserId, onSelect }: UserSelectorProps) {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Select User Profile</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelect(user.id)}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl border transition-all duration-200',
              selectedUserId === user.id
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
            />
            <div className="text-left">
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.occupation}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
