import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Éthera</h3>
            <p className="text-sm text-muted-foreground">
              Handcrafted candles for mindful living
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/shop" className="hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-primary transition-colors">
                  Candles
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-primary transition-colors">
                  DIY Kits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Éthera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
