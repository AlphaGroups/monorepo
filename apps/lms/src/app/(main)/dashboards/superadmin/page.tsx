import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Building2,
  GraduationCap,
  Video,
  FileText,
  TrendingUp,
  Plus,
  BarChart3,
  Activity,
  CheckCircle,
  AlertCircle,
  Server
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const systemMetrics = [
    {
      title: 'Total Admins',
      value: '25',
      change: '+3',
      changeType: 'positive' as const,
      icon: Users,
      href: '/admin/users/admins'
    },
    {
      title: 'Colleges',
      value: '50',
      change: '+2',
      changeType: 'positive' as const,
      icon: Building2,
      href: '/admin/colleges'
    },
    {
      title: 'Students',
      value: '5,247',
      change: '+127',
      changeType: 'positive' as const,
      icon: GraduationCap,
      href: '/admin/users/students'
    },
    {
      title: 'Videos',
      value: '1,203',
      change: '+45',
      changeType: 'positive' as const,
      icon: Video,
      href: '/admin/content/videos'
    },
    {
      title: 'Tests',
      value: '847',
      change: '+23',
      changeType: 'positive' as const,
      icon: FileText,
      href: '/admin/content/tests'
    },
    {
      title: 'Activity',
      value: '95%',
      change: '+15%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      href: '/admin/analytics'
    }
  ];

  const recentActivities = [
    {
      action: 'New admin registered',
      details: 'John Doe (XYZ College)',
      time: '2 hours ago',
      type: 'user'
    },
    {
      action: 'Video uploaded',
      details: '"Advanced Mathematics" assigned to 5 classes',
      time: '4 hours ago',
      type: 'content'
    },
    {
      action: 'College created',
      details: 'ABC Technical Institute added',
      time: '6 hours ago',
      type: 'college'
    },
    {
      action: 'System maintenance',
      details: 'Database optimization completed',
      time: '1 day ago',
      type: 'system'
    }
  ];

  const systemHealth = [
    { name: 'Server Status', status: 'operational', value: 100 },
    { name: 'Database', status: 'operational', value: 98 },
    { name: 'Storage', status: 'warning', value: 75 },
    { name: 'CDN', status: 'operational', value: 99 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">System Overview</h1>
          <p className="text-muted-foreground">
            Manage your entire learning management system
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="hover-lift card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge
                  variant={metric.changeType === 'positive' ? 'default' : 'destructive'}
                  className="mr-2 text-xs"
                >
                  {metric.change}
                </Badge>
                from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity Feed */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system-wide activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-3 last:pb-0 border-b last:border-0">
                <div className="p-2 bg-primary/10 rounded-full">
                  {activity.type === 'user' && <Users className="h-3 w-3 text-primary" />}
                  {activity.type === 'content' && <Video className="h-3 w-3 text-primary" />}
                  {activity.type === 'college' && <Building2 className="h-3 w-3 text-primary" />}
                  {activity.type === 'system' && <Server className="h-3 w-3 text-primary" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>Current system status and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.status === 'operational' ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
                <Progress 
                  value={item.value} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Add Admin
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Video className="h-6 w-6 mb-2" />
              Upload Video
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Create Test
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;