import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, Compass, Sparkles, User, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/explore', label: 'Explore', icon: Compass },
  { path: '/models', label: 'Technology', icon: Cpu },
  { path: '/onboard', label: 'My Preferences', icon: User },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full transition-all duration-300 group-hover:bg-primary/50" />
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                <Brain className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-base md:text-lg gradient-text leading-none">Smart Movie Recommendation</span>
              <span className="text-[10px] text-muted-foreground/80 italic leading-none">-made by Rachit Kumar Singh</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
          </div>
        </div>
      </div>
    </header>
  );
}
