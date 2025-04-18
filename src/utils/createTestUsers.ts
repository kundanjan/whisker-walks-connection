
import { supabase } from "@/integrations/supabase/client";

const testUsers = [
  {
    email: 'sarah.johnson@example.com',
    password: 'testPassword123!',
    metadata: {
      name: 'Sarah Johnson',
      role: 'provider'
    }
  },
  {
    email: 'michael.chen@example.com',
    password: 'testPassword123!',
    metadata: {
      name: 'Michael Chen',
      role: 'provider'
    }
  },
  {
    email: 'emily.parker@example.com',
    password: 'testPassword123!',
    metadata: {
      name: 'Emily Parker',
      role: 'pet-owner'
    }
  },
  {
    email: 'david.wilson@example.com',
    password: 'testPassword123!',
    metadata: {
      name: 'David Wilson',
      role: 'pet-owner'
    }
  },
  {
    email: 'maria.garcia@example.com',
    password: 'testPassword123!',
    metadata: {
      name: 'Maria Garcia',
      role: 'provider'
    }
  }
];

export async function createTestUsers() {
  console.log('Starting to create test users...');
  
  for (const user of testUsers) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: user.metadata
        }
      });

      if (error) {
        console.error(`Failed to create user ${user.email}:`, error.message);
      } else {
        console.log(`Successfully created user ${user.email}`);
      }

      // Add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Unexpected error creating user ${user.email}:`, error);
    }
  }

  console.log('Finished creating test users');
}
