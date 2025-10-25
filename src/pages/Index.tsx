import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { ShopifyProduct } from '@/lib/shopify/types';
import { storefrontApiRequest, STOREFRONT_QUERY } from '@/lib/shopify/api';
import { Loader2, Sparkles, Heart, Leaf } from 'lucide-react';

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 4 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="relative py-32 md:py-40 bg-gradient-to-b from-secondary/40 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
              Illuminate Your<br />Sanctuary
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Handcrafted artisan candles and DIY kits for creating mindful moments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="px-8">
                  Explore Collection
                </Button>
              </Link>
              <Link to="/how-to-make">
                <Button size="lg" variant="outline" className="px-8">
                  Learn to Make
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">Natural Ingredients</h3>
                <p className="text-sm text-muted-foreground">
                  Premium soy wax and essential oils, sustainably sourced
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">Hand-Poured</h3>
                <p className="text-sm text-muted-foreground">
                  Each candle crafted with care and intention
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">Personalized</h3>
                <p className="text-sm text-muted-foreground">
                  Customize scents and packaging to your preference
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4">Featured Collection</h2>
              <p className="text-muted-foreground">
                Discover our signature scents
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 bg-secondary/20 rounded-lg">
                <p className="text-muted-foreground mb-6">
                  No products available yet. Create your first candle to get started!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            )}

            {products.length > 0 && (
              <div className="text-center mt-12">
                <Link to="/shop">
                  <Button size="lg" variant="outline">
                    View All Products
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl mb-6">Create Your Own Candle</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our DIY kits and learn the art of candle making from the comfort of your home
            </p>
            <Link to="/how-to-make">
              <Button size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
