import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  target: string;
  position: 'top' | 'right' | 'bottom' | 'left' | 'center';
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Welcome!',
    description: 'Welcome to SummarizerAI! This quick tutorial will guide you through the main features of the application.',
    target: 'body',
    position: 'center'
  },
  {
    title: 'Source Selection',
    description: 'Here you can choose between YouTube video or text as the source for your summary.',
    target: '.source-selector',
    position: 'bottom'
  },
  {
    title: 'YouTube Video Link',
    description: 'Enter a YouTube video URL here, and we\'ll generate a summary from its transcript.',
    target: '.youtube-input',
    position: 'bottom'
  },
  {
    title: 'Text Input',
    description: 'Paste or type your text here to generate a summary from it.',
    target: '.text-input',
    position: 'bottom'
  },
  {
    title: 'Summary Length',
    description: 'Choose the length of your summary - short, medium, or long.',
    target: '.summary-length',
    position: 'top'
  },
  {
    title: 'Get Your Summary in Minutes!',
    description: 'Click this button and your summary will be generated. You can also copy and share your summary.',
    target: '.generate-btn',
    position: 'top'
  }
];

const TutorialOverlay: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<DOMRect | null>(null);

  useEffect(() => {
    // Check if the user has seen the tutorial before
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    
    if (!hasSeenTutorial) {
      // Show tutorial for first-time users after a short delay
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showTutorial && currentStep < tutorialSteps.length) {
      const step = tutorialSteps[currentStep];
      const target = document.querySelector(step.target);
      
      if (target) {
        setTargetElement(target.getBoundingClientRect());
      } else {
        // If target not found (e.g., for center position), use window
        setTargetElement(null);
      }
    }
  }, [currentStep, showTutorial]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTutorial = () => {
    // Mark tutorial as seen in localStorage
    localStorage.setItem('hasSeenTutorial', 'true');
    setShowTutorial(false);
  };

  const skipTutorial = () => {
    // Mark tutorial as seen but allow user to revisit later
    localStorage.setItem('hasSeenTutorial', 'true');
    setShowTutorial(false);
  };

  const resetTutorial = () => {
    // For testing - remove this in production
    localStorage.removeItem('hasSeenTutorial');
    setCurrentStep(0);
    setShowTutorial(true);
  };

  if (!showTutorial) {
    return (
      <Button 
        onClick={resetTutorial} 
        size="sm"
        variant="outline"
        className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm text-indigo-600"
      >
        Show Tutorial
      </Button>
    );
  }

  const currentTutorialStep = tutorialSteps[currentStep];
  
  // Calculate tooltip position based on target element
  const getTooltipPosition = () => {
    if (!targetElement || currentTutorialStep.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    switch(currentTutorialStep.position) {
      case 'top':
        return {
          top: `${Math.max(10, targetElement.top - 150)}px`,
          left: `${targetElement.left + targetElement.width / 2}px`,
          transform: 'translateX(-50%)'
        };
      case 'bottom':
        return {
          top: `${Math.min(windowHeight - 150, targetElement.bottom + 20)}px`,
          left: `${targetElement.left + targetElement.width / 2}px`,
          transform: 'translateX(-50%)'
        };
      case 'left':
        return {
          top: `${targetElement.top + targetElement.height / 2}px`,
          left: `${Math.max(10, targetElement.left - 300)}px`,
          transform: 'translateY(-50%)'
        };
      case 'right':
        return {
          top: `${targetElement.top + targetElement.height / 2}px`,
          left: `${Math.min(windowWidth - 310, targetElement.right + 20)}px`,
          transform: 'translateY(-50%)'
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  // Create highlight overlay effect for target element
  const getHighlightStyle = () => {
    if (!targetElement || currentTutorialStep.position === 'center') {
      return { display: 'none' };
    }
    
    return {
      position: 'absolute',
      top: `${targetElement.top}px`,
      left: `${targetElement.left}px`,
      width: `${targetElement.width}px`,
      height: `${targetElement.height}px`,
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
      borderRadius: '4px',
      zIndex: 1000
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-auto"></div>
      
      {/* Highlight for current target element */}
      <div style={getHighlightStyle() as React.CSSProperties} className="highlight-element pointer-events-none" />
      
      {/* Tutorial tooltip */}
      <div 
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm pointer-events-auto absolute z-1001"
        style={getTooltipPosition() as React.CSSProperties}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-indigo-700">
            {currentTutorialStep.title}
          </h3>
          <button 
            onClick={skipTutorial}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close tutorial"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          {currentTutorialStep.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            {currentStep > 0 && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="sm"
                className="mr-2"
              >
                <ChevronLeft className="mr-1" size={16} />
                Previous
              </Button>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            {currentStep + 1} / {tutorialSteps.length}
          </div>
          
          <Button
            onClick={handleNext}
            size="sm"
            className="bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            {currentStep < tutorialSteps.length - 1 ? (
              <>
                Next
                <ChevronRight className="ml-1" size={16} />
              </>
            ) : (
              'Finish'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;