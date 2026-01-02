import { Recommendation } from '@/types/recommendation';
import { cn } from '@/lib/utils';

interface FeatureBreakdownProps {
  recommendation: Recommendation;
  className?: string;
}

const featureLabels: Record<string, { label: string; description: string }> = {
  svdScore: { label: 'SVD Score', description: 'Collaborative filtering prediction' },
  contentSimilarity: { label: 'Content Match', description: 'Genre/description similarity' },
  userItemSimilarity: { label: 'Embedding Sim', description: 'User-item embedding distance' },
  popularity: { label: 'Popularity', description: 'Overall item popularity' },
  recency: { label: 'Recency', description: 'Release date freshness' },
  demographicMatch: { label: 'Demo Match', description: 'Demographic compatibility' },
};

export function FeatureBreakdown({ recommendation, className }: FeatureBreakdownProps) {
  const features = recommendation.features;

  return (
    <div className={cn('glass-card p-4 space-y-3', className)}>
      <h4 className="font-semibold text-sm text-primary flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Ranking Features
      </h4>
      
      <div className="space-y-2">
        {Object.entries(features).map(([key, value]) => {
          if (value === undefined) return null;
          const { label, description } = featureLabels[key] || { label: key, description: '' };
          const percentage = value * 100;
          
          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground" title={description}>{label}</span>
                <span className="font-mono text-foreground">{percentage.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    percentage >= 80 ? 'bg-score-high' : percentage >= 60 ? 'bg-primary' : 'bg-score-medium'
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
