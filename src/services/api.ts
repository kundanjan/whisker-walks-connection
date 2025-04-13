
import { supabase } from "@/integrations/supabase/client";
import { 
  Pet, Provider, Service, Booking, Review,
  User
} from "@/types";

// User API
export async function fetchCurrentUser(): Promise<User | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  if (!profile) return null;
  
  return {
    id: profile.id,
    email: session.user.email || '',
    name: profile.name,
    role: profile.role as any,
    avatar: null, // Default as null since we don't have this field yet
    phone: null, // Default as null since we don't have this field yet
    address: null, // Default as null since we don't have this field yet
    createdAt: profile.created_at
  };
}

export async function fetchUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  
  return data.map(profile => ({
    id: profile.id,
    email: '',  // Email not exposed in profiles table for privacy
    name: profile.name,
    role: profile.role as any,
    avatar: null, // Default as null since we don't have this field yet
    phone: null, // Default as null since we don't have this field yet
    address: null, // Default as null since we don't have this field yet
    createdAt: profile.created_at
  }));
}

// Pets API
export async function fetchPets(): Promise<Pet[]> {
  // We should use a more manual approach to avoid type issues with Supabase
  const { data, error } = await supabase
    .from('pets')
    .select('*');
  
  if (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
  
  return data.map((pet: any) => ({
    id: pet.id,
    ownerId: pet.owner_id,
    name: pet.name,
    type: pet.type as any,
    breed: pet.breed,
    age: pet.age,
    weight: pet.weight,
    medicalHistory: pet.medical_history,
    preferences: pet.preferences,
    photoUrl: pet.photo_url
  }));
}

// Providers API
export async function fetchProviders(): Promise<Provider[]> {
  const { data, error } = await supabase
    .from('providers')
    .select('*');
  
  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
  
  return data.map((provider: any) => ({
    id: provider.id,
    userId: provider.user_id,
    bio: provider.bio,
    certifications: provider.certifications,
    specialties: provider.specialties,
    serviceArea: provider.service_area,
    availabilityHours: provider.availability_hours,
    rating: provider.rating,
    reviewCount: provider.review_count,
    verified: provider.verified
  }));
}

export async function fetchProviderById(id: string): Promise<Provider | null> {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching provider ${id}:`, error);
    return null;
  }
  
  return {
    id: data.id,
    userId: data.user_id,
    bio: data.bio,
    certifications: data.certifications,
    specialties: data.specialties,
    serviceArea: data.service_area,
    availabilityHours: data.availability_hours,
    rating: data.rating,
    reviewCount: data.review_count,
    verified: data.verified
  };
}

// Services API
export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*');
  
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data.map((service: any) => ({
    id: service.id,
    providerId: service.provider_id,
    type: service.type as any,
    title: service.title,
    description: service.description,
    price: service.price,
    duration: service.duration,
    imageUrl: service.image_url
  }));
}

export async function fetchServicesByProviderId(providerId: string): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('provider_id', providerId);
  
  if (error) {
    console.error(`Error fetching services for provider ${providerId}:`, error);
    return [];
  }
  
  return data.map((service: any) => ({
    id: service.id,
    providerId: service.provider_id,
    type: service.type as any,
    title: service.title,
    description: service.description,
    price: service.price,
    duration: service.duration,
    imageUrl: service.image_url
  }));
}

// Bookings API
export async function fetchBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*');
  
  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
  
  return data.map((booking: any) => ({
    id: booking.id,
    petId: booking.pet_id,
    providerId: booking.provider_id,
    serviceId: booking.service_id,
    startTime: booking.start_time,
    endTime: booking.end_time,
    status: booking.status as any,
    totalCost: booking.total_cost,
    notes: booking.notes
  }));
}

// Reviews API
export async function fetchReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*');
  
  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  
  return data.map((review: any) => ({
    id: review.id,
    bookingId: review.booking_id,
    userId: review.user_id,
    providerId: review.provider_id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.created_at
  }));
}

export async function fetchReviewsByProviderId(providerId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('provider_id', providerId);
  
  if (error) {
    console.error(`Error fetching reviews for provider ${providerId}:`, error);
    return [];
  }
  
  return data.map((review: any) => ({
    id: review.id,
    bookingId: review.booking_id,
    userId: review.user_id,
    providerId: review.provider_id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.created_at
  }));
}
