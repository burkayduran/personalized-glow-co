import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ShopifyProduct } from '@/lib/shopify/types';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart', {
      description: `${node.title} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${node.handle}`}>
      <Card className="group overflow-hidden border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-secondary/20">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
        <CardContent className="p-6 space-y-3">
          <h3 className="font-medium text-lg line-clamp-1">{node.title}</h3>
          {node.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {node.description}
            </p>
          )}
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-medium">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="group-hover:bg-primary group-hover:text-primary-foreground"
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
