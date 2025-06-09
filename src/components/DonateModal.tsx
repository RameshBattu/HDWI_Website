
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Building, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonateModal = ({ isOpen, onClose }: DonateModalProps) => {
  const [activeTab, setActiveTab] = useState("individual");
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pan: "",
    companyName: "",
    contactPerson: "",
    phone: "",
    sector: "",
    message: ""
  });
  const { toast } = useToast();

  const fixedAmounts = ["500", "1000", "2500", "5000"];

  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setDonationAmount("");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === "individual") {
      if (!formData.name || !formData.email) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      if (!validateEmail(formData.email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
      
      const amount = customAmount || donationAmount;
      if (!amount || parseInt(amount) < 100) {
        toast({
          title: "Error",
          description: "Please select or enter a valid donation amount (minimum ₹100).",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      if (!validateEmail(formData.email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "Thank you!",
      description: activeTab === "individual" 
        ? "Your donation request has been submitted. You will be redirected to the payment gateway."
        : "Your CSR partnership request has been submitted. We will contact you within 2 business days.",
    });
    
    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      pan: "",
      companyName: "",
      contactPerson: "",
      phone: "",
      sector: "",
      message: ""
    });
    setDonationAmount("");
    setCustomAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Heart className="h-6 w-6 text-pink-600 mr-2" />
            Support Our Mission
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Individual
            </TabsTrigger>
            <TabsTrigger value="corporate" className="flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Corporate
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Make a Donation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">Select Amount</Label>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {fixedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={donationAmount === amount ? "default" : "outline"}
                          className={`h-12 ${donationAmount === amount ? 'bg-pink-600 hover:bg-pink-700' : 'border-pink-200 text-pink-700 hover:bg-pink-50'}`}
                          onClick={() => handleAmountSelect(amount)}
                        >
                          ₹{amount}
                        </Button>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="customAmount" className="text-sm text-gray-600">Custom Amount</Label>
                      <Input
                        id="customAmount"
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className="mt-1"
                        min="100"
                      />
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="pan">PAN (Optional - for 80G certificate)</Label>
                    <Input
                      id="pan"
                      value={formData.pan}
                      onChange={(e) => setFormData({...formData, pan: e.target.value})}
                      placeholder="ABCDE1234F"
                    />
                  </div>

                  {/* Tax Exemption Info */}
                  <div className="bg-green-50 p-4 rounded-lg flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">80G Tax Exemption</div>
                      <div className="text-sm text-green-700">
                        Your donation is eligible for tax deduction under Section 80G of the Income Tax Act.
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white h-12">
                    Proceed to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="corporate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Strategic CSR for Real Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="corporateEmail">Email *</Label>
                      <Input
                        id="corporateEmail"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="sector">Sector Focus</Label>
                    <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select focus area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="skills">Skills Development</SelectItem>
                        <SelectItem value="inclusion">Social Inclusion</SelectItem>
                        <SelectItem value="multiple">Multiple Areas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your CSR objectives..."
                      rows={3}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700 text-white h-12">
                      Submit Partnership Request
                    </Button>
                    <Button type="button" variant="outline" className="flex-1 border-pink-200 text-pink-700 hover:bg-pink-50 h-12">
                      Download Pitch Deck
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DonateModal;
