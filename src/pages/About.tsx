import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl mb-6">About Éthera</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crafting sensory experiences for mindful living
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-medium">Our Philosophy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Éthera is more than candles—it's an invitation to pause, breathe, and reconnect. 
                  We believe in the power of scent to transform spaces and elevate moments, 
                  turning everyday rituals into acts of self-care.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-medium">Craftsmanship</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Every Éthera candle is hand-poured with intention, using premium natural waxes 
                  and carefully curated essential oils. Our minimalist approach extends beyond 
                  aesthetics—it's about purity, quality, and creating products that honor both 
                  you and the environment.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-medium">Materials</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We source only the finest ingredients: sustainable soy wax, cotton wicks, 
                  and therapeutic-grade essential oils. Each element is chosen not just for 
                  its sensory qualities, but for its harmony with nature and your wellbeing.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-medium">Sustainability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  From biodegradable packaging to reusable vessels, sustainability guides 
                  every decision we make. Our candles are designed to leave no trace but 
                  the memory of their warmth and the peace they brought.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
