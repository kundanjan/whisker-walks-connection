import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Sample data for booking status chart
const data = [
  { name: "Completed", value: 540 },
  { name: "In Progress", value: 230 },
  { name: "Cancelled", value: 120 },
  { name: "Pending", value: 310 },
];

const COLORS = ["#10b981", "#0ea5e9", "#ef4444", "#f59e0b"];

const chartConfig = {
  Completed: { color: "#10b981" },
  "In Progress": { color: "#0ea5e9" },
  Cancelled: { color: "#ef4444" },
  Pending: { color: "#f59e0b" },
};

export function BookingStatusChart() {
  return (
    <div className="h-[300px]">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
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
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}