import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Eye, ThumbsUp } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  duration?: string;
  views?: string;
  likes?: string;
  description?: string;
  className?: string;
  showInfo?: boolean;
  autoplay?: boolean;
}

const YouTubeEmbed = ({ 
  videoId, 
  title, 
  duration, 
  views, 
  likes,
  description,
  className,
  showInfo = true,
  autoplay = false 
}: YouTubeEmbedProps) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`;

  return (
    <Card className={`overflow-hidden hover-lift ${className}`}>
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          title={title || 'YouTube video'}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Play overlay for thumbnail effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
          <div className="bg-primary/90 rounded-full p-3">
            <Play className="h-6 w-6 text-primary-foreground fill-current" />
          </div>
        </div>
      </div>
      
      {showInfo && (title || duration || views || likes || description) && (
        <CardContent className="p-4">
          <div className="space-y-3">
            {title && (
              <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
            )}
            
            {(duration || views || likes) && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{duration}</span>
                  </div>
                )}
                {views && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{views}</span>
                  </div>
                )}
                {likes && (
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{likes}</span>
                  </div>
                )}
              </div>
            )}
            
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {description}
              </p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default YouTubeEmbed;