"use client";
import React from 'react';
import { Card } from '@/components/ui/card';

interface LoadingSkeletonProps {
  type?: 'video' | 'list' | 'card';
}

const LoadingSkeleton = ({ type = 'card' }: LoadingSkeletonProps) => {
  if (type === 'video') {
    return (
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-muted animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-muted-foreground/20 rounded-full p-3">
              <div className="h-6 w-6 bg-muted-foreground/30 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="h-5 bg-muted-foreground/20 rounded w-3/4 animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-muted-foreground/20 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-16 animate-pulse"></div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="h-5 w-12 bg-muted-foreground/20 rounded text-xs animate-pulse"></div>
            <div className="h-5 w-16 bg-muted-foreground/20 rounded text-xs animate-pulse"></div>
          </div>
        </div>
      </Card>
    );
  }
  
  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 animate-pulse">
            <div className="h-12 w-12 bg-muted-foreground/20 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
              <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card className="p-4 animate-pulse">
      <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-muted-foreground/20 rounded w-full mb-2"></div>
      <div className="h-4 bg-muted-foreground/20 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-muted-foreground/20 rounded w-4/6"></div>
    </Card>
  );
};

export default LoadingSkeleton;