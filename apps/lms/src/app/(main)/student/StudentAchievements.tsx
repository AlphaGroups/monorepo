import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap,
  Clock,
  Video,
  BookOpen,
  TrendingUp,
  Calendar,
  Medal,
  Crown,
  Flame
} from 'lucide-react';

const StudentAchievements = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: 'speed-learner',
      title: 'Speed Learner',
      description: 'Watch 5 videos in a single day',
      icon: Zap,
      category: 'learning',
      points: 50,
      earned: true,
      earnedDate: '2024-01-18',
      progress: 100,
      rarity: 'common'
    },
    {
      id: 'perfect-score',
      title: 'Perfect Score',
      description: 'Score 100% on any test',
      icon: Star,
      category: 'academic',
      points: 100,
      earned: true,
      earnedDate: '2024-01-15',
      progress: 100,
      rarity: 'rare'
    },
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: 'Maintain a 7-day learning streak',
      icon: Flame,
      category: 'consistency',
      points: 75,
      earned: true,
      earnedDate: '2024-01-20',
      progress: 100,
      rarity: 'uncommon'
    },
    {
      id: 'video-marathon',
      title: 'Video Marathon',
      description: 'Watch 50 educational videos',
      icon: Video,
      category: 'learning',
      points: 150,
      earned: true,
      earnedDate: '2024-01-12',
      progress: 100,
      rarity: 'rare'
    },
    {
      id: 'test-champion',
      title: 'Test Champion',
      description: 'Complete 25 tests with average score above 85%',
      icon: Trophy,
      category: 'academic',
      points: 200,
      earned: false,
      progress: 68,
      target: 25,
      current: 17,
      rarity: 'epic'
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Submit assignments before deadline 10 times',
      icon: Clock,
      category: 'timeliness',
      points: 80,
      earned: false,
      progress: 40,
      target: 10,
      current: 4,
      rarity: 'uncommon'
    },
    {
      id: 'knowledge-seeker',
      title: 'Knowledge Seeker',
      description: 'Complete all videos in 3 different subjects',
      icon: BookOpen,
      category: 'exploration',
      points: 120,
      earned: false,
      progress: 67,
      target: 3,
      current: 2,
      rarity: 'rare'
    },
    {
      id: 'top-performer',
      title: 'Top Performer',
      description: 'Rank in top 10% of class',
      icon: Crown,
      category: 'academic',
      points: 300,
      earned: false,
      progress: 85,
      rarity: 'legendary'
    }
  ];

  const stats = {
    totalEarned: achievements.filter(a => a.earned).length,
    totalPoints: achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0),
    currentStreak: 12,
    longestStreak: 18,
    completionRate: Math.round((achievements.filter(a => a.earned).length / achievements.length) * 100)
  };

  const categories = [
    { id: 'all', name: 'All Achievements', icon: Trophy },
    { id: 'learning', name: 'Learning', icon: Video },
    { id: 'academic', name: 'Academic', icon: Star },
    { id: 'consistency', name: 'Consistency', icon: Target },
    { id: 'timeliness', name: 'Timeliness', icon: Clock },
    { id: 'exploration', name: 'Exploration', icon: BookOpen }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const getRarityBadge = (rarity: string) => {
    const colors = {
      common: 'bg-gray-500',
      uncommon: 'bg-green-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-yellow-500'
    };
    return (
      <Badge className={`${colors[rarity as keyof typeof colors]} text-white capitalize`}>
        {rarity}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Achievements</h1>
        <p className="text-muted-foreground">
          Track your learning milestones and celebrate your progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Earned</p>
                <p className="text-2xl font-bold">{stats.totalEarned}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Points</p>
                <p className="text-2xl font-bold">{stats.totalPoints}</p>
              </div>
              <Star className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{stats.currentStreak} days</p>
              </div>
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          {/* Category Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`hover-lift card-elegant ${
                  achievement.earned 
                    ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-transparent' 
                    : 'opacity-75'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned 
                          ? 'bg-primary/10' 
                          : 'bg-muted'
                      }`}>
                        <achievement.icon className={`h-6 w-6 ${
                          achievement.earned 
                            ? 'text-primary' 
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          {getRarityBadge(achievement.rarity)}
                          <Badge variant="secondary">{achievement.points} pts</Badge>
                        </div>
                      </div>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-green-500">
                        <Trophy className="mr-1 h-3 w-3" />
                        Earned
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  
                  {!achievement.earned && achievement.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {achievement.current && achievement.target 
                            ? `${achievement.current}/${achievement.target}` 
                            : `${achievement.progress}%`
                          }
                        </span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                  
                  {achievement.earned && achievement.earnedDate && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Your journey towards mastery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-bold">{stats.completionRate}%</span>
                  </div>
                  <Progress value={stats.completionRate} className="h-3" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Academic Excellence</span>
                    <span className="text-sm font-bold">75%</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Consistency</span>
                    <span className="text-sm font-bold">90%</span>
                  </div>
                  <Progress value={90} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Flame className="mr-2 h-5 w-5" />
                  Streak Statistics
                </CardTitle>
                <CardDescription>Your learning consistency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.currentStreak}</div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{stats.longestStreak}</div>
                    <p className="text-sm text-muted-foreground">Longest Streak</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Milestone</span>
                    <span>30 days</span>
                  </div>
                  <Progress value={(stats.currentStreak / 30) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {30 - stats.currentStreak} more days to earn "Month Master" achievement
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Medal className="mr-2 h-5 w-5" />
                Class Leaderboard
              </CardTitle>
              <CardDescription>See how you rank among your peers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: 'Sarah Johnson', points: 2850, streak: 25 },
                  { rank: 2, name: 'Mike Chen', points: 2720, streak: 18 },
                  { rank: 3, name: 'You', points: stats.totalPoints, streak: stats.currentStreak, isCurrentUser: true },
                  { rank: 4, name: 'Emma Davis', points: 2450, streak: 14 },
                  { rank: 5, name: 'Alex Rodriguez', points: 2380, streak: 22 }
                ].map((student) => (
                  <div 
                    key={student.rank} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      student.isCurrentUser ? 'bg-primary/10 border-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        student.rank === 1 ? 'bg-yellow-500 text-white' :
                        student.rank === 2 ? 'bg-gray-400 text-white' :
                        student.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {student.rank}
                      </div>
                      <div>
                        <div className={`font-medium ${student.isCurrentUser ? 'text-primary' : ''}`}>
                          {student.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {student.streak} day streak
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{student.points.toLocaleString()} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAchievements;