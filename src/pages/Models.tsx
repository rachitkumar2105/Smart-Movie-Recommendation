import { Database, Cpu, FileCode, Layers, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { modelInfo } from '@/data/mockData';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  'svd_sklearn.pkl': <Database className="h-5 w-5" />,
  'tfidf_vectorizer.pkl': <FileCode className="h-5 w-5" />,
  'item_embeddings.pkl': <Layers className="h-5 w-5" />,
  'user_embeddings.pkl': <Layers className="h-5 w-5" />,
  'gender_encoder.pkl': <Cpu className="h-5 w-5" />,
  'occupation_encoder.pkl': <Cpu className="h-5 w-5" />,
  'ranking_model.pkl': <Cpu className="h-5 w-5" />,
  'items_metadata.csv': <Database className="h-5 w-5" />,
};

const colorMap: Record<string, string> = {
  'svd_sklearn.pkl': 'text-primary border-primary/30 bg-primary/10',
  'tfidf_vectorizer.pkl': 'text-secondary border-secondary/30 bg-secondary/10',
  'item_embeddings.pkl': 'text-score-high border-score-high/30 bg-score-high/10',
  'user_embeddings.pkl': 'text-score-high border-score-high/30 bg-score-high/10',
  'gender_encoder.pkl': 'text-score-medium border-score-medium/30 bg-score-medium/10',
  'occupation_encoder.pkl': 'text-score-medium border-score-medium/30 bg-score-medium/10',
  'ranking_model.pkl': 'text-primary border-primary/30 bg-primary/10',
  'items_metadata.csv': 'text-muted-foreground border-border bg-muted/50',
};

export default function Models() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12 space-y-12">
        {/* Header */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Technology</span> Overview
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            We use advanced AI to understand your taste and find the perfect movie for you.
            Here's a look at how our recommendation engine works.
          </p>
        </div>

        {/* Pipeline Visualization */}
        <div className="glass-card p-6 space-y-4 animate-slide-up">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            How Everything Works Together
          </h2>

          <div className="overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max py-4">
              {/* Step 1 */}
              <div className="glass-card p-4 text-center min-w-[140px]">
                <p className="text-xs text-muted-foreground mb-1">User Request</p>
                <p className="font-mono text-sm text-primary">user_id</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              {/* Step 2 */}
              <div className="glass-card p-4 text-center min-w-[140px]">
                <p className="text-xs text-muted-foreground mb-1">SVD Model</p>
                <p className="font-mono text-sm">rating score</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              {/* Step 3 */}
              <div className="glass-card p-4 text-center min-w-[140px]">
                <p className="text-xs text-muted-foreground mb-1">Embeddings</p>
                <p className="font-mono text-sm">similarity</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              {/* Step 4 */}
              <div className="glass-card p-4 text-center min-w-[140px]">
                <p className="text-xs text-muted-foreground mb-1">TF-IDF</p>
                <p className="font-mono text-sm">content</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              {/* Step 5 */}
              <div className="glass-card p-4 text-center min-w-[140px]">
                <p className="text-xs text-muted-foreground mb-1">Encoders</p>
                <p className="font-mono text-sm">demographics</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              {/* Step 6 */}
              <div className="glass-card p-4 text-center min-w-[140px] border-primary glow-primary">
                <p className="text-xs text-primary mb-1">Ranking Model</p>
                <p className="font-mono text-sm text-primary font-bold">final score</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              {/* Step 7 */}
              <div className="glass-card p-4 text-center min-w-[140px] border-score-high bg-score-high/10">
                <p className="text-xs text-score-high mb-1">Output</p>
                <p className="font-mono text-sm text-score-high">Top-N Items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature to Model Mapping */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold text-lg">Feature-to-Model Mapping</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Feature</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Model Used</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Personalized ranking</td>
                  <td className="py-3 px-4"><code className="text-primary">svd_sklearn.pkl</code></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Similar Items</td>
                  <td className="py-3 px-4"><code className="text-score-high">item_embeddings.pkl</code></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Text understanding</td>
                  <td className="py-3 px-4"><code className="text-secondary">tfidf_vectorizer.pkl</code></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Cold-start users</td>
                  <td className="py-3 px-4"><code className="text-score-medium">encoders</code> + embeddings</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Final ordering</td>
                  <td className="py-3 px-4"><code className="text-primary">ranking_model.pkl</code></td>
                </tr>
                <tr>
                  <td className="py-3 px-4">UI metadata</td>
                  <td className="py-3 px-4"><code className="text-muted-foreground">items_metadata.csv</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Model Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {modelInfo.map((model, index) => (
            <div
              key={model.name}
              className={cn(
                'glass-card p-6 space-y-4 animate-slide-up opacity-0',
              )}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg border', colorMap[model.name])}>
                    {iconMap[model.name]}
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-semibold">{model.name}</h3>
                    <p className="text-xs text-muted-foreground">{model.type}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{model.description}</p>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Used in:</p>
                <div className="flex flex-wrap gap-2">
                  {model.usedIn.map((use) => (
                    <Badge key={use} variant="outline" className="text-xs">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border/50">
                <p className="text-xs">
                  <span className="text-muted-foreground">Output: </span>
                  <span className="font-mono text-primary">{model.output}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
