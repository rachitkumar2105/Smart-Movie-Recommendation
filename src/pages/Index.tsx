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
              <span className="gradient-text">Smart Movie</span>
              <br />
              Recommendations
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry-grade ML pipeline combining collaborative filtering, content-based signals,
              and learning-to-rank models for personalized recommendations.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="hero"
                size="xl"
                onClick={() => document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="h-5 w-5" />
                Get Recommendations
              </Button>
              <Button
                variant="glass"
                size="xl"
                onClick={() => navigate('/models')}
              >
                View ML Models
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PerformanceCard
              label="Recommended Items"
              value="6,479"
              icon={<Box className="h-5 w-5" />}
              variant="default"
            />
            <PerformanceCard
              label="Personalized"
              value="67.43%"
              subtext="4,369 items"
              icon={<Users className="h-5 w-5" />}
              variant="primary"
            />
            <PerformanceCard
              label="Non-personalized"
              value="32.57%"
              subtext="2,110 items"
              icon={<TrendingUp className="h-5 w-5" />}
              variant="secondary"
            />
            <PerformanceCard
              label="Catalog Usage"
              value="9.97%"
              subtext="177 from 1,775"
              icon={<Sparkles className="h-5 w-5" />}
              variant="success"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="recommendations" className="container mx-auto px-4 py-12 space-y-12">
        {/* User Selector */}
        <UserSelector
          users={mockUsers}
          selectedUserId={selectedUserId}
          onSelect={setSelectedUserId}
        />

        {/* Recommended For You */}
        {(selectedUserId || location.state?.coldStartRecommendations) && (
          <RecommendationSection
            title={location.state?.coldStartRecommendations ? "Matches for Your Preferences" : "Recommended For You"}
            subtitle={location.state?.coldStartRecommendations ? "Demographics + Interest Match" : "SVD + embeddings + ranking model"}
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
          subtitle="Popularity + recency (no ML)"
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
            subtitle="Content similarity + collaborative score"
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
          <p>Intelligent Recommendation Engine • Industry-Grade ML Pipeline</p>
          <p className="mt-1">Using SVD, TF-IDF, Embeddings, and Learning-to-Rank models</p>
        </div>
      </footer>
    </div>
  );
}
