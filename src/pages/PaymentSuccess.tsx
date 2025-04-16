
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  
  // Mock data for the booking confirmation
  const bookingDetails = {
    id: "BK-" + Math.floor(100000 + Math.random() * 900000),
    service: "Dog Walking",
    provider: "Emma Johnson",
    date: "April 18, 2025",
    time: "3:00 PM - 4:00 PM",
    total: "$53.98",
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your booking. A confirmation has been sent to your email.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Booking Confirmation</CardTitle>
            <CardDescription>Booking #{bookingDetails.id}</CardDescription>
          </CardHeader>
          <CardContent className="text-left space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">Service:</span>
              <span>{bookingDetails.service}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">Provider:</span>
              <span>{bookingDetails.provider}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">Date:</span>
              <span>{bookingDetails.date}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">Time:</span>
              <span>{bookingDetails.time}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">Total Paid:</span>
              <span>{bookingDetails.total}</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button className="w-full" onClick={() => navigate("/")}>
              Return Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
