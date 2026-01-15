import { Link } from 'react-router-dom';
import { Star, TrendingUp, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Recommendation, Item } from '@/types/recommendation';
import { cn } from '@/lib/utils';

interface ItemCardProps {
  recommendation?: Recommendation;
  item?: Item;
  showScore?: boolean;
  className?: string;
  delay?: number;
}

const genreToVariant: Record<string, 'action' | 'comedy' | 'drama' | 'romance' | 'thriller' | 'scifi'> = {
  'Action': 'action',
  'Adventure': 'action',
  'Comedy': 'comedy',
  'Animation': 'comedy',
  'Drama': 'drama',
  'Crime': 'drama',
  'Romance': 'romance',
  'Family': 'romance',
  'Thriller': 'thriller',
  'Sci-Fi': 'scifi',
};

const sourceLabels: Record<string, string> = {
  hybrid: 'Top Pick',
  svd: 'Community Favorite',
  content: 'Similar Style',
  trending: 'Trending',
};

export function ItemCard({ recommendation, item: directItem, showScore = true, className, delay = 0 }: ItemCardProps) {
  const item = recommendation?.item || directItem;
  if (!item) return null;

  const score = recommendation?.score;
  const source = recommendation?.source;

  return (
    <div
      className={cn(
        'group glass-card glass-card-hover overflow-hidden animate-slide-up opacity-0',
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

        {/* Score Badge */}
        {showScore && score !== undefined && (
          <div className="absolute top-3 right-3">
            <div className={cn(
              'flex items-center gap-1.5 px-2 py-1 rounded-lg backdrop-blur-md border',
              score >= 0.8
                ? 'bg-score-high/20 border-score-high/30 text-score-high'
                : score >= 0.6
                  ? 'bg-score-medium/20 border-score-medium/30 text-score-medium'
                  : 'bg-score-low/20 border-score-low/30 text-score-low'
            )}>
              <Sparkles className="h-3 w-3" />
              <span className="font-mono text-xs font-semibold">{(score * 100).toFixed(0)}%</span>
            </div>
          </div>
        )}

        {/* Source Badge */}
        {source && (
          <div className="absolute top-3 left-3">
            <Badge variant={source as any} className="text-[10px]">
              {sourceLabels[source]}
            </Badge>
          </div>
        )}

        {/* Popularity */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-foreground/80">
          <TrendingUp className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{item.popularity}%</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground">{item.year} • {item.category}</p>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5">
          {item.genres.slice(0, 3).map((genre) => (
            <Badge
              key={genre}
              variant={genreToVariant[genre] || 'outline'}
              className="text-[10px]"
            >
              {genre}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Link to={`/item/${item.id}`} className="flex-1">
            <Button variant="glass" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="px-3">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
