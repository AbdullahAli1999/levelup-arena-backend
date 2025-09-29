import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  FileText, 
  DollarSign, 
  Calendar, 
  Clock, 
  Building, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  Download,
  Search,
  Filter,
  Users,
  Shield
} from 'lucide-react';

const ContractModeration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [clubFilter, setClubFilter] = useState('ALL');

  // Mock data
  const mockContracts = [
    {
      id: '1',
      player: {
        firstName: 'Ahmed',
        lastName: 'Al-Mutairi',
        avatar: '/placeholder.svg',
        currentRank: 'Immortal 2',
        age: 20
      },
      club: {
        name: 'Saudi Esports Elite',
        logo: '/placeholder.svg',
        tier: 'TIER_1'
      },
      contractDetails: {
        type: 'FULL_TIME',
        duration: 24, // months
        startDate: '2024-04-01',
        endDate: '2026-03-31',
        monthlySalary: 12000,
        signingBonus: 5000,
        bonuses: {
          winBonus: 800,
          tournamentBonus: 3000,
          streamingBonus: 400
        },
        benefits: [
          'Full health insurance',
          'Gaming equipment provided',
          'Travel expenses covered',
          'Performance bonuses'
        ]
      },
      game: 'Valorant',
      submittedDate: '2024-03-20',
      status: 'PENDING_REVIEW',
      priority: 'HIGH',
      concerns: [
        'Salary above standard range for player rank',
        'Unusual streaming bonus structure'
      ],
      negotiationHistory: [
        {
          date: '2024-03-18',
          party: 'Club',
          action: 'Initial offer submitted',
          amount: 10000
        },
        {
          date: '2024-03-19',
          party: 'Player',
          action: 'Counter-offer requested',
          amount: 12000
        }
      ],
      documents: {
        contract: 'contract-v2.pdf',
        playerConsent: 'player-consent.pdf',
        clubTerms: 'club-terms.pdf'
      }
    },
    {
      id: '2',
      player: {
        firstName: 'Layla',
        lastName: 'Al-Harbi',
        avatar: '/placeholder.svg',
        currentRank: 'Champion League',
        age: 18
      },
      club: {
        name: 'Desert Warriors',
        logo: '/placeholder.svg',
        tier: 'TIER_2'
      },
      contractDetails: {
        type: 'PART_TIME',
        duration: 12,
        startDate: '2024-04-15',
        endDate: '2025-04-14',
        monthlySalary: 6500,
        signingBonus: 2000,
        bonuses: {
          winBonus: 400,
          tournamentBonus: 1500
        },
        benefits: [
          'Equipment allowance',
          'Tournament travel support'
        ]
      },
      game: 'Fortnite',
      submittedDate: '2024-03-22',
      status: 'APPROVED',
      priority: 'NORMAL',
      approvedBy: 'Moderator Sarah',
      approvedDate: '2024-03-23',
      concerns: [],
      negotiationHistory: [
        {
          date: '2024-03-21',
          party: 'Club',
          action: 'Initial offer submitted',
          amount: 6500
        }
      ]
    },
    {
      id: '3',
      player: {
        firstName: 'Omar',
        lastName: 'Al-Qasimi',
        avatar: '/placeholder.svg',
        currentRank: 'Global Elite',
        age: 22
      },
      club: {
        name: 'Cyber Knights',
        logo: '/placeholder.svg',
        tier: 'TIER_1'
      },
      contractDetails: {
        type: 'TOURNAMENT_ONLY',
        duration: 6,
        startDate: '2024-03-25',
        endDate: '2024-09-24',
        monthlySalary: 4000,
        signingBonus: 0,
        bonuses: {
          winBonus: 1200,
          tournamentBonus: 8000
        },
        benefits: [
          'Tournament entry fees covered',
          'Coaching support'
        ]
      },
      game: 'CS2',
      submittedDate: '2024-03-15',
      status: 'REJECTED',
      priority: 'LOW',
      rejectedBy: 'Moderator Ahmed',
      rejectedDate: '2024-03-21',
      rejectionReason: 'Tournament bonus structure exceeds platform guidelines',
      concerns: [
        'Tournament bonus too high relative to base salary',
        'Short contract duration with high bonuses'
      ]
    },
    {
      id: '4',
      player: {
        firstName: 'Fatima',
        lastName: 'Al-Zahra',
        avatar: '/placeholder.svg',
        currentRank: 'Challenger',
        age: 19
      },
      club: {
        name: 'Phoenix Gaming',
        logo: '/placeholder.svg',
        tier: 'TIER_2'
      },
      contractDetails: {
        type: 'FULL_TIME',
        duration: 18,
        startDate: '2024-05-01',
        endDate: '2025-10-31',
        monthlySalary: 8500,
        signingBonus: 3000,
        bonuses: {
          winBonus: 600,
          tournamentBonus: 2200,
          streamingBonus: 300
        },
        benefits: [
          'Health insurance',
          'Equipment provided',
          'Performance coaching'
        ]
      },
      game: 'League of Legends',
      submittedDate: '2024-03-25',
      status: 'UNDER_REVIEW',
      priority: 'NORMAL',
      concerns: [
        'Player age requires parental consent verification'
      ],
      assignedTo: 'Moderator Sarah',
      negotiationHistory: [
        {
          date: '2024-03-24',
          party: 'Club',
          action: 'Initial offer submitted',
          amount: 8500
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setContracts(mockContracts);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'PENDING_REVIEW': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'UNDER_REVIEW': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'APPROVED': 'bg-green-500/10 text-green-400 border-green-500/20',
      'REJECTED': 'bg-red-500/10 text-red-400 border-red-500/20',
      'DISPUTED': 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    };
    return colors[status] || colors['PENDING_REVIEW'];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'PENDING_REVIEW': <Clock className="h-4 w-4" />,
      'UNDER_REVIEW': <Eye className="h-4 w-4" />,
      'APPROVED': <CheckCircle className="h-4 w-4" />,
      'REJECTED': <XCircle className="h-4 w-4" />,
      'DISPUTED': <AlertTriangle className="h-4 w-4" />
    };
    return icons[status] || icons['PENDING_REVIEW'];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'LOW': 'bg-green-500/10 text-green-400',
      'NORMAL': 'bg-blue-500/10 text-blue-400',
      'HIGH': 'bg-orange-500/10 text-orange-400',
      'URGENT': 'bg-red-500/10 text-red-400'
    };
    return colors[priority] || colors['NORMAL'];
  };

  const handleContractAction = (contractId: string, action: 'approve' | 'reject', reason?: string) => {
    const updatedContracts = contracts.map(contract => 
      contract.id === contractId 
        ? { 
            ...contract, 
            status: action === 'approve' ? 'APPROVED' : 'REJECTED',
            [`${action}dBy`]: 'Current Moderator',
            [`${action}dDate`]: new Date().toISOString(),
            ...(action === 'reject' && reason ? { rejectionReason: reason } : {})
          }
        : contract
    );
    setContracts(updatedContracts);
    
    toast({
      title: `Contract ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `Contract between ${contracts.find(c => c.id === contractId)?.player.firstName} and ${contracts.find(c => c.id === contractId)?.club.name} has been ${action}d.`,
    });
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = `${contract.player.firstName} ${contract.player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || contract.status === statusFilter;
    const matchesClub = clubFilter === 'ALL' || contract.club.name === clubFilter;
    return matchesSearch && matchesStatus && matchesClub;
  });

  const statusCounts = contracts.reduce((acc, contract) => {
    acc[contract.status] = (acc[contract.status] || 0) + 1;
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
              onClick={() => navigate('/moderator-dashboard')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                Contract Moderation
              </h1>
              <p className="text-muted-foreground">Review and moderate player-club contracts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.PENDING_REVIEW || 0}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Eye className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.UNDER_REVIEW || 0}</div>
              <div className="text-xs text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.APPROVED || 0}</div>
              <div className="text-xs text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <XCircle className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.REJECTED || 0}</div>
              <div className="text-xs text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.DISPUTED || 0}</div>
              <div className="text-xs text-muted-foreground">Disputed</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search Contracts</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by player, club, or game..."
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
                    <SelectItem value="PENDING_REVIEW">Pending Review</SelectItem>
                    <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="DISPUTED">Disputed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Club Filter</Label>
                <Select value={clubFilter} onValueChange={setClubFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Clubs</SelectItem>
                    <SelectItem value="Saudi Esports Elite">Saudi Esports Elite</SelectItem>
                    <SelectItem value="Desert Warriors">Desert Warriors</SelectItem>
                    <SelectItem value="Cyber Knights">Cyber Knights</SelectItem>
                    <SelectItem value="Phoenix Gaming">Phoenix Gaming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contracts List */}
        <div className="space-y-6">
          {filteredContracts.map((contract) => (
            <Card key={contract.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contract.player.avatar} alt={contract.player.firstName} />
                        <AvatarFallback>
                          {contract.player.firstName[0]}{contract.player.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contract.club.logo} alt={contract.club.name} />
                        <AvatarFallback>{contract.club.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {contract.player.firstName} {contract.player.lastName} ↔ {contract.club.name}
                        <Badge className={getStatusColor(contract.status)}>
                          {getStatusIcon(contract.status)}
                          {contract.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(contract.priority)}>
                          {contract.priority}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {contract.game} • {contract.contractDetails.type.replace('_', ' ')} • 
                        ${contract.contractDetails.monthlySalary.toLocaleString()}/month
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Submitted {new Date(contract.submittedDate).toLocaleDateString()}
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {contract.contractDetails.duration} months
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contract Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Monthly Salary</Label>
                    <div className="font-semibold">${contract.contractDetails.monthlySalary.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Signing Bonus</Label>
                    <div className="font-semibold">${contract.contractDetails.signingBonus.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Win Bonus</Label>
                    <div className="font-semibold">${contract.contractDetails.bonuses.winBonus}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Tournament Bonus</Label>
                    <div className="font-semibold">${contract.contractDetails.bonuses.tournamentBonus}</div>
                  </div>
                </div>

                {/* Concerns */}
                {contract.concerns.length > 0 && (
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-orange-400 mb-1">Review Concerns:</div>
                        <ul className="space-y-1 text-sm">
                          {contract.concerns.map((concern, index) => (
                            <li key={index} className="text-orange-300">• {concern}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedContract(contract)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Contract Review - {contract.player.firstName} {contract.player.lastName}</DialogTitle>
                          <DialogDescription>
                            Detailed contract review between {contract.player.firstName} and {contract.club.name}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Contract Details */}
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium">Player Information</Label>
                                <div className="space-y-1 text-sm mt-2">
                                  <div>{contract.player.firstName} {contract.player.lastName}</div>
                                  <div>Age: {contract.player.age}</div>
                                  <div>Current Rank: {contract.player.currentRank}</div>
                                  <div>Game: {contract.game}</div>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Club Information</Label>
                                <div className="space-y-1 text-sm mt-2">
                                  <div>{contract.club.name}</div>
                                  <div>Tier: {contract.club.tier}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium">Contract Terms</Label>
                                <div className="space-y-1 text-sm mt-2">
                                  <div>Type: {contract.contractDetails.type.replace('_', ' ')}</div>
                                  <div>Duration: {contract.contractDetails.duration} months</div>
                                  <div>Start: {new Date(contract.contractDetails.startDate).toLocaleDateString()}</div>
                                  <div>End: {new Date(contract.contractDetails.endDate).toLocaleDateString()}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Financial Details */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Financial Terms</Label>
                            <div className="grid grid-cols-4 gap-4">
                              <div className="p-3 bg-card/50 rounded-lg text-center">
                                <div className="font-bold text-lg">${contract.contractDetails.monthlySalary.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">Monthly Salary</div>
                              </div>
                              <div className="p-3 bg-card/50 rounded-lg text-center">
                                <div className="font-bold text-lg">${contract.contractDetails.signingBonus.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">Signing Bonus</div>
                              </div>
                              <div className="p-3 bg-card/50 rounded-lg text-center">
                                <div className="font-bold text-lg">${contract.contractDetails.bonuses.winBonus}</div>
                                <div className="text-xs text-muted-foreground">Win Bonus</div>
                              </div>
                              <div className="p-3 bg-card/50 rounded-lg text-center">
                                <div className="font-bold text-lg">${contract.contractDetails.bonuses.tournamentBonus}</div>
                                <div className="text-xs text-muted-foreground">Tournament Bonus</div>
                              </div>
                            </div>
                          </div>

                          {/* Benefits */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Benefits & Perks</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {contract.contractDetails.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-card/50 rounded">
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                  <span className="text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Negotiation History */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Negotiation History</Label>
                            <div className="space-y-2">
                              {contract.negotiationHistory.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-card/50 rounded">
                                  <div className="text-sm">
                                    <span className="font-medium">{entry.party}</span> - {entry.action}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {new Date(entry.date).toLocaleDateString()}
                                    {entry.amount && <span className="ml-2">${entry.amount.toLocaleString()}</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Documents */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Contract Documents</Label>
                            <div className="grid grid-cols-3 gap-3">
                              <Button variant="outline" size="sm" className="justify-start">
                                <Download className="h-4 w-4 mr-2" />
                                Contract PDF
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start">
                                <Download className="h-4 w-4 mr-2" />
                                Player Consent
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start">
                                <Download className="h-4 w-4 mr-2" />
                                Club Terms
                              </Button>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {(contract.status === 'PENDING_REVIEW' || contract.status === 'UNDER_REVIEW') && (
                            <div className="flex gap-3 pt-4 border-t">
                              <Button
                                onClick={() => handleContractAction(contract.id, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve Contract
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleContractAction(contract.id, 'reject', 'Contract terms do not meet platform guidelines')}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Contract
                              </Button>
                              <Button variant="outline">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Request Changes
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Quick Actions */}
                  {(contract.status === 'PENDING_REVIEW' || contract.status === 'UNDER_REVIEW') && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleContractAction(contract.id, 'approve')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleContractAction(contract.id, 'reject', 'Terms need revision')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Contracts Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'ALL' || clubFilter !== 'ALL' 
                  ? 'No contracts match your current filters.'
                  : 'No contracts to review at this time.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContractModeration;