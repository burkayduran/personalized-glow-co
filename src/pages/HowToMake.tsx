import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowToMake = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl mb-6">How to Make Your Candle</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create your perfect candle with our step-by-step guide
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Prepare Your Workspace</h3>
                    <p className="text-muted-foreground">
                      Set up a clean, flat surface covered with newspaper or parchment paper. 
                      Gather all your materials: wax, wick, container, fragrance oils, and thermometer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Melt the Wax</h3>
                    <p className="text-muted-foreground">
                      Using a double boiler, melt your soy wax slowly over medium heat. 
                      Monitor the temperature—it should reach about 170-180°F (77-82°C).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Add Fragrance</h3>
                    <p className="text-muted-foreground">
                      Once melted, remove from heat and let cool to 140-150°F (60-65°C). 
                      Add your chosen essential oils—typically 6-10% of the wax weight—and stir gently.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Prepare the Wick</h3>
                    <p className="text-muted-foreground">
                      Secure the wick at the bottom center of your container using a wick sticker 
                      or a dab of melted wax. Use a wick holder or pencil to keep it centered and upright.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Pour and Set</h3>
                    <p className="text-muted-foreground">
                      Slowly pour the scented wax into your container, leaving about ½ inch at the top. 
                      Allow it to cool and set for at least 24 hours before trimming the wick and lighting.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-medium mb-4">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-6">
                  Explore our DIY candle kits with everything you need
                </p>
                <Link to="/shop">
                  <Button size="lg">
                    Shop DIY Kits
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowToMake;
