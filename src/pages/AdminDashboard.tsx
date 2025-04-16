
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">User Management</h2>
              <UsersManagement />
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
}
