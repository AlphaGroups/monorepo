const TrustedBySection = () => {
  const clients = [
    "L&T", "Save the Children", "AIF", "IAHV", "ChildFund", "WWF", "UNICEF", "Teach for India"
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-lg">
            Trusted by leading organizations across India
          </p>
        </div>
        
        <div className="overflow-hidden relative">
          <div className="flex marquee">
            {[...clients, ...clients].map((client, index) => (
              <div 
                key={index}
                className="text-2xl font-semibold text-primary tracking-wide whitespace-nowrap px-8 flex-shrink-0"
              >
                {client}
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee {
            animation: marquee 20s linear infinite;
            width: max-content;
          }
        `}</style>
      </div>
    </section>
  );
};

export default TrustedBySection;

