import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Building, MapPin, DollarSign, Users, Star, Calendar, Send } from "lucide-react";

export default function ClubOffers() {
  const [showOfferForm, setShowOfferForm] = useState(false);

  const clubOffers = [
    {
      id: 1,
      clubName: "Al-Hilal Esports",
      logo: "/placeholder.svg",
      game: "Street Fighter 6",
      position: "Main Fighter",
      location: "Riyadh, Saudi Arabia",
      salary: "15,000 - 25,000 SAR/month",
      requirements: ["Grand Master rank or higher", "Tournament experience", "2+ years competitive play"],
      benefits: ["Monthly salary", "Tournament entry fees", "Gaming equipment", "Team housing"],
      description: "Join Al-Hilal's professional esports team as our main Street Fighter 6 player. We're looking for dedicated players ready to compete at the highest level.",
      posted: "2 days ago",
      applicants: 23,
      urgent: true
    },
    {
      id: 2,
      clubName: "Saudi Falcons Gaming",
      logo: "/placeholder.svg", 
      game: "Tekken 8",
      position: "Team Captain",
      location: "Jeddah, Saudi Arabia",
      salary: "20,000 - 30,000 SAR/month",
      requirements: ["Tekken King rank", "Leadership experience", "Tournament wins"],
      benefits: ["Leadership bonus", "Team management", "Strategic planning", "International tournaments"],
      description: "Lead our Tekken 8 division and guide the team to victory in national and international tournaments.",
      posted: "1 week ago",
      applicants: 15,
      urgent: false
    },
    {
      id: 3,
      clubName: "Vision 2030 Esports",
      logo: "/placeholder.svg",
      game: "Multiple Games",
      position: "Content Creator & Player",
      location: "Remote/Riyadh",
      salary: "12,000 - 18,000 SAR/month",
      requirements: ["High rank in any fighting game", "Content creation skills", "Arabic/English fluency"],
      benefits: ["Flexible schedule", "Content creation tools", "Social media support", "Brand partnerships"],
      description: "Combine your gaming skills with content creation to represent Vision 2030's esports initiative.",
      posted: "3 days ago", 
      applicants: 31,
      urgent: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">LevelUp Academy</span>
          </div>
          <Button onClick={() => setShowOfferForm(!showOfferForm)}>
            {showOfferForm ? 'View Offers' : 'Submit Club Offer'}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!showOfferForm ? (
          <>
            {/* Title Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Professional Club Offers
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover exclusive opportunities from Saudi Arabia's top esports clubs. Take your gaming career to the professional level.
              </p>
            </div>

            {/* Offers Grid */}
            <div className="space-y-6">
              {clubOffers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-6">
                      {/* Club Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={offer.logo} alt={offer.clubName} />
                            <AvatarFallback>{offer.clubName.split(' ').map(w => w[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-xl">{offer.clubName}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{offer.game}</Badge>
                              {offer.urgent && <Badge variant="destructive">Urgent</Badge>}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {offer.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Posted {offer.posted}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {offer.applicants} applicants
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <h4 className="font-bold text-lg">{offer.position}</h4>
                          <p className="text-primary font-medium">{offer.salary}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6">{offer.description}</p>

                      {/* Requirements and Benefits */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-medium mb-3">Requirements</h4>
                          <ul className="space-y-2 text-sm">
                            {offer.requirements.map((req, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Benefits</h4>
                          <ul className="space-y-2 text-sm">
                            {offer.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <Button className="flex-1">
                          Apply Now
                        </Button>
                        <Button variant="outline">
                          Learn More
                        </Button>
                        <Button variant="outline" size="icon">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom CTA */}
            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Are you a club looking for talent?</h3>
                <p className="text-muted-foreground mb-6">
                  Post your opportunities and connect with the best players from LevelUp Academy
                </p>
                <Button size="lg" onClick={() => setShowOfferForm(true)}>
                  Submit Club Offer
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Club Offer Submission Form */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Submit Club Offer</h1>
              <p className="text-muted-foreground">
                Connect with talented players from our academy by posting your club opportunities
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Club Opportunity Details</CardTitle>
                <CardDescription>
                  Provide detailed information about your club and the position you're offering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Club Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Club Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clubName">Club Name</Label>
                      <Input id="clubName" placeholder="Your club name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, Country" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="clubDescription">Club Description</Label>
                    <Textarea 
                      id="clubDescription" 
                      placeholder="Tell us about your club, achievements, and culture..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Position Details */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Position Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="game">Game</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select game" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sf6">Street Fighter 6</SelectItem>
                          <SelectItem value="tekken8">Tekken 8</SelectItem>
                          <SelectItem value="kof15">King of Fighters XV</SelectItem>
                          <SelectItem value="ggst">Guilty Gear Strive</SelectItem>
                          <SelectItem value="multiple">Multiple Games</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="position">Position Title</Label>
                      <Input id="position" placeholder="e.g., Main Fighter, Team Captain" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salaryMin">Minimum Salary (SAR/month)</Label>
                      <Input id="salaryMin" type="number" placeholder="15000" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="salaryMax">Maximum Salary (SAR/month)</Label>
                      <Input id="salaryMax" type="number" placeholder="25000" className="mt-1" />
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Requirements</h3>
                  <Textarea 
                    placeholder="List the requirements for this position (rank, experience, skills, etc.)"
                    rows={4}
                  />
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Benefits & Perks</h3>
                  <Textarea 
                    placeholder="What benefits and perks do you offer? (equipment, housing, travel, etc.)"
                    rows={4}
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Name</Label>
                      <Input id="contactName" placeholder="Your name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input id="contactEmail" type="email" placeholder="your@email.com" className="mt-1" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <Button className="flex-1" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Offer
                  </Button>
                  <Button variant="outline" onClick={() => setShowOfferForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}