import React, { useState } from 'react';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import {
  Play,
  Search,
  Clock,
  CheckCircle,
  BookOpen,
  Star,
  Eye,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  subject: string;
  instructor: string;
  duration: string;
  difficulty: string;
  youtubeId: string;
  thumbnail: string;
  watched: boolean;
  progress: number;
  rating: number;
  views: number;
  assignedDate: string;
  dueDate: string;
  notes: string;
}

const StudentVideos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: '1',
      title: 'Introduction to Calculus',
      description: 'Learn the fundamentals of differential calculus',
      subject: 'Mathematics',
      instructor: 'Dr. Sarah Smith',
      duration: '45:32',
      difficulty: 'Beginner',
      youtubeId: 'WUvTyaaNkzM',
      thumbnail: '/api/placeholder/320/180',
      watched: true,
      progress: 100,
      rating: 4.8,
      views: 1250,
      assignedDate: '2024-01-10',
      dueDate: '2024-01-17',
      notes: 'Essential for understanding derivatives'
    },
    {
      id: '2',
      title: 'Quadratic Equations Made Simple',
      description: 'Master solving quadratic equations with various methods',
      subject: 'Mathematics',
      instructor: 'Dr. Sarah Smith',
      duration: '38:15',
      difficulty: 'Intermediate',
      youtubeId: '-8LgXHCqCQ0',
      thumbnail: '/api/placeholder/320/180',
      watched: true,
      progress: 75,
      rating: 4.6,
      views: 950,
      assignedDate: '2024-01-12',
      dueDate: '2024-01-19',
      notes: 'Practice the quadratic formula'
    },
    {
      id: '3',
      title: 'Physics: Laws of Motion',
      description: 'Understanding Newton\'s three laws of motion',
      subject: 'Physics',
      instructor: 'Prof. Michael Johnson',
      duration: '52:18',
      difficulty: 'Intermediate',
      youtubeId: 'kKKM8Y-u7ds',
      thumbnail: '/api/placeholder/320/180',
      watched: false,
      progress: 0,
      rating: 4.9,
      views: 1800,
      assignedDate: '2024-01-15',
      dueDate: '2024-01-22',
      notes: 'Foundation for mechanics'
    },
    {
      id: '4',
      title: 'Organic Chemistry Basics',
      description: 'Introduction to carbon compounds and functional groups',
      subject: 'Chemistry',
      instructor: 'Dr. Emily Brown',
      duration: '41:27',
      difficulty: 'Beginner',
      youtubeId: 'GOBhVLWA4g8',
      thumbnail: '/api/placeholder/320/180',
      watched: true,
      progress: 100,
      rating: 4.7,
      views: 1100,
      assignedDate: '2024-01-08',
      dueDate: '2024-01-15',
      notes: 'Memorize functional groups'
    },
    {
      id: '5',
      title: 'Advanced Integration Techniques',
      description: 'Master integration by parts and substitution',
      subject: 'Mathematics',
      instructor: 'Dr. Sarah Smith',
      duration: '56:43',
      difficulty: 'Advanced',
      youtubeId: 'H9eCT6f_Ftw',
      thumbnail: '/api/placeholder/320/180',
      watched: false,
      progress: 20,
      rating: 4.8,
      views: 2200,
      assignedDate: '2024-01-18',
      dueDate: '2024-01-25',
      notes: 'Build on calculus fundamentals'
    },
    {
      id: '6',
      title: 'Thermodynamics Fundamentals',
      description: 'Energy, heat, and the laws of thermodynamics',
      subject: 'Physics',
      instructor: 'Prof. Michael Johnson',
      duration: '48:35',
      difficulty: 'Intermediate',
      youtubeId: '1Bd1gdfhdL4',
      thumbnail: '/api/placeholder/320/180',
      watched: false,
      progress: 0,
      rating: 4.5,
      views: 1650,
      assignedDate: '2024-01-20',
      dueDate: '2024-01-27',
      notes: 'Key concepts for physics'
    }
  ];

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry'];
  const statuses = ['all', 'watched', 'in-progress', 'not-started'];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || video.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' ||
      (selectedStatus === 'watched' && video.watched && video.progress === 100) ||
      (selectedStatus === 'in-progress' && video.progress > 0 && video.progress < 100) ||
      (selectedStatus === 'not-started' && video.progress === 0);

    return matchesSearch && matchesSubject && matchesStatus;
  });

  const stats = {
    totalVideos: videos.length,
    watchedVideos: videos.filter(v => v.watched && v.progress === 100).length,
    inProgressVideos: videos.filter(v => v.progress > 0 && v.progress < 100).length,
    totalWatchTime: videos.reduce((total, video) => {
      const [minutes, seconds] = video.duration.split(':').map(Number);
      return total + (minutes * 60 + seconds) * (video.progress / 100);
    }, 0)
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return <Badge className="bg-green-500">Beginner</Badge>;
      case 'Intermediate':
        return <Badge className="bg-yellow-500">Intermediate</Badge>;
      case 'Advanced':
        return <Badge variant="destructive">Advanced</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const getStatusIcon = (video: Video) => {
    if (video.progress === 100) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (video.progress > 0) {
      return <Play className="h-4 w-4 text-blue-500" />;
    } else {
      return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatWatchTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Video Library</h1>
        <p className="text-muted-foreground">
          Access your assigned educational videos and track your progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Videos</p>
                <p className="text-2xl font-bold">{stats.totalVideos}</p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.watchedVideos}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgressVideos}</p>
              </div>
              <Play className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Watch Time</p>
                <p className="text-2xl font-bold">{formatWatchTime(stats.totalWatchTime)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="library" className="space-y-6">
        <TabsList>
          <TabsTrigger value="library">Video Library</TabsTrigger>
          <TabsTrigger value="watch">Watch Video</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject === 'all' ? 'All Subjects' : subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' :
                          status === 'not-started' ? 'Not Started' :
                            status === 'in-progress' ? 'In Progress' :
                              status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Video Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="hover-lift card-elegant">
                <div className="relative">
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    width={320}
                    height={180}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-primary/90 hover:bg-primary"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Watch Now
                    </Button>
                  </div>
                  <div className="absolute top-2 right-2">
                    {getStatusIcon(video)}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{video.subject}</Badge>
                    {getDifficultyBadge(video.difficulty)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{video.instructor}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{video.rating}</span>
                    </div>
                  </div>

                  {video.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{video.progress}%</span>
                      </div>
                      <Progress value={video.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Due: {new Date(video.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <Button
                      className="w-full"
                      variant={video.progress === 100 ? "outline" : "default"}
                      onClick={() => setSelectedVideo(video)}
                    >
                      {video.progress === 100 ? 'Rewatch' : video.progress > 0 ? 'Continue' : 'Start Watching'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="watch" className="space-y-6">
          {selectedVideo ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <YouTubeEmbed
                      videoId={selectedVideo.youtubeId}
                      title={selectedVideo.title}
                      className="w-full aspect-video rounded-lg"
                    />
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>{selectedVideo.title}</CardTitle>
                    <CardDescription>{selectedVideo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <span>By {selectedVideo.instructor}</span>
                      <span>•</span>
                      <span>{selectedVideo.duration}</span>
                      <span>•</span>
                      <span>{selectedVideo.views.toLocaleString()} views</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{selectedVideo.rating}</span>
                      </div>
                    </div>

                    {selectedVideo.notes && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Instructor Notes:</h4>
                        <p className="text-sm">{selectedVideo.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Video Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Subject:</span>
                      <Badge variant="secondary">{selectedVideo.subject}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Difficulty:</span>
                      {getDifficultyBadge(selectedVideo.difficulty)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Assigned:</span>
                      <span className="text-sm">{new Date(selectedVideo.assignedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Due Date:</span>
                      <span className="text-sm">{new Date(selectedVideo.dueDate).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {selectedVideo.progress > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completed</span>
                          <span>{selectedVideo.progress}%</span>
                        </div>
                        <Progress value={selectedVideo.progress} className="h-3" />
                        {selectedVideo.progress === 100 && (
                          <div className="flex items-center space-x-1 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Video completed!</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <Play className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a Video to Watch</h3>
                <p className="text-muted-foreground text-center">
                  Choose a video from your library to start learning
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentVideos;
