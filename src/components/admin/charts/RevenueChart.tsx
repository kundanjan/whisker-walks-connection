
import { useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

// Sample data for revenue chart
const data = {
  weekly: [
    { name: "Mon", revenue: 800 },
    { name: "Tue", revenue: 1200 },
    { name: "Wed", revenue: 1100 },
    { name: "Thu", revenue: 1500 },
    { name: "Fri", revenue: 2100 },
    { name: "Sat", revenue: 1800 },
    { name: "Sun", revenue: 1400 },
  ],
  monthly: [
    { name: "Jan", revenue: 4800 },
    { name: "Feb", revenue: 5200 },
    { name: "Mar", revenue: 4100 },
    { name: "Apr", revenue: 5500 },
    { name: "May", revenue: 6100 },
    { name: "Jun", revenue: 7800 },
    { name: "Jul", revenue: 8400 },
    { name: "Aug", revenue: 7900 },
    { name: "Sep", revenue: 8600 },
    { name: "Oct", revenue: 9100 },
    { name: "Nov", revenue: 8800 },
    { name: "Dec", revenue: 10400 },
  ],
  yearly: [
    { name: "2021", revenue: 45800 },
    { name: "2022", revenue: 65200 },
    { name: "2023", revenue: 84100 },
    { name: "2024", revenue: 95500 },
    { name: "2025", revenue: 121000 },
  ],
};

const chartConfig = {
  revenue: { color: "#8b5cf6" },
};

export function RevenueChart() {
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
            <AreaChart data={data[timeframe]} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent
                        className="bg-background shadow-xl"
                        indicator="dot"
                        formatter={(value) => `$${value}`}
                        payload={payload}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
