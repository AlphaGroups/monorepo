import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Search, Plus, Play, BookOpen, Star, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const videoFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  youtubeUrl: z.string().url('Please enter a valid YouTube URL'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
});

type VideoFormData = z.infer<typeof videoFormSchema>;

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  uploadDate: string;
  featured: boolean;
}

// Educational videos with real YouTube content
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Calculus - Derivatives Explained',
    description: 'Learn the fundamentals of derivatives in calculus with step-by-step examples and clear explanations.',
    youtubeId: 'WUvTyaaNkzM',
    thumbnail: 'https://img.youtube.com/vi/WUvTyaaNkzM/maxresdefault.jpg',
    duration: '45:30',
    views: '125,431',
    likes: '8,104',
    category: 'Mathematics',
    tags: ['calculus', 'derivatives', 'math basics'],
    difficulty: 'beginner',
    uploadDate: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'Quantum Physics: Understanding the Basics',
    description: 'A comprehensive introduction to quantum physics concepts, quantum mechanics, and their real-world applications.',
    youtubeId: 'JhHMJCUmq28', 
    thumbnail: 'https://img.youtube.com/vi/JhHMJCUmq28/maxresdefault.jpg',
    duration: '38:15',
    views: '89,832',
    likes: '5,267',
    category: 'Physics',
    tags: ['quantum physics', 'mechanics', 'science'],
    difficulty: 'intermediate',
    uploadDate: '2024-01-20',
    featured: false
  },
  {
    id: '3',
    title: 'Organic Chemistry: Reaction Mechanisms',
    description: 'Master organic chemistry reaction mechanisms with detailed explanations and molecular structure analysis.',
    youtubeId: 'GOKm7DjqMYI',
    thumbnail: 'https://img.youtube.com/vi/GOKm7DjqMYI/maxresdefault.jpg',
    duration: '52:18',
    views: '67,156',
    likes: '4,891',
    category: 'Chemistry',
    tags: ['organic chemistry', 'reactions', 'mechanisms'],
    difficulty: 'intermediate',
    uploadDate: '2024-02-01',
    featured: true
  }
];

const categories = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature'];
const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];

const VideoLibrary = () => {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: '',
      description: '',
      youtubeUrl: '',
      category: '',
      tags: '',
      difficulty: 'beginner',
    },
  });

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || video.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const onSubmit = async (data: VideoFormData) => {
    try {
      const youtubeId = extractYouTubeId(data.youtubeUrl);
      if (!youtubeId) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid YouTube URL.",
          variant: "destructive",
        });
        return;
      }

      // API call to create video
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          youtubeId,
          tags: data.tags?.split(',').map(tag => tag.trim()) || []
        })
      });

      if (response.ok) {
        const newVideo: Video = {
          id: Math.random().toString(36).substr(2, 9),
          title: data.title,
          description: data.description,
          youtubeId,
          thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
          duration: '0:00',
          views: '0',
          likes: '0',
          category: data.category,
          tags: data.tags?.split(',').map(tag => tag.trim()) || [],
          difficulty: data.difficulty,
          uploadDate: new Date().toISOString().split('T')[0],
          featured: false
        };

        setVideos(prev => [newVideo, ...prev]);
        toast({
          title: "Video Added",
          description: "Video has been successfully added to the library.",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to add video. Please try again.",
        variant: "destructive",
      });
    }

    form.reset();
    setIsDialogOpen(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-accent text-accent-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Video Library</h1>
          <p className="text-muted-foreground">Manage and organize educational video content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => form.reset()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Video</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter video title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="youtubeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the video content..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.filter(cat => cat !== 'All').map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {difficulties.filter(diff => diff !== 'All').map((difficulty) => (
                              <SelectItem key={difficulty} value={difficulty}>
                                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma-separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="math, algebra, equations" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Video</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Videos</p>
                <p className="text-2xl font-bold">{videos.length}</p>
              </div>
              <Play className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
              <BookOpen className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Featured</p>
                <p className="text-2xl font-bold">{videos.filter(v => v.featured).length}</p>
              </div>
              <Star className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">562K</p>
              </div>
              <Eye className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty === 'All' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="space-y-3">
            <YouTubeEmbed
              videoId={video.youtubeId}
              title={video.title}
              duration={video.duration}
              views={video.views}
              likes={video.likes}
              description={video.description}
              className="w-full"
            />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{video.category}</Badge>
                <Badge className={getDifficultyColor(video.difficulty)}>
                  {video.difficulty}
                </Badge>
              </div>
              
              {video.featured && (
                <Badge variant="default" className="bg-gradient-primary">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              
              <div className="flex flex-wrap gap-1">
                {video.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-8">
          <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No videos found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;