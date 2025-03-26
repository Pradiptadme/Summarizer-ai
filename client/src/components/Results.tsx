import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SummaryResponse } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Copy, Download, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultsProps {
  isLoading: boolean;
  result: SummaryResponse | null;
  error: string | null;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ isLoading, result, error, onReset }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    if (!result) return;
    
    const textToCopy = `Summary:\n${result.summary}\n\nKey Points:\n${result.keyPoints.map(point => `- ${point}`).join('\n')}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The summary has been copied to your clipboard.",
      });
    }).catch(err => {
      toast({
        title: "Failed to copy",
        description: "There was an error copying to clipboard.",
        variant: "destructive"
      });
    });
  };

  // Format the date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="resultsSection" className="mt-8">
      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16 mb-4" style={{ borderTopColor: 'hsl(var(--primary))' }}></div>
          <h2 className="text-center text-xl font-semibold">Processing your request...</h2>
          <p className="text-center text-gray-600 mt-2">This may take a few moments</p>
        </div>
      )}
      
      {/* Error State */}
      {!isLoading && error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={onReset}
                className="text-sm font-medium"
              >
                Try again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Results Display */}
      {!isLoading && !error && result && (
        <Card className="bg-white rounded-lg shadow-md overflow-hidden">
          <CardHeader className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-dark">Summary Results</h3>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy summary">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Download as PDF">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Share">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-6 py-4">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Source</h4>
              <p className="text-gray-800">
                {result.source.startsWith('http') ? (
                  <a href={result.source} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {result.source}
                  </a>
                ) : (
                  result.source
                )}
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Summary</h4>
              <div className="text-gray-800 leading-relaxed">
                {result.summary.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Key Points</h4>
              <ul className="list-disc ml-5 text-gray-800">
                {result.keyPoints.map((point, index) => (
                  <li key={index} className="mb-1">{point}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-500">
                Generated on {formatDate(result.generatedAt)}
              </span>
            </div>
            <Button 
              variant="outline"
              onClick={onReset}
            >
              New Summary
            </Button>
          </CardFooter>
        </Card>
      )}
    </section>
  );
};

export default Results;
