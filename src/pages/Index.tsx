import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Heart, RefreshCw, Zap, Users, Box } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { UserSelector } from '@/components/recommendation/UserSelector';
import { ItemCard } from '@/components/recommendation/ItemCard';
import { RecommendationSection } from '@/components/recommendation/RecommendationSection';
import { PerformanceCard } from '@/components/stats/PerformanceCard';
import { Button } from '@/components/ui/button';
import { mockUsers, mockItems, generateRecommendations } from '@/data/mockData';
import { Recommendation, api } from '@/lib/api';

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState<string | null>('user1');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitial = async () => {
      if (location.state?.coldStartRecommendations) {
        setRecommendations(location.state.coldStartRecommendations);
      } else if (selectedUserId) {
        // Fetch real data on load instead of mock
        try {
          const data = await api.getUserRecommendations(selectedUserId);
          setRecommendations(data);
        } catch (e) {
          console.error(e);
          setRecommendations(generateRecommendations(selectedUserId)); // Fallback
        }
      }
    };
    fetchInitial();
  }, [selectedUserId, location.state]);

  const handleRefresh = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    try {
      const data = await api.getUserRecommendations(selectedUserId);
      setRecommendations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const trendingItems = mockItems.sort((a, b) => b.popularity - a.popularity).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 opacity-0 h-0 w-0 overflow-hidden m-0 p-0 border-0">
            </div>

            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">Discover Your Next</span>
              <br />
              Favorite Movie
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Personalized movie suggestions tailored to your unique taste.
              Finding something to watch has never been easier.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="hero"
                size="xl"
                onClick={() => document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="h-5 w-5" />
                Start Exploring
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Simplified */}
      <section className="py-8 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PerformanceCard
              label="Movies Available"
              value="6,000+"
              icon={<Box className="h-5 w-5" />}
              variant="default"
            />
            <PerformanceCard
              label="Personalized Matches"
              value="4,000+"
              subtext="Just for you"
              icon={<Users className="h-5 w-5" />}
              variant="primary"
            />
            <PerformanceCard
              label="Trending Items"
              value="2,000+"
              subtext="Popular right now"
              icon={<TrendingUp className="h-5 w-5" />}
              variant="secondary"
            />
            <PerformanceCard
              label="Happy Users"
              value="98%"
              subtext="Satisfaction rate"
              icon={<Heart className="h-5 w-5" />}
              variant="success"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="recommendations" className="container mx-auto px-4 py-12 space-y-12">
        {/* User Selector */}
        <div className="flex justify-between items-center">
          <UserSelector
            users={mockUsers}
            selectedUserId={selectedUserId}
            onSelect={setSelectedUserId}
          />
          {/* Hidden technical button, maybe keep it but simpler? No, let's just direct link if needed elsewhere, or keep it subtle */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => navigate('/models')}
          >
            Tech Specs
          </Button>
        </div>

        {/* Recommended For You */}
        {(selectedUserId || location.state?.coldStartRecommendations) && (
          <RecommendationSection
            title={location.state?.coldStartRecommendations ? "Matches for Your Preferences" : "Recommended For You"}
            subtitle={location.state?.coldStartRecommendations ? "Based on your choices" : "Curated selections based on your taste"}
            icon={<Sparkles className="h-5 w-5" />}
            onViewAll={() => { }}
          >
            <div className="flex gap-3 mb-4">
              <Button
                variant="glass"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh Suggestions'}
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendations.slice(0, 4).map((rec, index) => (
                <ItemCard
                  key={rec.item.id}
                  recommendation={rec}
                  delay={index * 100}
                />
              ))}
            </div>
          </RecommendationSection>
        )}

        {/* Trending Now */}
        <RecommendationSection
          title="Trending Now"
          subtitle="What everyone is watching right now"
          icon={<TrendingUp className="h-5 w-5" />}
          onViewAll={() => { }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingItems.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                showScore={false}
                delay={index * 100 + 400}
              />
            ))}
          </div>
        </RecommendationSection>

        {/* Because You Liked */}
        {selectedUserId && (
          <RecommendationSection
            title="Because You Liked 'The Matrix'"
            subtitle="Movies with similar themes and style"
            icon={<Heart className="h-5 w-5" />}
            onViewAll={() => { }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.slice(2, 6).map((rec, index) => (
                <ItemCard
                  key={rec.item.id}
                  recommendation={{
                    ...rec,
                    source: 'content',
                    score: 0.82 - index * 0.05,
                  }}
                  delay={index * 100 + 800}
                />
              ))}
            </div>
          </RecommendationSection>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Intelligent Recommendation Engine</p>
          <p className="mt-1">Powered by Advanced Machine Learning</p>
        </div>
      </footer>
    </div>
  );
}
