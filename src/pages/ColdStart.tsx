import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Sparkles, ChevronRight, Check, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other / Prefer not to say' },
];

const occupations = [
  'Student',
  'Engineer',
  'Designer',
  'Marketing',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Entertainment',
  'Other',
];

const interests = [
  { id: 'action', label: 'Action & Adventure', icon: '🎬' },
  { id: 'comedy', label: 'Comedy', icon: '😂' },
  { id: 'drama', label: 'Drama', icon: '🎭' },
  { id: 'scifi', label: 'Sci-Fi & Fantasy', icon: '🚀' },
  { id: 'romance', label: 'Romance', icon: '❤️' },
  { id: 'thriller', label: 'Thriller & Horror', icon: '😱' },
  { id: 'documentary', label: 'Documentary', icon: '📚' },
  { id: 'animation', label: 'Animation', icon: '🎨' },
];

export default function ColdStart() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<string | null>(null);
  const [occupation, setOccupation] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return gender !== null;
      case 2:
        return occupation !== null;
      case 3:
        return selectedInterests.length >= 2;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit to backend
      if (!gender || !occupation) return;

      setLoading(true);
      try {
        const recommendations = await api.submitColdStart({
          gender,
          occupation,
          interests: selectedInterests
        });

        // Navigate with results
        navigate('/', { state: { coldStartRecommendations: recommendations } });
        toast.success("Preferences saved! Generated personalized recommendations.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to connect to recommendation engine. Please ensure backend is running.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Progress */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {step} of 3</span>
              <span>{Math.round((step / 3) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Gender */}
          {step === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                  <User className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold">Welcome! Let's personalize your experience</h1>
                <p className="text-muted-foreground">
                  Select your gender to help us provide better recommendations
                </p>
              </div>

              <div className="grid gap-3">
                {genders.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGender(g.value)}
                    className={cn(
                      'glass-card p-4 text-left transition-all duration-200 flex items-center justify-between',
                      gender === g.value
                        ? 'border-primary bg-primary/10 glow-primary'
                        : 'hover:border-primary/50'
                    )}
                  >
                    <span className="font-medium">{g.label}</span>
                    {gender === g.value && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Occupation */}
          {step === 2 && (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 text-secondary mb-4">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold">What's your occupation?</h1>
                <p className="text-muted-foreground">
                  This helps us understand your viewing preferences
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {occupations.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setOccupation(occ)}
                    className={cn(
                      'glass-card p-4 text-center transition-all duration-200',
                      occupation === occ
                        ? 'border-secondary bg-secondary/10 glow-secondary'
                        : 'hover:border-secondary/50'
                    )}
                  >
                    <span className="font-medium">{occ}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-score-high/10 text-score-high mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold">What genres interest you?</h1>
                <p className="text-muted-foreground">
                  Select at least 2 genres you enjoy
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      'glass-card p-4 text-left transition-all duration-200 flex items-center gap-3',
                      selectedInterests.includes(interest.id)
                        ? 'border-primary bg-primary/10'
                        : 'hover:border-primary/50'
                    )}
                  >
                    <span className="text-2xl">{interest.icon}</span>
                    <span className="font-medium">{interest.label}</span>
                    {selectedInterests.includes(interest.id) && (
                      <Check className="h-5 w-5 text-primary ml-auto" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <Badge variant="outline" className="text-muted-foreground">
                  {selectedInterests.length} selected
                </Badge>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="ghost"
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1 || loading}
            >
              Back
            </Button>
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!canProceed() || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  {step === 3 ? 'Build My Preferences' : 'Continue'}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>


        </div>
      </main>
    </div>
  );
}
