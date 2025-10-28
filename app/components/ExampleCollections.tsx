import { Button } from '@/app/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/Card';

/**
 * Example collections component showing sample e-commerce sites
 */
export default function ExampleCollections() {
  const examples = [
    {
      id: 1,
      name: 'Fashion Forward',
      url: 'https://fashionforward.com/collections/womens',
      logo: 'F',
      description: 'Womenswear collection'
    },
    {
      id: 2,
      name: 'Style Hub',
      url: 'https://stylehub.com/products',
      logo: 'S',
      description: 'Accessories & clothing'
    },
    {
      id: 3,
      name: 'Trendy Threads',
      url: 'https://trendythreads.com/catalog',
      logo: 'T',
      description: 'Men\'s fashion'
    },
    {
      id: 4,
      name: 'Urban Outfitters',
      url: 'https://urbanoutfitters.com/collections',
      logo: 'U',
      description: 'Contemporary fashion'
    },
    {
      id: 5,
      name: 'Vintage Vibes',
      url: 'https://vintagevibes.com/shop',
      logo: 'V',
      description: 'Retro clothing'
    }
  ];

  const handleTryExample = (url: string) => {
    // In a real implementation, this would populate the URL input field
    console.log(`Selected example: ${url}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8 animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Try with Sample Collections</h2>
        <p className="text-muted-foreground">
          See how VeoFlow works with these example e-commerce sites
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <Card 
            key={example.id} 
            className={`flex flex-col h-full animate-slideUp hover-lift transition-transform duration-300 ${index === 0 ? '' : `animation-delay-${(index % 3) * 100}`}`}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground font-bold">
                  {example.logo}
                </div>
                <div>
                  <CardTitle className="text-lg">{example.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground truncate" title={example.url}>
                {example.url}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full hover-lift"
                onClick={() => handleTryExample(example.url)}
              >
                Try with this URL
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}