import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { createTestUsers } from "@/utils/createTestUsers";

const AdminDashboard = () => {
  const { toast } = useToast();

  const handleCreateTestUsers = async () => {
    try {
      await createTestUsers();
      toast({
        title: "Test users created",
        description: "Check the console for details about created users",
      });
    } catch (error) {
      console.error('Error creating test users:', error);
      toast({
        title: "Error creating test users",
        description: "Check the console for details",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-8">
        <Button onClick={handleCreateTestUsers} variant="outline">
          Create Test Users
        </Button>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
        <UsersManagement />
      </section>
    </div>
  );
};

export default AdminDashboard;
