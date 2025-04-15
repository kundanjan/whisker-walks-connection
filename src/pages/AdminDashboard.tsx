
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AnalyticsStats } from "@/components/admin/AnalyticsStats";
import { UsersManagement } from "@/components/admin/UsersManagement";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
            <AnalyticsStats />
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <UsersManagement />
          </section>
        </div>
      </div>
    </AdminGuard>
  );
}
