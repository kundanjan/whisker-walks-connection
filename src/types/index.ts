export type UserRole = 'pet-owner' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  is_admin?: boolean;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  banned?: boolean;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'small-animal' | 'reptile' | 'other';
  breed?: string;
  age?: number;
  weight?: number;
  medicalHistory?: string;
  preferences?: string;
  photoUrl?: string;
}

export interface Provider {
  id: string;
  userId: string;
  bio: string;
  certifications: string[];
  specialties: string[];
  serviceArea: string;
  availabilityHours: {
    monday: TimeRange[];
    tuesday: TimeRange[];
    wednesday: TimeRange[];
    thursday: TimeRange[];
    friday: TimeRange[];
    saturday: TimeRange[];
    sunday: TimeRange[];
  };
  rating: number;
  reviewCount: number;
  verified: boolean;
}

export type TimeRange = {
  start: string; // HH:MM format
  end: string; // HH:MM format
};

export type ServiceType = 'walking' | 'grooming' | 'boarding' | 'training' | 'veterinary';

export interface Service {
  id: string;
  providerId: string;
  type: ServiceType;
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
  imageUrl?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'canceled';

export interface Booking {
  id: string;
  petId: string;
  providerId: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  totalCost: number;
  notes?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  providerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type ContentType = 'blog' | 'video' | 'guide';

export interface Content {
  id: string;
  type: ContentType;
  title: string;
  summary: string;
  body: string;
  authorId: string;
  imageUrl?: string;
  publishedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  organizerId: string;
  imageUrl?: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  postCount: number;
}

export interface ForumPost {
  id: string;
  topicId: string;
  userId: string;
  content: string;
  createdAt: string;
}
