import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SummarizerForm from '@/components/SummarizerForm';
import Results from '@/components/Results';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import { SummaryRequest, SummaryResponse } from '@shared/schema';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Home: React.FC = () => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [summaryResult, setSummaryResult] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSummarySubmit = async (data: SummaryRequest) => {
    setIsLoading(true);
    setShowResults(true);
    setError(null);
    
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to generate summary');
      }
      
      setSummaryResult(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'An unknown error occurred',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetResults = () => {
    setShowResults(false);
    setSummaryResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Hero />
        <SummarizerForm onSubmit={handleSummarySubmit} />
        
        {showResults && (
          <Results 
            isLoading={isLoading}
            result={summaryResult}
            error={error}
            onReset={resetResults}
          />
        )}
        
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
