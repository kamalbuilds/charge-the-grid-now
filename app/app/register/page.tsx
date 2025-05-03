"use client";
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const RegisterPage = () => {
  const [chargerType, setChargerType] = useState('');
  const [power, setPower] = useState('');
  const [connector, setConnector] = useState('');
  const [isRenewable, setIsRenewable] = useState(false);
  const [price, setPrice] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressZip, setAddressZip] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would trigger an API call to register the charger
    console.log('Registering charger...');
    
    toast({
      title: "Registration Submitted",
      description: "Your charger registration has been received! We'll verify your details shortly.",
    });
  };

  const nextStep = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container py-12">
        <h1 className="mb-2">Register Your <span className="gradient-text">Charger</span></h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Join our decentralized network by registering your EV charger. Start earning passive income while helping expand the charging infrastructure.
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${activeStep >= 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  activeStep >= 0 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>1</div>
                <span className="ml-2">Charger Details</span>
              </div>
              <div className="h-0.5 flex-1 mx-4 bg-muted"></div>
              <div className={`flex items-center ${activeStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  activeStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>2</div>
                <span className="ml-2">Location</span>
              </div>
              <div className="h-0.5 flex-1 mx-4 bg-muted"></div>
              <div className={`flex items-center ${activeStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  activeStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>3</div>
                <span className="ml-2">Pricing & Availability</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {activeStep === 0 && "Charger Specifications"}
                {activeStep === 1 && "Location Details"}
                {activeStep === 2 && "Pricing & Availability"}
              </CardTitle>
              <CardDescription>
                {activeStep === 0 && "Provide technical details about your charging station"}
                {activeStep === 1 && "Where is your charger located?"}
                {activeStep === 2 && "Set your pricing and availability preferences"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                {activeStep === 0 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="charger-type">Charger Type</Label>
                      <Select value={chargerType} onValueChange={setChargerType}>
                        <SelectTrigger id="charger-type">
                          <SelectValue placeholder="Select charger type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="level1">Level 1 (120V)</SelectItem>
                          <SelectItem value="level2">Level 2 (240V)</SelectItem>
                          <SelectItem value="dcfc">DC Fast Charging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="power">Power Output (kW)</Label>
                      <Select value={power} onValueChange={setPower}>
                        <SelectTrigger id="power">
                          <SelectValue placeholder="Select power output" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.4">1.4 kW (Level 1)</SelectItem>
                          <SelectItem value="3.3">3.3 kW (16A)</SelectItem>
                          <SelectItem value="7.2">7.2 kW (32A)</SelectItem>
                          <SelectItem value="11">11 kW (3-phase 16A)</SelectItem>
                          <SelectItem value="22">22 kW (3-phase 32A)</SelectItem>
                          <SelectItem value="50">50 kW (DC Fast)</SelectItem>
                          <SelectItem value="150">150 kW (DC Fast)</SelectItem>
                          <SelectItem value="350">350 kW (DC Fast)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="connector">Connector Type</Label>
                      <Select value={connector} onValueChange={setConnector}>
                        <SelectTrigger id="connector">
                          <SelectValue placeholder="Select connector type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="j1772">J1772 (Type 1)</SelectItem>
                          <SelectItem value="type2">Type 2 (Mennekes)</SelectItem>
                          <SelectItem value="chademo">CHAdeMO</SelectItem>
                          <SelectItem value="ccs1">CCS Combo 1</SelectItem>
                          <SelectItem value="ccs2">CCS Combo 2</SelectItem>
                          <SelectItem value="tesla">Tesla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="renewable" 
                        checked={isRenewable} 
                        onCheckedChange={(checked) => setIsRenewable(checked as boolean)} 
                      />
                      <Label htmlFor="renewable" className="text-sm">
                        This charger uses renewable energy (solar, wind, etc.)
                      </Label>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Additional Details</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide any additional details about your charger..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {activeStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        placeholder="123 Main St"
                        value={addressStreet}
                        onChange={(e) => setAddressStreet(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Miami"
                          value={addressCity}
                          onChange={(e) => setAddressCity(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          placeholder="FL"
                          value={addressState}
                          onChange={(e) => setAddressState(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="zip">Postal/Zip Code</Label>
                      <Input
                        id="zip"
                        placeholder="33101"
                        value={addressZip}
                        onChange={(e) => setAddressZip(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="block mb-2">Verify Location on Map</Label>
                      <div className="bg-muted h-[200px] rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Map verification will appear here</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="price">Price per kWh ($CHARGE tokens)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.05"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Suggested price: 0.03-0.08 $CHARGE/kWh based on your location and charger type
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="availability">Availability Hours</Label>
                      <Select value={availability} onValueChange={setAvailability}>
                        <SelectTrigger id="availability">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24-7">24/7 Access</SelectItem>
                          <SelectItem value="daytime">Daytime Only (8AM-8PM)</SelectItem>
                          <SelectItem value="business">Business Hours (9AM-5PM)</SelectItem>
                          <SelectItem value="custom">Custom Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="text-base font-medium mb-2">Earnings Estimator</h4>
                      <Tabs defaultValue="low">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="low">Low Usage</TabsTrigger>
                          <TabsTrigger value="medium">Medium Usage</TabsTrigger>
                          <TabsTrigger value="high">High Usage</TabsTrigger>
                        </TabsList>
                        <TabsContent value="low" className="p-4 bg-muted/50 rounded-lg mt-2">
                          <p className="mb-1">2 sessions/week × 20 kWh avg</p>
                          <p className="text-xl font-bold text-primary">~40 $WATT/month</p>
                        </TabsContent>
                        <TabsContent value="medium" className="p-4 bg-muted/50 rounded-lg mt-2">
                          <p className="mb-1">5 sessions/week × 25 kWh avg</p>
                          <p className="text-xl font-bold text-primary">~125 $WATT/month</p>
                        </TabsContent>
                        <TabsContent value="high" className="p-4 bg-muted/50 rounded-lg mt-2">
                          <p className="mb-1">12 sessions/week × 30 kWh avg</p>
                          <p className="text-xl font-bold text-primary">~360 $WATT/month</p>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              {activeStep < 2 ? (
                <Button onClick={nextStep}>Continue</Button>
              ) : (
                <Button className="bg-gradient-primary button-glow" onClick={handleSubmit}>
                  Register Charger
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default RegisterPage;
