export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'client' | 'supplier';
  company?: string;
  createdAt: any;
}

export interface Site {
  id: string;
  name: string;
  address: string;
  managerId: string;
  status: 'active' | 'completed';
  createdAt: any;
}

export interface Equipment {
  id: string;
  siteId: string;
  oemName: string;
  type: string;
  modelNumber: string;
  status: 'online' | 'offline' | 'alert';
  lastPing: any;
}

export interface MonitoringLog {
  id: string;
  equipmentId: string;
  siteId: string;
  timestamp: any;
  metrics: {
    temperature?: number;
    vibration?: number;
    load?: number;
    location?: { lat: number; lng: number };
  };
  threatLevel: 'low' | 'medium' | 'high';
}

export interface Checklist {
  id: string;
  siteId: string;
  date: string;
  items: {
    id: string;
    task: string;
    status: 'pending' | 'checked' | 'failed';
    comment?: string;
  }[];
  inspectorId: string;
}

export interface SafetyReport {
  id: string;
  siteId: string;
  date: string;
  type: 'pre' | 'post' | 'monthly';
  content: string; // Markdown
  safetyScore: number;
  aiAnalysis: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'PPE' | 'Equipment' | 'Signage';
  description: string;
  price: number;
  stock: number;
  images: string[];
  supplierId: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'shipping' | 'delivered';
  totalPrice: number;
  createdAt: any;
}
