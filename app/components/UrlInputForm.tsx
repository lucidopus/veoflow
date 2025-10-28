'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

/**
 * URL input form with validation and submission
 */
export default function UrlInputForm() {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null); // null = empty, true = valid, false = invalid
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateUrl = (value: string) => {
    if (!value) {
      setIsValid(null);
      setError(null);
      return;
    }
    
    // Check if URL has a valid format
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    
    if (!urlPattern.test(value)) {
      setIsValid(false);
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    
    try {
      // Ensure URL has protocol
      const normalizedUrl = value.startsWith('http') ? value : `https://${value}`;
      new URL(normalizedUrl);
      setIsValid(true);
      setError(null);
    } catch {
      setIsValid(false);
      setError('Please enter a valid URL (e.g., https://example.com)');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    validateUrl(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (isValid !== true) {
      setError('Please enter a valid URL before submitting');
      return;
    }

    setIsLoading(true);
    
    // Normalize URL to ensure it has protocol
    let normalizedUrl = url;
    if (!url.startsWith('http')) {
      normalizedUrl = `https://${url}`;
    }

    try {
      // Simulate API call to backend
      const response = await fetch('/api/process-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      await response.json();

      // Success - clear form and show success message
      setUrl('');
      setIsValid(null);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit URL. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Transform your products
        </h2>
        <p className="text-xl text-muted-foreground font-light leading-relaxed">
          Paste a product collection URL to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 animate-slideUp">
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <Input
                id="product-url"
                type="url"
                placeholder="https://example.com/collections/womens-dresses"
                value={url}
                onChange={handleInputChange}
                className={`w-full h-16 px-8 text-lg border-2 rounded-2xl transition-all duration-500 focus:ring-4 focus:ring-primary/10 bg-background/50 backdrop-blur-sm ${
                  isValid === false ? 'border-destructive focus:border-destructive shadow-destructive/10' : ''
                } ${isValid === true ? 'border-success focus:border-success shadow-success/10' : ''} ${
                  !url ? 'border-border/60 hover:border-primary/40' : 'border-primary/30'
                } shadow-lg hover:shadow-xl focus:shadow-2xl`}
              />
              {isValid === false && error && (
                <div className="flex items-center mt-4 text-destructive text-sm animate-fadeIn bg-destructive/5 px-4 py-2 rounded-xl border border-destructive/20">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Button
              type="submit"
              disabled={isLoading || isValid !== true}
              className="relative w-full h-16 text-lg font-medium rounded-2xl hover-lift bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Processing your collection...
                </>
              ) : (
                <>
                  Generate Videos
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="text-center animate-fadeIn animation-delay-100">
          <p className="text-sm text-muted-foreground/80 font-light">
            Compatible with Shopify, WooCommerce, and major e-commerce platforms
          </p>
        </div>

        {success && (
          <div className="mt-8 p-6 bg-gradient-to-r from-success/10 via-success/5 to-success/10 border border-success/30 rounded-2xl animate-scaleIn shadow-lg backdrop-blur-sm">
            <div className="flex items-center text-success">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold text-lg">Collection submitted successfully!</span>
                <p className="text-sm text-success/80 mt-1">
                  You&apos;ll be redirected to track progress shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        {error && !success && (
          <div className="mt-8 p-6 bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 border border-destructive/30 rounded-2xl animate-scaleIn shadow-lg backdrop-blur-sm">
            <div className="flex items-center text-destructive">
              <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center mr-4">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold text-lg">Error</span>
                <p className="text-sm text-destructive/80 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}