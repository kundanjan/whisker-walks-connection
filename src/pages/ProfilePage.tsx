
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserCircle } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  
  const { data: profile, isLoading } = useQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar || undefined} />
            <AvatarFallback>
              <UserCircle className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{profile.name}</CardTitle>
            <Badge variant="outline" className="mt-2">
              {profile.role}
            </Badge>
            {profile.is_admin && (
              <Badge variant="destructive" className="ml-2">
                Admin
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p>{profile.email}</p>
          </div>
          {profile.phone && (
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p>{profile.phone}</p>
            </div>
          )}
          {profile.address && (
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p>{profile.address}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Member since</p>
            <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
