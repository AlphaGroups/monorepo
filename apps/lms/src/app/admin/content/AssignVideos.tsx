import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Users, Calendar, Play, Clock, Plus } from 'lucide-react';
import { toast } from 'sonner';
import YouTubeEmbed from '@/components/YouTubeEmbed';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  youtubeId: string;
  thumbnail: string;
  tags: string[];
}

interface ClassInfo {
  id: string;
  name: string;
  code: string;
  studentCount: number;
  instructor: string;
}

const mockVideos: VideoContent[] = [
  {
    id: '1',
    title: 'Introduction to Calculus',
    description: 'Basic concepts of differential calculus',
    duration: 1800,
    category: 'Mathematics',
    difficulty: 'beginner',
    youtubeId: 'WUvTyaaNkzM',
    thumbnail: 'https://img.youtube.com/vi/WUvTyaaNkzM/maxresdefault.jpg',
    tags: ['calculus', 'derivatives', 'limits']
  },
  {
    id: '2',
    title: 'Quantum Physics Fundamentals',
    description: 'Introduction to quantum mechanics principles',
    duration: 2400,
    category: 'Physics',
    difficulty: 'intermediate',
    youtubeId: 'JhHMJCUmq28',
    thumbnail: 'https://img.youtube.com/vi/JhHMJCUmq28/maxresdefault.jpg',
    tags: ['quantum', 'physics', 'mechanics']
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    description: 'Comprehensive guide to DSA concepts',
    duration: 3600,
    category: 'Computer Science',
    difficulty: 'advanced',
    youtubeId: 'RBSGKlAvoiM',
    thumbnail: 'https://img.youtube.com/vi/RBSGKlAvoiM/maxresdefault.jpg',
    tags: ['algorithms', 'data structures', 'programming']
  }
];

const mockClasses: ClassInfo[] = [
  { id: '1', name: 'Advanced Mathematics', code: 'MATH-301', studentCount: 45, instructor: 'Dr. Smith' },
  { id: '2', name: 'Physics Laboratory', code: 'PHYS-201', studentCount: 30, instructor: 'Prof. Johnson' },
  { id: '3', name: 'Computer Programming', code: 'CS-101', studentCount: 60, instructor: 'Dr. Wilson' }
];

const AssignVideos = () => {
  const [videos] = useState<VideoContent[]>(mockVideos);
  const [classes] = useState<ClassInfo[]>(mockClasses);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const toggleVideoSelection = (videoId: string) => {
    setSelectedVideos(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const toggleClassSelection = (classId: string) => {
    setSelectedClasses(prev =>
      prev.includes(classId)
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const handleAssignVideos = async () => {
    if (selectedVideos.length === 0 || selectedClasses.length === 0) {
      toast.error('Please select at least one video and one class');
      return;
    }

    try {
      const response = await fetch('/api/content/assign-videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoIds: selectedVideos,
          classIds: selectedClasses,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        }),
      });

      if (response.ok) {
        toast.success(`Successfully assigned ${selectedVideos.length} videos to ${selectedClasses.length} classes`);
        setSelectedVideos([]);
        setSelectedClasses([]);
      } else {
        toast.error('Failed to assign videos. Please try again.');
      }
    } catch (error) {
      console.error('Error assigning videos:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Beginner</Badge>;
      case 'intermediate':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Intermediate</Badge>;
      case 'advanced':
        return <Badge variant="secondary" className="bg-red-100 text-red-700">Advanced</Badge>;
      default:
        return <Badge>{difficulty}</Badge>;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Assign Videos to Classes</h1>
          <p className="text-muted-foreground">Select videos and assign them to specific classes</p>
        </div>
        <Button 
          onClick={handleAssignVideos}
          disabled={selectedVideos.length === 0 || selectedClasses.length === 0}
        >
          <Plus className="mr-2 h-4 w-4" />
          Assign Selected ({selectedVideos.length})
        </Button>
      </div>

      <Tabs defaultValue="select-videos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="select-videos">
            Select Videos ({selectedVideos.length})
          </TabsTrigger>
          <TabsTrigger value="select-classes">
            Select Classes ({selectedClasses.length})
          </TabsTrigger>
          <TabsTrigger value="review">Review Assignment</TabsTrigger>
        </TabsList>

        <TabsContent value="select-videos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Videos</CardTitle>
              <CardDescription>
                Choose videos to assign to classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Select</TableHead>
                      <TableHead>Video</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVideos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedVideos.includes(video.id)}
                            onCheckedChange={() => toggleVideoSelection(video.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Image
                              src={video.thumbnail}
                              alt={video.title}
                              width={64}
                              height={48}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div>
                              <div className="font-medium">{video.title}</div>
                              <div className="text-sm text-muted-foreground line-clamp-2">
                                {video.description}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {video.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{video.category}</TableCell>
                        <TableCell>{getDifficultyBadge(video.difficulty)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            {formatDuration(video.duration)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                <Play className="mr-2 h-4 w-4" />
                                Preview
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{video.title}</DialogTitle>
                                <DialogDescription>{video.description}</DialogDescription>
                              </DialogHeader>
                              <div className="aspect-video">
                                <YouTubeEmbed videoId={video.youtubeId} />
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="select-classes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Classes</CardTitle>
              <CardDescription>
                Choose which classes will receive the assigned videos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((classInfo) => (
                  <Card 
                    key={classInfo.id}
                    className={`cursor-pointer transition-all ${
                      selectedClasses.includes(classInfo.id) 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => toggleClassSelection(classInfo.id)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedClasses.includes(classInfo.id)}
                              onChange={() => toggleClassSelection(classInfo.id)}
                            />
                            <div className="font-semibold">{classInfo.name}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {classInfo.code}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Instructor: {classInfo.instructor}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            {classInfo.studentCount} students
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Selected Videos ({selectedVideos.length})</CardTitle>
                <CardDescription>Videos to be assigned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedVideos.map(videoId => {
                    const video = videos.find(v => v.id === videoId);
                    if (!video) return null;
                    
                    return (
                      <div key={videoId} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          width={48}
                          height={32}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{video.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {video.category} • {formatDuration(video.duration)}
                          </div>
                        </div>
                        {getDifficultyBadge(video.difficulty)}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selected Classes ({selectedClasses.length})</CardTitle>
                <CardDescription>Classes that will receive the videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedClasses.map(classId => {
                    const classInfo = classes.find(c => c.id === classId);
                    if (!classInfo) return null;
                    
                    return (
                      <div key={classId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{classInfo.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {classInfo.code} • {classInfo.instructor}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          {classInfo.studentCount}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Assignment Summary</CardTitle>
              <CardDescription>Review and confirm the assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{selectedVideos.length}</div>
                  <div className="text-sm text-muted-foreground">Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{selectedClasses.length}</div>
                  <div className="text-sm text-muted-foreground">Classes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {selectedClasses.reduce((total, classId) => {
                      const classInfo = classes.find(c => c.id === classId);
                      return total + (classInfo?.studentCount || 0);
                    }, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {Math.floor(selectedVideos.reduce((total, videoId) => {
                      const video = videos.find(v => v.id === videoId);
                      return total + (video?.duration || 0);
                    }, 0) / 60)}m
                  </div>
                  <div className="text-sm text-muted-foreground">Total Duration</div>
                </div>
              </div>

              <Button 
                onClick={handleAssignVideos}
                disabled={selectedVideos.length === 0 || selectedClasses.length === 0}
                className="w-full"
                size="lg"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Assign Videos to Classes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignVideos;