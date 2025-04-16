
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard, DollarSign, Shield, Truck } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const mockBookingDetails = {
    service: "Dog Walking",
    provider: "Emma Johnson",
    date: "April 18, 2025",
    time: "3:00 PM - 4:00 PM",
    price: 49.99,
    serviceFee: 3.99,
    total: 53.98,
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment successful!",
        description: "Your booking has been confirmed.",
        variant: "default",
      });
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <Card className="md:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span>{mockBookingDetails.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span>{mockBookingDetails.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{mockBookingDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span>{mockBookingDetails.time}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${mockBookingDetails.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee:</span>
                  <span>${mockBookingDetails.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-2">
                  <span>Total:</span>
                  <span>${mockBookingDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Complete your booking by providing payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPayment}>
                <div className="space-y-6">
                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <RadioGroup defaultValue="credit-card" onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Label
                        htmlFor="credit-card"
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                          paymentMethod === "credit-card" ? "border-brand-teal bg-brand-teal/5" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <span>Credit Card</span>
                        </div>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                      </Label>
                      
                      <Label
                        htmlFor="paypal"
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                          paymentMethod === "paypal" ? "border-brand-teal bg-brand-teal/5" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <span>PayPal</span>
                        </div>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </Label>
                    </RadioGroup>
                  </div>
                  
                  {/* Credit Card Details */}
                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input id="card-name" placeholder="John Doe" required className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required className="mt-1" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* PayPal Details */}
                  {paymentMethod === "paypal" && (
                    <div className="p-6 text-center border rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-600 mb-4">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                      <Button type="button" variant="outline" className="w-full">
                        Continue to PayPal
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-8" disabled={loading}>
                  {loading ? "Processing..." : "Complete Payment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
