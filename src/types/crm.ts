export interface GymMember {
  id: string;
  name: string;
  avatar: string;
  tier: 'VIP Platinum' | 'Standard Access' | 'Morning Pass' | 'CrossFit Elite';
  status: 'Active' | '3 Days Left' | 'Frozen' | 'Expired';
  checkInTime: string;
  scanMethod: 'QR Camera' | 'NFC Pass' | 'Phone Lookup';
  visitsThisMonth: number;
  streak: number;
}

export interface WhatsAppNode {
  id: string;
  type: 'trigger' | 'delay' | 'action' | 'condition';
  title: string;
  description: string;
  iconName: string;
  active: boolean;
}

export interface MultiLocation {
  id: string;
  name: string;
  city: string;
  occupancy: number;
  maxCapacity: number;
  velocitySpeed: string;
  todayCheckIns: number;
  status: 'Optimal' | 'High Occupancy' | 'Peak Flow';
}

export interface GymBranch {
  id: string;
  name: string;
  activeMembers: number;
  liveFloorOccupancy: number;
  capacityLimit: number;
  monthlyRevenue: number;
  turnstileGateStatus: 'Hardware Sync' | 'Revoked' | 'Maintenance';
}

export interface AtRiskMember {
  id: string;
  name: string;
  daysInactive: number;
  phone: string;
  lastVisit: string;
  planExpiry: string;
  reengagementStatus: 'Pending' | 'Sent WhatsApp' | 'Recovered';
}

export interface GroupClass {
  id: string;
  title: string;
  trainer: string;
  time: string;
  enrolled: number;
  capacity: number;
  waitlistCount: number;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  impact: string;
}

export interface Tenant {
  id: string;
  name: string;
  category: 'Gym & Fitness';
  ownerName: string;
  ownerEmail: string;
  branchCount: number;
  planTier: 'Enterprise SaaS' | 'Growth Plan' | 'Starter';
  status: 'Active' | 'Trialing' | 'Provisioning' | 'Suspended';
  createdDate: string;
  monthlyFee: number;
}
