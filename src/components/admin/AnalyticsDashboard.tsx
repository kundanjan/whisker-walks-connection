
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsStats } from "@/services/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueChart } from "./charts/RevenueChart";
import { UserGrowthChart } from "./charts/UserGrowthChart";
import { BookingStatusChart } from "./charts/BookingStatusChart";
import { ProviderPerformanceTable } from "./tables/ProviderPerformanceTable";
import { CalendarRange, BarChart2, Users, Activity, ArrowUpRight } from "lucide-react";

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<"weekly" | "monthly" | "yearly">("monthly");
  const { data: stats } = useQuery({
    queryKey: ['analytics-stats'],
    queryFn: fetchAnalyticsStats
  });

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CalendarRange className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalBookings || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                8% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeProviders || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                5% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.totalRevenue || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                18% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="providers">Provider Performance</TabsTrigger>
        </TabsList>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-7 lg:col-span-5">
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <TabsContent value="revenue" className="mt-0">
                <RevenueChart />
              </TabsContent>
              
              <TabsContent value="users" className="mt-0">
                <UserGrowthChart />
              </TabsContent>
              
              <TabsContent value="bookings" className="mt-0">
                <BookingStatusChart />
              </TabsContent>
              
              <TabsContent value="providers" className="mt-0">
                <ProviderPerformanceTable />
              </TabsContent>
            </CardContent>
          </Card>
          
          <div className="col-span-7 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <span className="text-sm font-medium">5.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Booking Value</span>
                    <span className="text-sm font-medium">$48.20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Top Service</span>
                    <span className="text-sm font-medium">Dog Walking</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Retention Rate</span>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
