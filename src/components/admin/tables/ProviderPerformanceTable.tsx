
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data for provider performance
const providerData = [
  { id: 1, name: "Emma Johnson", rating: 4.9, bookings: 128, revenue: 6240, status: "active" },
  { id: 2, name: "Michael Smith", rating: 4.7, bookings: 95, revenue: 4560, status: "active" },
  { id: 3, name: "Sophia Williams", rating: 4.8, bookings: 112, revenue: 5376, status: "active" },
  { id: 4, name: "James Brown", rating: 4.5, bookings: 78, revenue: 3744, status: "inactive" },
  { id: 5, name: "Olivia Davis", rating: 4.6, bookings: 86, revenue: 4128, status: "active" },
];

export function ProviderPerformanceTable() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Provider</TableHead>
            <TableHead className="text-right">Rating</TableHead>
            <TableHead className="text-right">Bookings</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providerData.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell className="font-medium">{provider.name}</TableCell>
              <TableCell className="text-right">{provider.rating}</TableCell>
              <TableCell className="text-right">{provider.bookings}</TableCell>
              <TableCell className="text-right">${provider.revenue}</TableCell>
              <TableCell>
                <Badge variant={provider.status === "active" ? "default" : "destructive"}>
                  {provider.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
