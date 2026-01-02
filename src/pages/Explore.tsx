import { useState } from 'react';
import { Search, Filter, SortAsc, SortDesc, Star, Calendar, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ItemCard } from '@/components/recommendation/ItemCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockItems } from '@/data/mockData';

const categories = ['All', 'Movie', 'Series', 'Documentary'];
const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Animation'];
const years = ['All Years', '2020+', '2010-2019', '2000-2009', '1990-1999', 'Before 1990'];

type SortOption = 'popularity' | 'rating' | 'newest';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredItems = mockItems
    .filter((item) => {
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedGenres.length > 0 && !selectedGenres.some((g) => item.genres.includes(g))) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'popularity':
          comparison = b.popularity - a.popularity;
          break;
        case 'newest':
          comparison = b.year - a.year;
          break;
        case 'rating':
          comparison = b.popularity - a.popularity;
          break;
      }
      return sortAsc ? -comparison : comparison;
    });

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12 space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Explore</span> Catalog
          </h1>
          <p className="text-muted-foreground">
            Browse and filter the complete catalog with category, year, and popularity filters
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 animate-slide-up">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'glass'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Genre Tags */}
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter by Genre</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'popularity' ? 'default' : 'glass'}
                size="sm"
                onClick={() => setSortBy('popularity')}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Popularity
              </Button>
              <Button
                variant={sortBy === 'rating' ? 'default' : 'glass'}
                size="sm"
                onClick={() => setSortBy('rating')}
              >
                <Star className="h-4 w-4 mr-1" />
                Rating
              </Button>
              <Button
                variant={sortBy === 'newest' ? 'default' : 'glass'}
                size="sm"
                onClick={() => setSortBy('newest')}
              >
                <Calendar className="h-4 w-4 mr-1" />
                Newest
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortAsc(!sortAsc)}
            >
              {sortAsc ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} items
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                showScore={false}
                delay={index * 50}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items match your filters</p>
              <Button
                variant="glass"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedGenres([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
