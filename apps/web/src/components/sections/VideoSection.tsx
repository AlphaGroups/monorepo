const VideoSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Behind the Scenes at Alpha Groups
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how we design, build, and deploy STEM Labs that transform educational experiences
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-strong">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/5EMRpoMEvtc?rel=0&si=C8sCa8qGFVoC1crx"
              title="Alpha Groups - Behind the Scenes"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;