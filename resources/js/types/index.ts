import { LucideIcon } from 'lucide-react';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles: Role[];
  [key: string]: unknown; // This allows for additional properties...
}

interface Role {
  id: number;
  name: Roles;
  guard_name: string;
  created_at: string;
  updated_at: string;
  permissions: PermissionCollection;
  pivot: {
    model_id: number;
    model_type: string;
    role_id: number;
  };
}

export enum Roles {
  Admin = 'admin',
  User = 'user',
}

export interface Smartphone {
  id: number;
  brand: string;
  model: string;
  price: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface SmartphoneFull extends Smartphone {
  images: Image[];
  specifications: Specification[];
}

export interface Specification {
  id: number;
  smartphone_id: number;
  spec_key: 'screen_size' | 'battery_capacity' | 'ram' | 'storage' | 'processor' | 'os' | 'weight' | 'camera';
  spec_value: string;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: number;
  image_path: string;
  smartphone_id: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  status: 'processing' | 'delivery' | 'arrived' | 'cart';
  total: number;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  count: number;
  price: number;
  created_at: string;
  updated_at: string;
  product: SmartphoneFull;
}

export interface Review {
  id: number;
  user_id: number;
  smartphone_id: number;
  text: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewFull extends Review {
  user: User;
}

type PermissionPivot = {
  role_id: number;
  permission_id: number;
};

type Permission = {
  id: number;
  name: 'edit-database';
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: PermissionPivot;
};

export type PermissionCollection = Permission[];
