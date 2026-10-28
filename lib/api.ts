export const API_BASE_URL =
  typeof window !== 'undefined' ? '/api' : (process.env.BACKEND_INTERNAL_URL || 'http://127.0.0.1:5000/api');

export type RoomType =
  | 'SINGLE'
  | 'DORMITORY'
  | 'DELUXE'
  | 'DELUXE_AC'
  | 'SUPER_DELUXE_AC'
  | 'NORMAL_NON_AC'
  | 'STANDARD_NON_AC';
export type SharingType = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'FOUR_SHARING' | 'SIX_SHARING' | 'EIGHT_SHARING';
export type RoomStatus = 'AVAILABLE' | 'FULL' | 'UNDER_MAINTENANCE';

export interface Hostel {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  totalFloors: number;
  description?: string;
  facilities: string[];
  images: string[];
  totalRooms?: number;
  totalCapacity?: number;
  occupiedBeds?: number;
  vacantBeds?: number;
  occupancyRate?: number;
  createdAt: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  hostelId?: string;
  hostel?: { id: string; name: string; code: string };
  type: RoomType;
  sharing: SharingType;
  capacity: number;
  occupiedBeds: number;
  vacantBeds: number;
  isVacant: boolean;
  priceMonthly: number;
  securityDeposit: number;
  amenities: string[];
  images: string[];
  description: string;
  status: RoomStatus;
  wing?: string;
  positionX?: number;
  positionY?: number;
  createdAt: string;
}

export interface RoomStats {
  totalRooms: number;
  totalCapacity: number;
  occupiedBeds: number;
  vacantBeds: number;
  vacantRooms: number;
  occupancyRate: number;
  byType: {
    DELUXE_AC: number;
    SUPER_DELUXE_AC: number;
    NORMAL_NON_AC: number;
    STANDARD_NON_AC: number;
  };
}

export interface Admission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth?: string;
  collegeOrWork?: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  idProofType: string;
  idProofNumber: string;
  roomTypePreference: RoomType;
  foodPreference?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ADMITTED';
  assignedRoomId?: string;
  assignedRoom?: Room;
  notes?: string;
  admittedAt?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  residentName: string;
  residentEmail: string;
  residentPhone: string;
  roomId: string;
  room?: Room;
  checkInDate: string;
  tenureMonths: number;
  monthlyRent: number;
  securityDeposit: number;
  totalAmount: number;
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  payments?: Payment[];
  createdAt: string;
}

export interface ServiceRequest {
  id: string;
  residentName: string;
  residentPhone: string;
  roomNumber: string;
  serviceType: 'ROOM_CLEANING' | 'DEEP_CLEANING' | 'LAUNDRY' | 'PLUMBING' | 'ELECTRICAL' | 'AC_MAINTENANCE' | 'PEST_CONTROL';
  preferredDate: string;
  timeSlot: string;
  urgency: 'NORMAL' | 'HIGH' | 'EMERGENCY';
  instructions?: string;
  status: 'REQUESTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assignedStaff?: string;
  resolutionNotes?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  transactionId: string;
  invoiceNumber: string;
  bookingId?: string;
  payerName: string;
  payerEmail: string;
  amount: number;
  paymentType: 'ROOM_RENT' | 'ADMISSION_FEE' | 'SECURITY_DEPOSIT' | 'SERVICE_CHARGE' | 'MESS_FEE';
  paymentMethod: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  paidAt: string;
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  timing: string;
  isIncluded: boolean;
  features: string[];
}

// Helper fetch wrapper
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const base = API_BASE_URL.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      let errorMsg = res.statusText || `HTTP ${res.status}`;
      try {
        const err = await res.json();
        if (err && (err.message || err.error)) {
          errorMsg = Array.isArray(err.message) ? err.message.join(', ') : (err.message || err.error);
        }
      } catch {
        if (res.status === 500 || res.status === 502 || res.status === 503) {
          errorMsg = `Backend server (port 5000) not reachable or returned ${res.status} on ${endpoint}`;
        }
      }
      throw new Error(errorMsg);
    }

    return await res.json();
  } catch (err: any) {
    console.warn(`[API] Notice on ${endpoint}:`, err.message || err);
    throw err;
  }
}

