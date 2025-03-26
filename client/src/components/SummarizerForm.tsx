import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { summaryRequestSchema, SummaryRequest } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SummarizerFormProps {
  onSubmit: (data: SummaryRequest) => void;
}

const SummarizerForm: React.FC<SummarizerFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [inputMethod, setInputMethod] = useState<'youtube' | 'text'>('youtube');
  const [videoPreview, setVideoPreview] = useState<{ id: string; title: string } | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  // Create the form with zod validation
  const formSchema = summaryRequestSchema.refine(
    (data) => {
      if (data.inputType === 'youtube') {
        return !!data.youtubeUrl;
      }
      if (data.inputType === 'text') {
        return !!data.textContent && data.textContent.length >= 50;
      }
      return false;
    },
    {
      message: "Please provide valid input based on your selected method",
      path: ['inputType'],
    }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputType: 'youtube',
      youtubeUrl: '',
      textContent: '',
      summaryLength: 'medium',
      language: 'en',
    },
  });

  const watchYoutubeUrl = form.watch('youtubeUrl');
  const watchTextContent = form.watch('textContent');

  // Handle input method change
  const handleInputMethodChange = (method: 'youtube' | 'text') => {
    setInputMethod(method);
    form.setValue('inputType', method);
    setVideoPreview(null);
  };

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Validate YouTube URL and get video info
  useEffect(() => {
    if (!watchYoutubeUrl || inputMethod !== 'youtube') return;
    
    const videoId = extractVideoId(watchYoutubeUrl);
    if (!videoId) {
      setVideoPreview(null);
      return;
    }
    
    const validateYoutubeUrl = async () => {
      setIsValidating(true);
      try {
        const response = await fetch('/api/validate-youtube', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ youtubeUrl: watchYoutubeUrl }),
        });
        
        if (response.ok) {
          setVideoPreview({
            id: videoId,
            title: `YouTube Video (ID: ${videoId})`,
          });
        } else {
          setVideoPreview(null);
        }
      } catch (error) {
        console.error('Error validating YouTube URL:', error);
        setVideoPreview(null);
      } finally {
        setIsValidating(false);
      }
    };
    
    // Debounce validation requests
    const timer = setTimeout(() => {
      validateYoutubeUrl();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [watchYoutubeUrl, inputMethod]);

  // Update character count for text input
  useEffect(() => {
    setCharacterCount(watchTextContent?.length || 0);
  }, [watchTextContent]);

  // Handle form submission
  const handleFormSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Card className="bg-white rounded-lg shadow-md mb-10">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Source Selector */}
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                type="button"
                variant={inputMethod === 'youtube' ? 'default' : 'outline'}
                onClick={() => handleInputMethodChange('youtube')}
                className="flex items-center"
              >
                <span className="material-icons mr-2">play_circle</span>
                YouTube
              </Button>
              <Button
                type="button"
                variant={inputMethod === 'text' ? 'default' : 'outline'}
                onClick={() => handleInputMethodChange('text')}
                className="flex items-center"
              >
                <span className="material-icons mr-2">text_fields</span>
                Text
              </Button>
            </div>

            {/* YouTube Input Section */}
            {inputMethod === 'youtube' && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="youtubeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube Video URL</FormLabel>
                      <div className="flex">
                        <div className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
                          <span className="material-icons text-red-500">youtube_searched_for</span>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="flex-1 min-w-0 rounded-l-none"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Video Preview */}
                {videoPreview && (
                  <div className="mt-4">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoPreview.id}`}
                        title={videoPreview.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      ></iframe>
                    </div>
                    <p className="mt-2 text-gray-700 font-medium">{videoPreview.title}</p>
                  </div>
                )}
              </div>
            )}

            {/* Text Input Section */}
            {inputMethod === 'text' && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="textContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Text to Summarize</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste or type a paragraph to summarize..."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between mt-1">
                        <FormMessage />
                        <div className="text-xs text-gray-500">{characterCount} characters</div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Options and Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="summaryLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary Length</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short">Short (1-2 sentences)</SelectItem>
                        <SelectItem value="medium">Medium (3-5 sentences)</SelectItem>
                        <SelectItem value="long">Long (6-8 sentences)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="inline-flex items-center px-6 py-3 font-medium shadow-sm"
              >
                <span className="material-icons mr-2">auto_awesome</span>
                Generate Summary
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SummarizerForm;
