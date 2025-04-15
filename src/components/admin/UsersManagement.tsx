
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, banUser, unbanUser } from '@/services/adminApi';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { User } from '@/types';

export function UsersManagement() {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const banMutation = useMutation({
    mutationFn: banUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User banned successfully",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to ban user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const unbanMutation = useMutation({
    mutationFn: unbanUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User unbanned successfully",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to unban user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.banned ? 'Banned' : 'Active'}</TableCell>
              <TableCell>
                {user.banned ? (
                  <Button
                    variant="outline"
                    onClick={() => unbanMutation.mutate(user.id)}
                    disabled={unbanMutation.isPending}
                  >
                    Unban User
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={() => banMutation.mutate(user.id)}
                    disabled={banMutation.isPending}
                  >
                    Ban User
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
