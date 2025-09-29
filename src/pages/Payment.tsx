import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CreditCard, Shield, Trophy, CheckCircle } from "lucide-react";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  const orderSummary = {
    game: "Street Fighter 6",
    trainer: "Ahmed Al-Rashid",
    package: "Pro Training Package",
    duration: "3 months",
    sessions: 12,
    pricePerHour: 250,
    totalHours: 24,
    subtotal: 6000,
    discount: 600,
    total: 5400
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/trainer-selection')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Trainers
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">LevelUp Academy</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Step 4 of 4
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Complete Your Payment
            </h1>
            <p className="text-lg text-muted-foreground">
              Secure your spot and start your journey to becoming a pro player
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>
                  Choose your payment method and enter your details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="stc" id="stc" />
                      <Label htmlFor="stc" className="cursor-pointer">STC Pay</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="mada" id="mada" />
                      <Label htmlFor="mada" className="cursor-pointer">Mada</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input 
                        id="cardName" 
                        placeholder="Full name as on card"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Review your training package details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Package Details */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Game</span>
                    <span>{orderSummary.game}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Trainer</span>
                    <span>{orderSummary.trainer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Package</span>
                    <Badge variant="secondary">{orderSummary.package}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Duration</span>
                    <span>{orderSummary.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sessions</span>
                    <span>{orderSummary.sessions} sessions</span>
                  </div>
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Training Hours ({orderSummary.totalHours}h)</span>
                    <span>{orderSummary.subtotal} SAR</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Package Discount (10%)</span>
                    <span>-{orderSummary.discount} SAR</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{orderSummary.total} SAR</span>
                  </div>
                </div>

                {/* What's Included */}
                <div className="space-y-2">
                  <h4 className="font-medium">What's Included:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      24 hours of 1-on-1 training
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Personalized training plan
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Access to Discord community
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Performance analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Tournament preparation
                    </li>
                  </ul>
                </div>

                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => navigate('/player-dashboard')}
                >
                  Complete Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}