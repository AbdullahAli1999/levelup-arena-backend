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
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  FileText, 
  DollarSign, 
  Calendar, 
  Clock, 
  Building, 
  Star, 
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  Send,
  Plus
} from 'lucide-react';

const ProContracts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contractData, setContractData] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);

  // Mock data
  const mockContractData = {
    activeContracts: [
      {
        id: '1',
        clubName: 'Saudi Esports Elite',
        clubLogo: '/placeholder.svg',
        contractType: 'FULL_TIME',
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        monthlySalary: 8250,
        bonuses: {
          winBonus: 500,
          tournamentBonus: 2000,
          streamingBonus: 300
        },
        status: 'ACTIVE',
        game: 'Valorant',
        responsibilities: [
          'Participate in weekly training sessions',
          'Compete in official tournaments',
          'Stream minimum 20 hours per month',
          'Attend team meetings and strategy sessions'
        ],
        benefits: [
          'Health insurance coverage',
          'Gaming equipment provided',
          'Travel expenses for tournaments',
          'Performance bonuses'
        ]
      }
    ],
    pendingOffers: [
      {
        id: '2',
        clubName: 'Desert Warriors',
        clubLogo: '/placeholder.svg',
        contractType: 'PART_TIME',
        startDate: '2024-04-01',
        endDate: '2024-12-31',
        monthlySalary: 5500,
        bonuses: {
          winBonus: 300,
          tournamentBonus: 1500
        },
        status: 'PENDING',
        game: 'Fortnite',
        offerExpiry: '2024-03-30',
        description: 'Join our competitive Fortnite team for the upcoming MENA championships.',
        requirements: [
          'Minimum 4.0 K/D ratio',
          'Available for evening practices',
          'Tournament experience required'
        ]
      },
      {
        id: '3',
        clubName: 'Cyber Knights',
        clubLogo: '/placeholder.svg',
        contractType: 'TOURNAMENT_ONLY',
        startDate: '2024-03-25',
        endDate: '2024-06-25',
        monthlySalary: 3000,
        bonuses: {
          winBonus: 1000,
          tournamentBonus: 5000
        },
        status: 'PENDING',
        game: 'CS2',
        offerExpiry: '2024-03-28',
        description: 'Special contract for summer tournament season.'
      }
    ],
    expiredContracts: [
      {
        id: '4',
        clubName: 'Phoenix Gaming',
        contractType: 'PART_TIME',
        startDate: '2023-06-01',
        endDate: '2023-12-31',
        monthlySalary: 4000,
        status: 'EXPIRED',
        game: 'Valorant',
        totalEarnings: 28000
      }
    ],
    sponsorshipDeals: [
      {
        id: '1',
        sponsor: 'GamerGear Pro',
        type: 'EQUIPMENT',
        value: 2000,
        duration: '12 months',
        status: 'ACTIVE',
        requirements: ['Use branded equipment in streams', 'Social media mentions']
      },
      {
        id: '2',
        sponsor: 'Energy Drink X',
        type: 'ENDORSEMENT',
        value: 1500,
        duration: '6 months',
        status: 'ACTIVE',
        requirements: ['Product placement in content', '2 posts per month']
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setContractData(mockContractData);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'ACTIVE': 'bg-green-500/10 text-green-400 border-green-500/20',
      'PENDING': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'EXPIRED': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      'REJECTED': 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[status] || colors['PENDING'];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'ACTIVE': <CheckCircle className="h-4 w-4" />,
      'PENDING': <AlertCircle className="h-4 w-4" />,
      'EXPIRED': <Clock className="h-4 w-4" />,
      'REJECTED': <XCircle className="h-4 w-4" />
    };
    return icons[status] || icons['PENDING'];
  };

  const handleContractAction = (contractId: string, action: string) => {
    toast({
      title: `Contract ${action}`,
      description: `Contract action "${action}" has been processed successfully.`,
    });
  };

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
              onClick={() => navigate('/pro-dashboard')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                Contract Management
              </h1>
              <p className="text-muted-foreground">Manage your professional gaming contracts and offers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Contracts</TabsTrigger>
            <TabsTrigger value="offers">
              Pending Offers
              {contractData.pendingOffers.length > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {contractData.pendingOffers.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="sponsorships">Sponsorships</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Active Contracts */}
          <TabsContent value="active" className="space-y-6">
            {contractData.activeContracts.length > 0 ? (
              contractData.activeContracts.map((contract) => (
                <Card key={contract.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={contract.clubLogo} alt={contract.clubName} />
                          <AvatarFallback>{contract.clubName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {contract.clubName}
                            <Badge className={getStatusColor(contract.status)}>
                              {getStatusIcon(contract.status)}
                              {contract.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {contract.contractType.replace('_', ' ')} • {contract.game}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${contract.monthlySalary.toLocaleString()}/mo
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Until {new Date(contract.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <Label className="text-sm text-muted-foreground">Win Bonus</Label>
                        <div className="font-semibold">${contract.bonuses.winBonus}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm text-muted-foreground">Tournament Bonus</Label>
                        <div className="font-semibold">${contract.bonuses.tournamentBonus}</div>
                      </div>
                      {contract.bonuses.streamingBonus && (
                        <div className="space-y-1">
                          <Label className="text-sm text-muted-foreground">Streaming Bonus</Label>
                          <div className="font-semibold">${contract.bonuses.streamingBonus}</div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label className="text-sm text-muted-foreground">Contract Duration</Label>
                        <div className="font-semibold">
                          {Math.round((new Date(contract.endDate).getTime() - new Date(contract.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium">Responsibilities</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {contract.responsibilities.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Benefits</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {contract.benefits.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No Active Contracts</h3>
                  <p className="text-muted-foreground">You don't have any active contracts at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Pending Offers */}
          <TabsContent value="offers" className="space-y-6">
            {contractData.pendingOffers.map((offer) => (
              <Card key={offer.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={offer.clubLogo} alt={offer.clubName} />
                        <AvatarFallback>{offer.clubName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {offer.clubName}
                          <Badge className={getStatusColor(offer.status)}>
                            {getStatusIcon(offer.status)}
                            {offer.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {offer.contractType.replace('_', ' ')} • {offer.game}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${offer.monthlySalary.toLocaleString()}/mo
                      </div>
                      <div className="text-sm text-red-400">
                        Expires {new Date(offer.offerExpiry).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{offer.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">Duration</Label>
                      <div className="font-semibold">
                        {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">Win Bonus</Label>
                      <div className="font-semibold">${offer.bonuses.winBonus}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">Tournament Bonus</Label>
                      <div className="font-semibold">${offer.bonuses.tournamentBonus}</div>
                    </div>
                  </div>

                  {offer.requirements && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Requirements</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {offer.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleContractAction(offer.id, 'accept')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Offer
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleContractAction(offer.id, 'reject')}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                    <Button variant="outline">
                      <Send className="h-4 w-4 mr-2" />
                      Negotiate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Sponsorships */}
          <TabsContent value="sponsorships" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contractData.sponsorshipDeals.map((deal) => (
                <Card key={deal.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      {deal.sponsor}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge className={getStatusColor(deal.status)}>
                        {deal.status}
                      </Badge>
                      <span>{deal.type}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Value</span>
                      <span className="font-bold text-primary">${deal.value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{deal.duration}</span>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium">Requirements</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {deal.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-6">
            {contractData.expiredContracts.map((contract) => (
              <Card key={contract.id} className="border-border/50 bg-card/50 backdrop-blur-sm opacity-75">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {contract.clubName}
                        <Badge className={getStatusColor(contract.status)}>
                          {getStatusIcon(contract.status)}
                          {contract.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {contract.contractType.replace('_', ' ')} • {contract.game}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-muted-foreground">
                        ${contract.totalEarnings?.toLocaleString() || 'N/A'}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Earned</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>${contract.monthlySalary.toLocaleString()}/month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProContracts;