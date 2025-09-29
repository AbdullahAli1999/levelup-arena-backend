import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Gamepad2, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Settings,
  Trophy,
  Users,
  Activity,
  TrendingUp
} from 'lucide-react';

const GameManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  // Mock data
  const mockGames = [
    {
      id: '1',
      name: 'Valorant',
      description: 'Tactical first-person shooter developed by Riot Games',
      category: 'FPS',
      publisher: 'Riot Games',
      releaseYear: 2020,
      icon: '🎯',
      banner: '/placeholder.svg',
      status: 'ACTIVE',
      popularity: 95,
      playerCount: 23000000,
      avgSessionDuration: 35,
      totalSessions: 45600,
      totalEarnings: 450000,
      ranks: [
        'Iron 1', 'Iron 2', 'Iron 3',
        'Bronze 1', 'Bronze 2', 'Bronze 3',
        'Silver 1', 'Silver 2', 'Silver 3',
        'Gold 1', 'Gold 2', 'Gold 3',
        'Platinum 1', 'Platinum 2', 'Platinum 3',
        'Diamond 1', 'Diamond 2', 'Diamond 3',
        'Immortal 1', 'Immortal 2', 'Immortal 3',
        'Radiant'
      ],
      gameSettings: {
        minAge: 16,
        maxSessionDuration: 180,
        allowTournaments: true,
        allowStreaming: true,
        requireVerification: true
      },
      trainers: 45,
      proPlayers: 12,
      activeBookings: 156
    },
    {
      id: '2',
      name: 'Fortnite',
      description: 'Battle royale game developed by Epic Games',
      category: 'Battle Royale',
      publisher: 'Epic Games',
      releaseYear: 2017,
      icon: '🏗️',
      banner: '/placeholder.svg',
      status: 'ACTIVE',
      popularity: 92,
      playerCount: 35000000,
      avgSessionDuration: 45,
      totalSessions: 38200,
      totalEarnings: 380000,
      ranks: [
        'Open League',
        'Contender League',
        'Champion League'
      ],
      gameSettings: {
        minAge: 13,
        maxSessionDuration: 120,
        allowTournaments: true,
        allowStreaming: true,
        requireVerification: false
      },
      trainers: 38,
      proPlayers: 8,
      activeBookings: 124
    },
    {
      id: '3',
      name: 'Counter-Strike 2',
      description: 'Competitive first-person shooter by Valve',
      category: 'FPS',
      publisher: 'Valve Corporation',
      releaseYear: 2023,
      icon: '🔫',
      banner: '/placeholder.svg',
      status: 'ACTIVE',
      popularity: 89,
      playerCount: 28000000,
      avgSessionDuration: 40,
      totalSessions: 32100,
      totalEarnings: 320000,
      ranks: [
        'Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Silver Elite', 'Silver Elite Master',
        'Gold Nova I', 'Gold Nova II', 'Gold Nova III', 'Gold Nova Master',
        'Master Guardian I', 'Master Guardian II', 'Master Guardian Elite', 'Distinguished Master Guardian',
        'Legendary Eagle', 'Legendary Eagle Master', 'Supreme Master First Class', 'The Global Elite'
      ],
      gameSettings: {
        minAge: 17,
        maxSessionDuration: 150,
        allowTournaments: true,
        allowStreaming: true,
        requireVerification: true
      },
      trainers: 32,
      proPlayers: 15,
      activeBookings: 98
    },
    {
      id: '4',
      name: 'League of Legends',
      description: 'Multiplayer online battle arena game by Riot Games',
      category: 'MOBA',
      publisher: 'Riot Games',
      releaseYear: 2009,
      icon: '⚔️',
      banner: '/placeholder.svg',
      status: 'ACTIVE',
      popularity: 88,
      playerCount: 18000000,
      avgSessionDuration: 32,
      totalSessions: 28900,
      totalEarnings: 290000,
      ranks: [
        'Iron IV', 'Iron III', 'Iron II', 'Iron I',
        'Bronze IV', 'Bronze III', 'Bronze II', 'Bronze I',
        'Silver IV', 'Silver III', 'Silver II', 'Silver I',
        'Gold IV', 'Gold III', 'Gold II', 'Gold I',
        'Platinum IV', 'Platinum III', 'Platinum II', 'Platinum I',
        'Diamond IV', 'Diamond III', 'Diamond II', 'Diamond I',
        'Master', 'Grandmaster', 'Challenger'
      ],
      gameSettings: {
        minAge: 15,
        maxSessionDuration: 90,
        allowTournaments: true,
        allowStreaming: true,
        requireVerification: false
      },
      trainers: 28,
      proPlayers: 6,
      activeBookings: 76
    },
    {
      id: '5',
      name: 'Minecraft',
      description: 'Sandbox video game developed by Mojang Studios',
      category: 'Sandbox',
      publisher: 'Mojang Studios',
      releaseYear: 2011,
      icon: '⛏️',
      banner: '/placeholder.svg',
      status: 'ACTIVE',
      popularity: 75,
      playerCount: 14000000,
      avgSessionDuration: 60,
      totalSessions: 15600,
      totalEarnings: 156000,
      ranks: [],
      gameSettings: {
        minAge: 7,
        maxSessionDuration: 120,
        allowTournaments: false,
        allowStreaming: true,
        requireVerification: false
      },
      trainers: 22,
      proPlayers: 0,
      activeBookings: 89
    },
    {
      id: '6',
      name: 'Rocket League',
      description: 'Vehicular soccer video game developed by Psyonix',
      category: 'Sports',
      publisher: 'Psyonix',
      releaseYear: 2015,
      icon: '🚗',
      banner: '/placeholder.svg',
      status: 'MAINTENANCE',
      popularity: 70,
      playerCount: 8000000,
      avgSessionDuration: 25,
      totalSessions: 8900,
      totalEarnings: 89000,
      ranks: [
        'Bronze I', 'Bronze II', 'Bronze III',
        'Silver I', 'Silver II', 'Silver III',
        'Gold I', 'Gold II', 'Gold III',
        'Platinum I', 'Platinum II', 'Platinum III',
        'Diamond I', 'Diamond II', 'Diamond III',
        'Champion I', 'Champion II', 'Champion III',
        'Grand Champion I', 'Grand Champion II', 'Grand Champion III',
        'Supersonic Legend'
      ],
      gameSettings: {
        minAge: 10,
        maxSessionDuration: 60,
        allowTournaments: true,
        allowStreaming: true,
        requireVerification: false
      },
      trainers: 15,
      proPlayers: 4,
      activeBookings: 23
    }
  ];

  const [newGame, setNewGame] = useState({
    name: '',
    description: '',
    category: '',
    publisher: '',
    releaseYear: new Date().getFullYear(),
    icon: '🎮',
    status: 'ACTIVE',
    gameSettings: {
      minAge: 13,
      maxSessionDuration: 120,
      allowTournaments: true,
      allowStreaming: true,
      requireVerification: false
    },
    ranks: []
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGames(mockGames);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'ACTIVE': 'bg-green-500/10 text-green-400 border-green-500/20',
      'MAINTENANCE': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'DEPRECATED': 'bg-red-500/10 text-red-400 border-red-500/20',
      'BETA': 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    };
    return colors[status] || colors['ACTIVE'];
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-green-400';
    if (popularity >= 70) return 'text-yellow-400';
    if (popularity >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const handleGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      // Update existing game
      const updatedGames = games.map(game => 
        game.id === editingGame.id ? { ...editingGame, ...newGame } : game
      );
      setGames(updatedGames);
      toast({
        title: "Game Updated",
        description: `${newGame.name} has been updated successfully.`,
      });
    } else {
      // Add new game
      const gameToAdd = {
        ...newGame,
        id: Date.now().toString(),
        playerCount: 0,
        avgSessionDuration: 0,
        totalSessions: 0,
        totalEarnings: 0,
        trainers: 0,
        proPlayers: 0,
        activeBookings: 0,
        popularity: 50
      };
      setGames([...games, gameToAdd]);
      toast({
        title: "Game Added",
        description: `${newGame.name} has been added to the platform.`,
      });
    }
    
    setShowAddModal(false);
    setEditingGame(null);
    setNewGame({
      name: '',
      description: '',
      category: '',
      publisher: '',
      releaseYear: new Date().getFullYear(),
      icon: '🎮',
      status: 'ACTIVE',
      gameSettings: {
        minAge: 13,
        maxSessionDuration: 120,
        allowTournaments: true,
        allowStreaming: true,
        requireVerification: false
      },
      ranks: []
    });
  };

  const handleGameEdit = (game: any) => {
    setEditingGame(game);
    setNewGame({
      name: game.name,
      description: game.description,
      category: game.category,
      publisher: game.publisher,
      releaseYear: game.releaseYear,
      icon: game.icon,
      status: game.status,
      gameSettings: { ...game.gameSettings },
      ranks: [...game.ranks]
    });
    setShowAddModal(true);
  };

  const handleGameDelete = (gameId: string) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    setGames(updatedGames);
    toast({
      title: "Game Removed",
      description: "The game has been removed from the platform.",
    });
  };

  const handleStatusChange = (gameId: string, newStatus: string) => {
    const updatedGames = games.map(game => 
      game.id === gameId ? { ...game, status: newStatus } : game
    );
    setGames(updatedGames);
    toast({
      title: "Status Updated",
      description: `Game status has been changed to ${newStatus}.`,
    });
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.publisher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || game.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const gameStats = games.reduce((acc, game) => {
    acc.totalGames = games.length;
    acc.activeGames = games.filter(g => g.status === 'ACTIVE').length;
    acc.totalSessions += game.totalSessions;
    acc.totalEarnings += game.totalEarnings;
    return acc;
  }, { totalGames: 0, activeGames: 0, totalSessions: 0, totalEarnings: 0 });

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
          <div className="flex items-center justify-between">
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
                  Game Management
                </h1>
                <p className="text-muted-foreground">Manage games, settings, and platform integration</p>
              </div>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Game
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Gamepad2 className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{gameStats.totalGames}</div>
              <div className="text-xs text-muted-foreground">Total Games</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Activity className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{gameStats.activeGames}</div>
              <div className="text-xs text-muted-foreground">Active Games</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{gameStats.totalSessions.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Sessions</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">${gameStats.totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Earnings</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Search Games</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, category, or publisher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                    <SelectItem value="DEPRECATED">Deprecated</SelectItem>
                    <SelectItem value="BETA">Beta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Card key={game.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{game.icon}</div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {game.name}
                        <Badge className={getStatusColor(game.status)}>
                          {game.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{game.category} • {game.publisher}</CardDescription>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${getPopularityColor(game.popularity)}`}>
                    {game.popularity}%
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {game.description}
                </p>

                {/* Game Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-2 bg-card/30 rounded">
                    <div className="font-bold text-primary">{game.playerCount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Players</div>
                  </div>
                  <div className="text-center p-2 bg-card/30 rounded">
                    <div className="font-bold text-primary">{game.totalSessions.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Sessions</div>
                  </div>
                  <div className="text-center p-2 bg-card/30 rounded">
                    <div className="font-bold text-primary">{game.trainers}</div>
                    <div className="text-xs text-muted-foreground">Trainers</div>
                  </div>
                  <div className="text-center p-2 bg-card/30 rounded">
                    <div className="font-bold text-primary">{game.activeBookings}</div>
                    <div className="text-xs text-muted-foreground">Active Bookings</div>
                  </div>
                </div>

                {/* Game Settings Preview */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Min Age:</span>
                    <span>{game.gameSettings.minAge}+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Max Session:</span>
                    <span>{game.gameSettings.maxSessionDuration}min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tournaments:</span>
                    <span>{game.gameSettings.allowTournaments ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <span className="text-3xl">{game.icon}</span>
                          {game.name} - Game Details
                        </DialogTitle>
                        <DialogDescription>
                          Comprehensive game information and statistics
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium">Game Information</Label>
                              <div className="space-y-2 mt-2">
                                <div>
                                  <Label className="text-xs text-muted-foreground">Name</Label>
                                  <div className="font-medium">{game.name}</div>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Category</Label>
                                  <div className="font-medium">{game.category}</div>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Publisher</Label>
                                  <div className="font-medium">{game.publisher}</div>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Release Year</Label>
                                  <div className="font-medium">{game.releaseYear}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium">Platform Statistics</Label>
                              <div className="space-y-2 mt-2">
                                <div>
                                  <Label className="text-xs text-muted-foreground">Status</Label>
                                  <div>
                                    <Select 
                                      value={game.status} 
                                      onValueChange={(value) => handleStatusChange(game.id, value)}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                                        <SelectItem value="DEPRECATED">Deprecated</SelectItem>
                                        <SelectItem value="BETA">Beta</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Popularity</Label>
                                  <div className="font-medium">{game.popularity}%</div>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Player Count</Label>
                                  <div className="font-medium">{game.playerCount.toLocaleString()}</div>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Avg Session Duration</Label>
                                  <div className="font-medium">{game.avgSessionDuration} minutes</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Performance Stats */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Performance Statistics</Label>
                          <div className="grid grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-card/50 rounded-lg">
                              <div className="font-bold text-lg">{game.totalSessions.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">Total Sessions</div>
                            </div>
                            <div className="text-center p-3 bg-card/50 rounded-lg">
                              <div className="font-bold text-lg">${game.totalEarnings.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">Total Earnings</div>
                            </div>
                            <div className="text-center p-3 bg-card/50 rounded-lg">
                              <div className="font-bold text-lg">{game.trainers}</div>
                              <div className="text-xs text-muted-foreground">Active Trainers</div>
                            </div>
                            <div className="text-center p-3 bg-card/50 rounded-lg">
                              <div className="font-bold text-lg">{game.proPlayers}</div>
                              <div className="text-xs text-muted-foreground">Pro Players</div>
                            </div>
                          </div>
                        </div>

                        {/* Game Settings */}
                        <div className="space-y-4">
                          <Label className="text-sm font-medium">Game Settings</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label className="text-sm">Minimum Age</Label>
                                <span className="font-medium">{game.gameSettings.minAge}+</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <Label className="text-sm">Max Session Duration</Label>
                                <span className="font-medium">{game.gameSettings.maxSessionDuration} min</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label className="text-sm">Allow Tournaments</Label>
                                <Switch checked={game.gameSettings.allowTournaments} disabled />
                              </div>
                              <div className="flex justify-between items-center">
                                <Label className="text-sm">Allow Streaming</Label>
                                <Switch checked={game.gameSettings.allowStreaming} disabled />
                              </div>
                              <div className="flex justify-between items-center">
                                <Label className="text-sm">Require Verification</Label>
                                <Switch checked={game.gameSettings.requireVerification} disabled />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Ranks */}
                        {game.ranks.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Ranking System</Label>
                            <div className="grid grid-cols-4 gap-2">
                              {game.ranks.map((rank, index) => (
                                <Badge key={index} variant="outline" className="justify-center">
                                  {rank}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Description */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Description</Label>
                          <p className="text-sm text-muted-foreground">{game.description}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm" onClick={() => handleGameEdit(game)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleGameDelete(game.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <Gamepad2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Games Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'ALL' 
                  ? 'No games match your current filters.'
                  : 'No games have been added to the platform yet.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Game Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingGame ? 'Edit Game' : 'Add New Game'}</DialogTitle>
            <DialogDescription>
              {editingGame ? 'Update game information and settings' : 'Add a new game to the platform'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleGameSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Game Name *</Label>
                <Input
                  id="name"
                  value={newGame.name}
                  onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                  placeholder="Enter game name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  value={newGame.icon}
                  onChange={(e) => setNewGame({ ...newGame, icon: e.target.value })}
                  placeholder="🎮"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={newGame.description}
                onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                placeholder="Enter game description"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newGame.category}
                  onValueChange={(value) => setNewGame({ ...newGame, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FPS">FPS</SelectItem>
                    <SelectItem value="MOBA">MOBA</SelectItem>
                    <SelectItem value="Battle Royale">Battle Royale</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Racing">Racing</SelectItem>
                    <SelectItem value="Strategy">Strategy</SelectItem>
                    <SelectItem value="Sandbox">Sandbox</SelectItem>
                    <SelectItem value="MMO">MMO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher *</Label>
                <Input
                  id="publisher"
                  value={newGame.publisher}
                  onChange={(e) => setNewGame({ ...newGame, publisher: e.target.value })}
                  placeholder="Enter publisher"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="releaseYear">Release Year</Label>
                <Input
                  id="releaseYear"
                  type="number"
                  value={newGame.releaseYear}
                  onChange={(e) => setNewGame({ ...newGame, releaseYear: parseInt(e.target.value) })}
                  min="1980"
                  max={new Date().getFullYear() + 5}
                />
              </div>
            </div>

            {/* Game Settings */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Game Settings</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAge">Minimum Age</Label>
                  <Input
                    id="minAge"
                    type="number"
                    value={newGame.gameSettings.minAge}
                    onChange={(e) => setNewGame({ 
                      ...newGame, 
                      gameSettings: { 
                        ...newGame.gameSettings, 
                        minAge: parseInt(e.target.value) 
                      } 
                    })}
                    min="7"
                    max="18"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDuration">Max Session Duration (minutes)</Label>
                  <Input
                    id="maxDuration"
                    type="number"
                    value={newGame.gameSettings.maxSessionDuration}
                    onChange={(e) => setNewGame({ 
                      ...newGame, 
                      gameSettings: { 
                        ...newGame.gameSettings, 
                        maxSessionDuration: parseInt(e.target.value) 
                      } 
                    })}
                    min="30"
                    max="240"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="tournaments"
                    checked={newGame.gameSettings.allowTournaments}
                    onCheckedChange={(checked) => setNewGame({ 
                      ...newGame, 
                      gameSettings: { 
                        ...newGame.gameSettings, 
                        allowTournaments: checked 
                      } 
                    })}
                  />
                  <Label htmlFor="tournaments">Allow Tournaments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="streaming"
                    checked={newGame.gameSettings.allowStreaming}
                    onCheckedChange={(checked) => setNewGame({ 
                      ...newGame, 
                      gameSettings: { 
                        ...newGame.gameSettings, 
                        allowStreaming: checked 
                      } 
                    })}
                  />
                  <Label htmlFor="streaming">Allow Streaming</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="verification"
                    checked={newGame.gameSettings.requireVerification}
                    onCheckedChange={(checked) => setNewGame({ 
                      ...newGame, 
                      gameSettings: { 
                        ...newGame.gameSettings, 
                        requireVerification: checked 
                      } 
                    })}
                  />
                  <Label htmlFor="verification">Require Verification</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingGame ? 'Update Game' : 'Add Game'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameManagement;