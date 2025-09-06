import React from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Crown, UserCheck, GraduationCap } from 'lucide-react';

const roleConfig: Record<UserRole, {
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
}> = {
  super_admin: {
    label: 'Super Admin',
    icon: Crown,
    color: 'bg-gradient-primary text-primary-foreground',
    description: 'Full system access'
  },
  admin: {
    label: 'College Admin',
    icon: Shield,
    color: 'bg-gradient-secondary text-secondary-foreground',
    description: 'College management'
  },
  class_user: {
    label: 'Teacher',
    icon: UserCheck,
    color: 'bg-gradient-accent text-accent-foreground',
    description: 'Class management'
  },
  teacher: {
    label: 'Teacher',
    icon: UserCheck,
    color: 'bg-gradient-accent text-accent-foreground',
    description: 'Class management'
  },
  student: {
    label: 'Student',
    icon: GraduationCap,
    color: 'bg-muted text-muted-foreground',
    description: 'Learning access'
  }
} as const;

interface RoleSwitcherProps {
  className?: string;
  isCollapsed?: boolean;
}

const RoleSwitcher = ({ className, isCollapsed }: RoleSwitcherProps) => {
  const { user } = useAuth();

  if (!user) return null;

  // const currentRoleConfig = roleConfig[user.role];
  const currentRoleConfig = roleConfig[user.role as UserRole];

  const Icon = currentRoleConfig.icon;

  // For demo purposes - in real app this would be handled by proper authentication
  const handleRoleChange = (newRole: UserRole) => {
    // Mock role switching for demo
    const mockUsers: Record<UserRole, { id: string; name: string; email: string; role: UserRole }> = {
      super_admin: { id: '1', name: 'Super Admin', email: 'super@admin.com', role: 'super_admin' },
      admin: { id: '2', name: 'College Admin', email: 'admin@college.edu', role: 'admin' },
      class_user: { id: '3', name: 'Teacher Smith', email: 'teacher@college.edu', role: 'class_user' },
      teacher: { id: '3', name: 'Teacher Smith', email: 'teacher@college.edu', role: 'teacher' },
      student: { id: '4', name: 'John Student', email: 'student@college.edu', role: 'student' }
    };


    const newUser = mockUsers[newRole];
    localStorage.setItem('authUser', JSON.stringify(newUser));
    localStorage.setItem('authToken', 'demo-token-' + newRole);
    window.location.reload(); // Refresh to update auth context
  };

  if (isCollapsed) {
    return (
      <div className={`p-2 ${className}`}>
        <div className="flex items-center justify-center">
          <Badge variant="outline" className={`${currentRoleConfig.color} p-2 rounded-full`}>
            <Icon className="h-4 w-4" />
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 border-b border-sidebar-border ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-sidebar-foreground" />
          <span className="text-sm font-medium text-sidebar-foreground">Role (Demo)</span>
        </div>

        <Select value={user.role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={`${currentRoleConfig.color} text-xs`}>
                  {currentRoleConfig.label}
                </Badge>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(roleConfig).map(([role, config]) => {
              const RoleIcon = config.icon;
              return (
                <SelectItem key={role} value={role}>
                  <div className="flex items-center space-x-2">
                    <RoleIcon className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{config.label}</div>
                      <div className="text-xs text-muted-foreground">{config.description}</div>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RoleSwitcher;