import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify/api';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Personalization categories (user will revise later)
const PERSONALIZATION_OPTIONS = {
  fragrance: {
    label: "Fragrance Enhancement",
    options: ["Lavender Boost", "Citrus Twist", "Vanilla Dream", "Rose Garden", "None"]
  },
  waxType: {
    label: "Premium Wax Upgrade",
    options: ["Organic Coconut Wax", "Beeswax Blend", "Hemp Wax", "Standard Soy", "None"]
  },
  wickType: {
    label: "Artisan Wick Selection",
    options: ["Wooden Crackle", "Braided Cotton", "Hemp Core", "Natural Linen", "None"]
  }
};

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [personalizations, setPersonalizations] = useState<Record<string, string>>({
    fragrance: "None",
    waxType: "None",
    wickType: "None"
  });
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

  const calculatePersonalizationCost = () => {
    let count = 0;
    Object.entries(personalizations).forEach(([_, value]) => {
      if (value !== "None") count++;
    });
    return count * 5; // $5 per personalization option
  };

  const getTotalPrice = () => {
    const basePrice = parseFloat(selectedVariant?.price?.amount || product?.priceRange?.minVariantPrice?.amount || '0');
    return basePrice + (showPersonalization ? calculatePersonalizationCost() : 0);
  };

  const handleAddToCart = (withPersonalization: boolean = false) => {
    if (!product || !selectedVariant) return;

    const personalizationData = withPersonalization ? {
      options: Object.entries(personalizations)
        .filter(([_, value]) => value !== "None")
        .map(([category, value]) => ({
          category: PERSONALIZATION_OPTIONS[category as keyof typeof PERSONALIZATION_OPTIONS].label,
          value
        })),
      additionalPrice: calculatePersonalizationCost()
    } : undefined;

    const finalPrice = getTotalPrice();

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: {
        amount: finalPrice.toString(),
        currencyCode: selectedVariant.price.currencyCode
      },
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
      personalization: personalizationData
    };
    
    addItem(cartItem);
    const personalizationText = withPersonalization && personalizationData?.options.length 
      ? ` with ${personalizationData.options.length} personalization${personalizationData.options.length > 1 ? 's' : ''}`
      : '';
    
    toast.success('Added to cart', {
      description: `${product.title}${personalizationText} has been added to your cart.`,
    });
    
    if (showPersonalization) {
      setShowPersonalization(false);
      setPersonalizations({
        fragrance: "None",
        waxType: "None",
        wickType: "None"
      });
    }
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

              {showPersonalization && (
                <div className="border border-border rounded-lg p-6 space-y-6 bg-secondary/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-medium text-lg">Personalize Your Candle</h3>
                  </div>
                  <p className="text-sm text-muted-foreground -mt-2">
                    Each personalization option adds $5.00 to the base price
                  </p>

                  {Object.entries(PERSONALIZATION_OPTIONS).map(([key, { label, options }]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key}>{label}</Label>
                      <Select
                        value={personalizations[key]}
                        onValueChange={(value) => 
                          setPersonalizations(prev => ({ ...prev, [key]: value }))
                        }
                      >
                        <SelectTrigger id={key}>
                          <SelectValue placeholder={`Select ${label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Total Price:</span>
                      <span className="text-2xl font-semibold text-primary">
                        {price.currencyCode} {getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    {calculatePersonalizationCost() > 0 && (
                      <p className="text-sm text-muted-foreground mb-4">
                        Base: {price.currencyCode} {parseFloat(price.amount).toFixed(2)} + 
                        Personalization: {price.currencyCode} {calculatePersonalizationCost().toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-6 space-y-3">
                {!showPersonalization ? (
                  <>
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={() => handleAddToCart(false)}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowPersonalization(true)}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Personalize
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={() => handleAddToCart(true)}
                    >
                      Add Personalized to Cart
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setShowPersonalization(false);
                        setPersonalizations({
                          fragrance: "None",
                          waxType: "None",
                          wickType: "None"
                        });
                      }}
                    >
                      Cancel Personalization
                    </Button>
                  </>
                )}
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
