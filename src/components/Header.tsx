import { Link } from 'react-router-dom';
import { CartDrawer } from './CartDrawer';
import { Button } from './ui/button';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-medium tracking-tight">Éthera</h1>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-sm hover:text-primary transition-colors">
            Shop
          </Link>
          <Link to="/about" className="text-sm hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/how-to-make" className="text-sm hover:text-primary transition-colors">
            How to Make
          </Link>
          <Link to="/contact" className="text-sm hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <CartDrawer />
        </div>
      </nav>
    </header>
  );
};
