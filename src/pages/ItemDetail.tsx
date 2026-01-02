import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Play, TrendingUp, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ItemCard } from '@/components/recommendation/ItemCard';
import { FeatureBreakdown } from '@/components/recommendation/FeatureBreakdown';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockItems, generateRecommendations } from '@/data/mockData';

export default function ItemDetail() {
  const { id } = useParams();
  const item = mockItems.find((i) => i.id === id) || mockItems[0];
  const recommendations = generateRecommendations('user1').slice(0, 4);
  const currentRec = recommendations.find((r) => r.item.id === item.id);

  const genreVariants: Record<string, 'action' | 'comedy' | 'drama' | 'scifi'> = {
    'Action': 'action',
    'Adventure': 'action',
    'Comedy': 'comedy',
    'Animation': 'comedy',
    'Drama': 'drama',
    'Sci-Fi': 'scifi',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-20 relative">
        {/* Background Image */}
        <div className="absolute inset-0 h-[500px]">
          <img
            src={item.imageUrl}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <div className="container mx-auto px-4 py-12 relative">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="glass-card overflow-hidden animate-scale-in">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6 animate-slide-up">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="scifi" className="text-xs">
                    {item.category}
                  </Badge>
                  <span className="text-muted-foreground">{item.year}</span>
                  <div className="flex items-center gap-1 text-score-medium">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.popularity}% popularity</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold">{item.title}</h1>

                <div className="flex flex-wrap gap-2">
                  {item.genres.map((genre) => (
                    <Badge key={genre} variant={genreVariants[genre] || 'outline'}>
                      {genre}
                    </Badge>
                  ))}
                </div>

                <p className="text-lg text-muted-foreground max-w-2xl">
                  {item.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="hero" size="lg">
                  <Play className="h-5 w-5" />
                  Watch Now
                </Button>
                <Button variant="glass" size="lg">
                  <Plus className="h-5 w-5" />
                  Add to Watchlist
                </Button>
                <Button variant="outline" size="lg">
                  <Star className="h-5 w-5" />
                  Rate Item
                </Button>
              </div>

              {/* Feature Breakdown */}
              {currentRec && (
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Why We Recommend This
                  </h3>
                  <FeatureBreakdown recommendation={currentRec} className="max-w-md" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Similar Items */}
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Similar Items</h2>
              <p className="text-sm text-muted-foreground">TF-IDF + item embeddings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations
              .filter((r) => r.item.id !== item.id)
              .slice(0, 4)
              .map((rec, index) => (
                <ItemCard
                  key={rec.item.id}
                  recommendation={{
                    ...rec,
                    source: 'content',
                  }}
                  delay={index * 100}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
