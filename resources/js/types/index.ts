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
    [key: string]: unknown; // This allows for additional properties...
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
