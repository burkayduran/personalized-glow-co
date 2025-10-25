import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify/api';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          const productData = data.data.productByHandle;
          setProduct(productData);
          setSelectedVariant(productData.variants.edges[0]?.node);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart', {
      description: `${product.title} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-2">Product not found</h2>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
              {image ? (
                <img
                  src={image.url}
                  alt={image.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl mb-4">{product.title}</h1>
                <p className="text-3xl font-medium text-primary">
                  {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                </p>
              </div>

              {product.description && (
                <div className="prose prose-neutral max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="pt-6 space-y-4">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto px-12"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="font-medium text-lg">Scent Story</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each Éthera candle is crafted with intention, blending premium natural ingredients 
                  to create a sensory experience that transforms your space into a sanctuary of calm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