// API Functions
export const api = {
  // Hostels
  getHostels: () => apiFetch<Hostel[]>('/hostels'),
  getHostel: (id: string) => apiFetch<Hostel>(`/hostels/${id}`),

  // Rooms & 2D Layout
  getRooms: (params?: { hostelId?: string; type?: string; sharing?: string; floor?: number; vacantOnly?: boolean; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.hostelId && params.hostelId !== 'ALL') query.append('hostelId', params.hostelId);
    if (params?.type && params.type !== 'ALL') query.append('type', params.type);
    if (params?.sharing && params.sharing !== 'ALL') query.append('sharing', params.sharing);
    if (params?.floor) query.append('floor', String(params.floor));
    if (params?.vacantOnly) query.append('vacantOnly', 'true');
    if (params?.search) query.append('search', params.search);
    return apiFetch<Room[]>(`/rooms?${query.toString()}`);
  },

  get2DLayout: (hostelId?: string, floor?: number) => {
    const query = new URLSearchParams();
    if (hostelId) query.append('hostelId', hostelId);
    if (floor) query.append('floor', String(floor));
    return apiFetch<any>(`/rooms/2d-layout?${query.toString()}`);
  },

  getRoomStats: (hostelId?: string) => {
    const query = hostelId ? `?hostelId=${hostelId}` : '';
    return apiFetch<RoomStats>(`/rooms/stats${query}`);
  },

  getRoom: (id: string) => apiFetch<Room>(`/rooms/${id}`),

  createRoom: (data: Partial<Room>) => apiFetch<Room>('/rooms', { method: 'POST', body: JSON.stringify(data) }),

  updateRoom: (id: string, data: Partial<Room>) => apiFetch<Room>(`/rooms/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteRoom: (id: string) => apiFetch<{ message: string }>(`/rooms/${id}`, { method: 'DELETE' }),

  // Admissions
  getAdmissions: (status?: string, search?: string) => {
    const query = new URLSearchParams();
    if (status && status !== 'ALL') query.append('status', status);
    if (search) query.append('search', search);
    return apiFetch<Admission[]>(`/admissions?${query.toString()}`);
  },

  createAdmission: (data: any) =>
    apiFetch<Admission>('/admissions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateAdmissionStatus: (id: string, update: { status: string; assignedRoomId?: string; notes?: string }) =>
    apiFetch<Admission>(`/admissions/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(update),
    }),

  // Bookings
  getBookings: (status?: string, search?: string) => {
    const query = new URLSearchParams();
    if (status) query.append('status', status);
    if (search) query.append('search', search);
    return apiFetch<Booking[]>(`/bookings?${query.toString()}`);
  },

  createBooking: (data: {
    residentName: string;
    residentEmail: string;
    residentPhone: string;
    roomId: string;
    checkInDate: string;
    tenureMonths: number;
    paymentMethod?: string;
  }) =>
    apiFetch<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  cancelBooking: (id: string) =>
    apiFetch<Booking>(`/bookings/${id}/cancel`, {
      method: 'PUT',
    }),

  // Services
  getServices: (params?: { status?: string; serviceType?: string; urgency?: string; roomNumber?: string }) => {
    const query = new URLSearchParams();
    if (params?.status && params.status !== 'ALL') query.append('status', params.status);
    if (params?.serviceType && params.serviceType !== 'ALL') query.append('serviceType', params.serviceType);
    if (params?.urgency && params.urgency !== 'ALL') query.append('urgency', params.urgency);
    if (params?.roomNumber) query.append('roomNumber', params.roomNumber);
    return apiFetch<ServiceRequest[]>(`/services?${query.toString()}`);
  },

  createService: (data: any) =>
    apiFetch<ServiceRequest>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateService: (id: string, update: { status?: string; assignedStaff?: string; resolutionNotes?: string }) =>
    apiFetch<ServiceRequest>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(update),
    }),

  // Payments
  getPayments: (search?: string, type?: string) => {
    const query = new URLSearchParams();
    if (search) query.append('search', search);
    if (type && type !== 'ALL') query.append('type', type);
    return apiFetch<Payment[]>(`/payments?${query.toString()}`);
  },

  getPaymentStats: () => apiFetch<{ totalCollected: number; totalTransactions: number; byType: Record<string, number> }>('/payments/stats'),

  createPayment: (data: any) =>
    apiFetch<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Facilities
  getFacilities: (category?: string) => {
    const query = new URLSearchParams();
    if (category && category !== 'ALL') query.append('category', category);
    return apiFetch<Facility[]>(`/facilities?${query.toString()}`);
  },

  // Admin Dashboard
  getAdminDashboard: () =>
    apiFetch<{
      kpi: {
        occupancy: {
          totalRooms: number;
          totalCapacity: number;
          occupiedBeds: number;
          vacantBeds: number;
          vacantRooms: number;
          underMaintenanceRooms: number;
          occupancyRate: number;
        };
        admissions: {
          total: number;
          pending: number;
          approved: number;
          admitted: number;
          rejected: number;
        };
        financials: {
          totalRevenue: number;
          totalTransactions: number;
          revenueByType: Record<string, number>;
        };
        maintenance: {
          total: number;
          pending: number;
          inProgress: number;
          completed: number;
          emergency: number;
        };
      };
      feeds: {
        recentAdmissions: Admission[];
        recentServices: ServiceRequest[];
        recentBookings: Booking[];
        recentPayments: Payment[];
      };
      timestamp: string;
    }>('/admin/dashboard'),

  getAdminOccupancy: () =>
    apiFetch<{
      byFloor: Array<{ floor: number; totalBeds: number; occupiedBeds: number; vacantBeds: number; rooms: number; occupancyRate: number }>;
      byType: Array<{ type: string; totalBeds: number; occupiedBeds: number; vacantBeds: number; rooms: number; occupancyRate: number }>;
    }>('/admin/dashboard/occupancy'),

  getAdminFinancials: () =>
    apiFetch<{
      totalCollected: number;
      totalCount: number;
      byMethod: Record<string, number>;
      recentTransactions: Payment[];
    }>('/admin/dashboard/financials'),

  // Authentication & OTP
  sendOtp: (phone: string, channel: 'SMS' | 'WHATSAPP' = 'SMS') =>
    apiFetch<{ success: boolean; message: string; phone: string; otp?: string; expiresInSeconds: number }>('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, channel }),
    }),

  verifyOtp: (phone: string, otp: string) =>
    apiFetch<{
      success: boolean;
      token: string;
      resident: { name: string; phone: string; roomNumber: string; status: string };
    }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    }),
};
