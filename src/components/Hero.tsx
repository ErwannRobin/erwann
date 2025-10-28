import heroBg from "@/assets/hero-bg.jpg";
export const Hero = () => {
  return <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-10" />
        <img src={heroBg} alt="Hero background" className="w-full h-full object-cover opacity-30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">Lovable Tools
      </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">Crafting delightful experiences with Lovable</p>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse mx-0 my-0 px-0 py-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>;
};