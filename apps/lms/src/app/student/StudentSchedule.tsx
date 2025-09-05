import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User,
  Video,
  FileText,
  BookOpen,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const StudentSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const schedule = [
    {
      id: '1',
      title: 'Linear Algebra Lecture',
      type: 'class',
      subject: 'Mathematics 101',
      instructor: 'Dr. Sarah Smith',
      time: '09:00 - 10:30',
      location: 'Room A-101',
      date: '2024-01-22',
      color: 'bg-blue-500',
      description: 'Vector spaces and linear transformations'
    },
    {
      id: '2',
      title: 'Calculus Assignment Due',
      type: 'assignment',
      subject: 'Mathematics 101',
      time: '23:59',
      date: '2024-01-22',
      color: 'bg-red-500',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Physics Lab Session',
      type: 'lab',
      subject: 'Physics Advanced',
      instructor: 'Prof. Michael Johnson',
      time: '14:00 - 16:00',
      location: 'Physics Lab B',
      date: '2024-01-23',
      color: 'bg-green-500',
      description: 'Momentum and collision experiments'
    },
    {
      id: '4',
      title: 'Watch: Thermodynamics Video',
      type: 'video',
      subject: 'Physics Advanced',
      time: '19:00 - 20:30',
      date: '2024-01-23',
      color: 'bg-purple-500',
      duration: '45 minutes'
    },
    {
      id: '5',
      title: 'Chemistry Quiz',
      type: 'test',
      subject: 'Chemistry Basic',
      instructor: 'Dr. Emily Brown',
      time: '11:00 - 12:00',
      location: 'Room C-205',
      date: '2024-01-24',
      color: 'bg-orange-500',
      questions: 20,
      duration: '60 minutes'
    },
    {
      id: '6',
      title: 'Study Group: Physics',
      type: 'study',
      subject: 'Physics Advanced',
      time: '15:00 - 17:00',
      location: 'Library Study Room 3',
      date: '2024-01-24',
      color: 'bg-teal-500',
      participants: ['Alice', 'Bob', 'Carol']
    },
    {
      id: '7',
      title: 'Math Tutorial Session',
      type: 'tutorial',
      subject: 'Mathematics 101',
      instructor: 'TA: John Doe',
      time: '16:00 - 17:00',
      location: 'Room A-203',
      date: '2024-01-25',
      color: 'bg-indigo-500'
    }
  ];

  const weeklyView = [
    { day: 'Monday', date: '22', events: schedule.filter(s => s.date === '2024-01-22') },
    { day: 'Tuesday', date: '23', events: schedule.filter(s => s.date === '2024-01-23') },
    { day: 'Wednesday', date: '24', events: schedule.filter(s => s.date === '2024-01-24') },
    { day: 'Thursday', date: '25', events: schedule.filter(s => s.date === '2024-01-25') },
    { day: 'Friday', date: '26', events: schedule.filter(s => s.date === '2024-01-26') },
    { day: 'Saturday', date: '27', events: [] },
    { day: 'Sunday', date: '28', events: [] }
  ];

  const upcomingEvents = schedule
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const todayEvents = schedule.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date === today;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <BookOpen className="h-4 w-4" />;
      case 'lab':
        return <BookOpen className="h-4 w-4" />;
      case 'tutorial':
        return <User className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'test':
        return <FileText className="h-4 w-4" />;
      case 'assignment':
        return <FileText className="h-4 w-4" />;
      case 'study':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'class':
        return 'Lecture';
      case 'lab':
        return 'Lab';
      case 'tutorial':
        return 'Tutorial';
      case 'video':
        return 'Video';
      case 'test':
        return 'Quiz/Test';
      case 'assignment':
        return 'Assignment';
      case 'study':
        return 'Study Group';
      default:
        return type;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Schedule</h1>
        <p className="text-muted-foreground">
          Manage your classes, assignments, and study time
        </p>
      </div>

      <Tabs defaultValue="week" className="space-y-6">
        <TabsList>
          <TabsTrigger value="week">Week View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-6">
          {/* Week Navigation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Week of January 22 - 28, 2024
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Weekly Schedule Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {weeklyView.map((day, index) => (
              <Card key={index} className="min-h-[400px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center">
                    <div className="font-semibold">{day.day}</div>
                    <div className="text-2xl font-bold text-primary">{day.date}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {day.events.map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg text-white text-sm ${event.color}`}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        {getEventIcon(event.type)}
                        <span className="font-medium text-xs">{getTypeLabel(event.type)}</span>
                      </div>
                      <div className="font-semibold line-clamp-2">{event.title}</div>
                      {event.time && (
                        <div className="flex items-center space-x-1 mt-1 text-xs opacity-90">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center space-x-1 text-xs opacity-90">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  {day.events.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      No events scheduled
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>Select a date to view events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Events for {selectedDate?.toLocaleDateString() || 'Selected Date'}
                </CardTitle>
                <CardDescription>Your schedule for the selected day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedDate && schedule
                    .filter(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.toDateString() === selectedDate.toDateString();
                    })
                    .map((event) => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className={`p-2 rounded-lg text-white ${event.color}`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{event.title}</h4>
                            {getPriorityBadge(event.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground">{event.subject}</p>
                          {event.time && (
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  {selectedDate && schedule.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === selectedDate.toDateString();
                  }).length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      No events scheduled for this date
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Your next 5 scheduled events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className={`p-2 rounded-lg text-white ${event.color}`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{event.title}</h4>
                          {getPriorityBadge(event.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground">{event.subject}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                          )}
                        </div>
                        {event.location && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>What's happening today</CardDescription>
              </CardHeader>
              <CardContent>
                {todayEvents.length > 0 ? (
                  <div className="space-y-3">
                    {todayEvents.map((event) => (
                      <div key={event.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className={`p-2 rounded-lg text-white ${event.color}`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.subject}</p>
                          {event.time && (
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No events scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">This Week</p>
                    <p className="text-2xl font-bold">
                      {schedule.filter(s => {
                        const eventDate = new Date(s.date);
                        const today = new Date();
                        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
                        const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
                        return eventDate >= weekStart && eventDate <= weekEnd;
                      }).length} events
                    </p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assignments Due</p>
                    <p className="text-2xl font-bold text-red-500">
                      {schedule.filter(s => s.type === 'assignment').length}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
                    <p className="text-2xl font-bold text-blue-500">24h</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentSchedule;