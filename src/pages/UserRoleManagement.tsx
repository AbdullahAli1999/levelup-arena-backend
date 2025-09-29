import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Filter, 
  Shield, 
  Crown, 
  UserX, 
  UserCheck,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const UserRoleManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Mock data
  const mockUsers = [
    {
      id: '1',
      firstName: 'Ahmed',
      lastName: 'Al-Rashid',
      email: 'ahmed.rashid@email.com',
      phone: '+966501234567',
      avatar: '/placeholder.svg',
      role: 'ADMIN',
      status: 'ACTIVE',
      joinedDate: '2023-05-15',
      lastLogin: '2024-03-25T10:30:00Z',
      location: 'Riyadh, Saudi Arabia',
      permissions: ['USER_MANAGEMENT', 'SYSTEM_CONFIG', 'ANALYTICS', 'CONTENT_MODERATION'],
      stats: {
        totalSessions: 0,
        totalEarnings: 0,
        avgRating: 0
      }
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Al-Mahmoud',
      email: 'sarah.mahmoud@email.com',
      phone: '+966507654321',
      avatar: '/placeholder.svg',
      role: 'MODERATOR',
      status: 'ACTIVE',
      joinedDate: '2023-08-20',
      lastLogin: '2024-03-25T08:15:00Z',
      location: 'Jeddah, Saudi Arabia',
      permissions: ['CONTENT_MODERATION', 'USER_SUPPORT', 'REVIEW_MANAGEMENT'],
      stats: {
        totalSessions: 0,
        totalEarnings: 0,
        avgRating: 0,
        moderatedContent: 156,
        resolvedReports: 89
      }
    },
    {
      id: '3',
      firstName: 'Omar',
      lastName: 'Al-Qasimi',
      email: 'omar.qasimi@email.com',
      phone: '+966502345678',
      avatar: '/placeholder.svg',
      role: 'TRAINER',
      status: 'ACTIVE',
      joinedDate: '2023-11-10',
      lastLogin: '2024-03-24T19:45:00Z',
      location: 'Dammam, Saudi Arabia',
      permissions: ['SESSION_MANAGEMENT', 'STUDENT_PROGRESS'],
      stats: {
        totalSessions: 127,
        totalEarnings: 15400,
        avgRating: 4.8,
        completionRate: 96
      },
      specializations: ['Valorant', 'CS2'],
      verified: true
    },
    {
      id: '4',
      firstName: 'Layla',
      lastName: 'Al-Zahra',
      email: 'layla.zahra@email.com',
      phone: '+966503456789',
      avatar: '/placeholder.svg',
      role: 'PRO',
      status: 'ACTIVE',
      joinedDate: '2024-01-05',
      lastLogin: '2024-03-25T14:20:00Z',
      location: 'Riyadh, Saudi Arabia',
      permissions: ['PRO_FEATURES', 'TOURNAMENT_ACCESS'],
      stats: {
        totalSessions: 45,
        totalEarnings: 32500,
        avgRating: 4.9,
        globalRank: 23,
        winRate: 87.5
      },
      specializations: ['Fortnite'],
      verified: true,
      contractStatus: 'ACTIVE'
    },
    {
      id: '5',
      firstName: 'Khalid',
      lastName: 'Al-Mutairi',
      email: 'khalid.mutairi@email.com',
      phone: '+966504567890',
      avatar: '/placeholder.svg',
      role: 'PLAYER',
      status: 'ACTIVE',
      joinedDate: '2024-02-12',
      lastLogin: '2024-03-25T16:10:00Z',
      location: 'Mecca, Saudi Arabia',
      permissions: ['BASIC_ACCESS'],
      stats: {
        totalSessions: 18,
        totalEarnings: 0,
        avgRating: 0,
        skillLevel: 'INTERMEDIATE',
        hoursPlayed: 67
      }
    },
    {
      id: '6',
      firstName: 'Fatima',
      lastName: 'Al-Harbi',
      email: 'fatima.harbi@email.com',
      phone: '+966505678901',
      avatar: '/placeholder.svg',
      role: 'PARENTS',
      status: 'ACTIVE',
      joinedDate: '2024-01-28',
      lastLogin: '2024-03-24T12:30:00Z',
      location: 'Medina, Saudi Arabia',
      permissions: ['PARENT_DASHBOARD', 'CHILD_MANAGEMENT'],
      stats: {
        totalSessions: 0,
        totalEarnings: 0,
        avgRating: 0,
        childrenCount: 2,
        totalBookings: 15
      },
      children: [
        { name: 'Ali Al-Harbi', age: 12 },
        { name: 'Noor Al-Harbi', age: 9 }
      ]
    },
    {
      id: '7',
      firstName: 'Yasmin',
      lastName: 'Al-Fadl',
      email: 'yasmin.fadl@email.com',
      phone: '+966506789012',
      avatar: '/placeholder.svg',
      role: 'TRAINER',
      status: 'SUSPENDED',
      joinedDate: '2023-12-03',
      lastLogin: '2024-03-20T11:15:00Z',
      location: 'Taif, Saudi Arabia',
      permissions: [],
      stats: {
        totalSessions: 89,
        totalEarnings: 8900,
        avgRating: 3.2,
        completionRate: 78
      },
      specializations: ['League of Legends'],
      verified: false,
      suspendedReason: 'Multiple complaints about session quality',
      suspendedDate: '2024-03-22'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const getRoleColor = (role: string) => {
    const colors = {
      'ADMIN': 'bg-red-500/10 text-red-400 border-red-500/20',
      'MODERATOR': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'TRAINER': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'PRO': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'PLAYER': 'bg-green-500/10 text-green-400 border-green-500/20',
      'PARENTS': 'bg-pink-500/10 text-pink-400 border-pink-500/20'
    };
    return colors[role] || colors['PLAYER'];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'ACTIVE': 'bg-green-500/10 text-green-400 border-green-500/20',
      'SUSPENDED': 'bg-red-500/10 text-red-400 border-red-500/20',
      'PENDING': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'INACTIVE': 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    };
    return colors[status] || colors['ACTIVE'];
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      'ADMIN': <Crown className="h-4 w-4" />,
      'MODERATOR': <Shield className="h-4 w-4" />,
      'TRAINER': <Users className="h-4 w-4" />,
      'PRO': <Crown className="h-4 w-4" />,
      'PLAYER': <Users className="h-4 w-4" />,
      'PARENTS': <Users className="h-4 w-4" />
    };
    return icons[role] || icons['PLAYER'];
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    
    toast({
      title: "Role Updated",
      description: `User role has been changed to ${newRole}`,
    });
  };

  const handleStatusChange = (userId: string, newStatus: string, reason?: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: newStatus,
            ...(newStatus === 'SUSPENDED' && reason ? { 
              suspendedReason: reason, 
              suspendedDate: new Date().toISOString() 
            } : {})
          } 
        : user
    );
    setUsers(updatedUsers);
    
    toast({
      title: `User ${newStatus}`,
      description: `User status has been changed to ${newStatus}`,
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    acc[user.status] = (acc[user.status] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
        <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin-dashboard')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                User & Role Management
              </h1>
              <p className="text-muted-foreground">Manage users, roles, and permissions across the platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Crown className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.ADMIN || 0}</div>
              <div className="text-xs text-muted-foreground">Admins</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.MODERATOR || 0}</div>
              <div className="text-xs text-muted-foreground">Moderators</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.TRAINER || 0}</div>
              <div className="text-xs text-muted-foreground">Trainers</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Crown className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.PRO || 0}</div>
              <div className="text-xs text-muted-foreground">Pro Players</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.PLAYER || 0}</div>
              <div className="text-xs text-muted-foreground">Players</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.PARENTS || 0}</div>
              <div className="text-xs text-muted-foreground">Parents</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search Users</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role Filter</Label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Roles</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="MODERATOR">Moderator</SelectItem>
                    <SelectItem value="TRAINER">Trainer</SelectItem>
                    <SelectItem value="PRO">Pro Player</SelectItem>
                    <SelectItem value="PLAYER">Player</SelectItem>
                    <SelectItem value="PARENTS">Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status Filter</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Statuses</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.firstName} />
                      <AvatarFallback>
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">
                          {user.firstName} {user.lastName}
                        </h3>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleIcon(user.role)}
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        {user.verified && (
                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-0.5">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {user.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Joined {new Date(user.joinedDate).toLocaleDateString()}
                          </span>
                          <span>
                            Last login: {new Date(user.lastLogin).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.firstName[0]}{user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            {user.firstName} {user.lastName} - User Management
                          </DialogTitle>
                          <DialogDescription>
                            Comprehensive user information and management options
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Personal Information */}
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium">Personal Information</Label>
                                <div className="space-y-2 mt-2">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-xs text-muted-foreground">First Name</Label>
                                      <div className="font-medium">{user.firstName}</div>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">Last Name</Label>
                                      <div className="font-medium">{user.lastName}</div>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Email</Label>
                                    <div className="font-medium">{user.email}</div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Phone</Label>
                                    <div className="font-medium">{user.phone}</div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Location</Label>
                                    <div className="font-medium">{user.location}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium">Account Information</Label>
                                <div className="space-y-2 mt-2">
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Role</Label>
                                    <Select 
                                      value={user.role} 
                                      onValueChange={(value) => handleRoleChange(user.id, value)}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="MODERATOR">Moderator</SelectItem>
                                        <SelectItem value="TRAINER">Trainer</SelectItem>
                                        <SelectItem value="PRO">Pro Player</SelectItem>
                                        <SelectItem value="PLAYER">Player</SelectItem>
                                        <SelectItem value="PARENTS">Parent</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Status</Label>
                                    <Select 
                                      value={user.status} 
                                      onValueChange={(value) => handleStatusChange(user.id, value)}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="SUSPENDED">Suspended</SelectItem>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Joined Date</Label>
                                    <div className="font-medium">{new Date(user.joinedDate).toLocaleDateString()}</div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Last Login</Label>
                                    <div className="font-medium">{new Date(user.lastLogin).toLocaleDateString()}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Permissions */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Permissions</Label>
                            <div className="grid grid-cols-3 gap-2">
                              {user.permissions.map((permission) => (
                                <Badge key={permission} variant="outline" className="justify-center">
                                  {permission.replace('_', ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Statistics</Label>
                            <div className="grid grid-cols-4 gap-4">
                              <div className="text-center p-3 bg-card/50 rounded-lg">
                                <div className="font-bold text-lg">{user.stats.totalSessions}</div>
                                <div className="text-xs text-muted-foreground">Sessions</div>
                              </div>
                              <div className="text-center p-3 bg-card/50 rounded-lg">
                                <div className="font-bold text-lg">${user.stats.totalEarnings.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">Earnings</div>
                              </div>
                              <div className="text-center p-3 bg-card/50 rounded-lg">
                                <div className="font-bold text-lg">{user.stats.avgRating || 'N/A'}</div>
                                <div className="text-xs text-muted-foreground">Rating</div>
                              </div>
                              <div className="text-center p-3 bg-card/50 rounded-lg">
                                <div className="font-bold text-lg">
                                  {user.stats.completionRate || user.stats.childrenCount || user.stats.winRate || 'N/A'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {user.role === 'TRAINER' ? 'Completion %' : 
                                   user.role === 'PARENTS' ? 'Children' :
                                   user.role === 'PRO' ? 'Win Rate %' : 'Misc'}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Role-specific Information */}
                          {user.specializations && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Specializations</Label>
                              <div className="flex gap-2">
                                {user.specializations.map((spec) => (
                                  <Badge key={spec} className="bg-primary/10 text-primary">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {user.children && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Children</Label>
                              <div className="space-y-2">
                                {user.children.map((child, index) => (
                                  <div key={index} className="p-2 bg-card/50 rounded flex justify-between">
                                    <span>{child.name}</span>
                                    <span className="text-sm text-muted-foreground">Age {child.age}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {user.suspendedReason && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                              <Label className="text-sm font-medium text-red-400">Suspension Reason</Label>
                              <div className="text-sm text-red-300 mt-1">{user.suspendedReason}</div>
                              <div className="text-xs text-red-400 mt-1">
                                Suspended on {new Date(user.suspendedDate).toLocaleDateString()}
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Quick Actions */}
                    <div className="flex gap-1">
                      {user.status === 'ACTIVE' ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(user.id, 'SUSPENDED', 'Admin suspension')}
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Stats Summary */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="font-bold text-primary">{user.stats.totalSessions}</div>
                      <div className="text-xs text-muted-foreground">Total Sessions</div>
                    </div>
                    <div>
                      <div className="font-bold text-primary">${user.stats.totalEarnings.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total Earnings</div>
                    </div>
                    <div>
                      <div className="font-bold text-primary">{user.stats.avgRating || 'N/A'}</div>
                      <div className="text-xs text-muted-foreground">Avg Rating</div>
                    </div>
                    <div>
                      <div className="font-bold text-primary">
                        {user.stats.completionRate ? `${user.stats.completionRate}%` :
                         user.stats.childrenCount ? user.stats.childrenCount :
                         user.stats.winRate ? `${user.stats.winRate}%` :
                         user.stats.hoursPlayed ? `${user.stats.hoursPlayed}h` : 'N/A'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user.role === 'TRAINER' ? 'Completion' : 
                         user.role === 'PARENTS' ? 'Children' :
                         user.role === 'PRO' ? 'Win Rate' :
                         user.role === 'PLAYER' ? 'Hours' : 'Metric'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Users Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || roleFilter !== 'ALL' || statusFilter !== 'ALL' 
                  ? 'No users match your current filters.'
                  : 'No users to display at this time.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserRoleManagement;