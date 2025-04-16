
import { useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

// Sample data for user growth chart
const data = {
  weekly: [
    { name: "Mon", users: 10, providers: 2 },
    { name: "Tue", users: 15, providers: 3 },
    { name: "Wed", users: 12, providers: 2 },
    { name: "Thu", users: 18, providers: 4 },
    { name: "Fri", users: 22, providers: 5 },
    { name: "Sat", users: 25, providers: 4 },
    { name: "Sun", users: 20, providers: 3 },
  ],
  monthly: [
    { name: "Jan", users: 50, providers: 10 },
    { name: "Feb", users: 80, providers: 15 },
    { name: "Mar", users: 120, providers: 22 },
    { name: "Apr", users: 150, providers: 28 },
    { name: "May", users: 200, providers: 35 },
    { name: "Jun", users: 250, providers: 42 },
    { name: "Jul", users: 300, providers: 50 },
    { name: "Aug", users: 350, providers: 58 },
    { name: "Sep", users: 400, providers: 65 },
    { name: "Oct", users: 450, providers: 72 },
    { name: "Nov", users: 500, providers: 80 },
    { name: "Dec", users: 550, providers: 88 },
  ],
  yearly: [
    { name: "2021", users: 500, providers: 50 },
    { name: "2022", users: 1200, providers: 120 },
    { name: "2023", users: 2300, providers: 230 },
    { name: "2024", users: 3800, providers: 380 },
    { name: "2025", users: 4500, providers: 450 },
  ],
};

const chartConfig = {
  users: { color: "#0ea5e9" }, // Blue
  providers: { color: "#f97316" }, // Orange
};

export function UserGrowthChart() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">("monthly");

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button 
          variant={timeframe === "weekly" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setTimeframe("weekly")}
        >
          Weekly
        </Button>
        <Button 
          variant={timeframe === "monthly" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setTimeframe("monthly")}
        >
          Monthly
        </Button>
        <Button 
          variant={timeframe === "yearly" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setTimeframe("yearly")}
        >
          Yearly
        </Button>
      </div>
      <div className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data[timeframe]} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent
                        className="bg-background shadow-xl"
                        indicator="dot"
                        payload={payload}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#0ea5e9" 
                activeDot={{ r: 8 }}
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="providers" 
                stroke="#f97316" 
                activeDot={{ r: 6 }}
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
