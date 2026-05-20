export interface Driver {
  id: string;
  name: string;
  licenseGrade: string; // 'Excellent' | 'Good' | 'Average'
  drivingHours: string;
  vehicleId: string;
  phone: string;
  email: string;
}

export interface Vehicle {
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  color: string;
}

export interface TimelineStep {
  id: string;
  name: string;
  time: string;
  detail: string;
  icon: string; // lucide icon name
}

export interface Incident {
  id: string;
  date: string;
  time: string;
  driverName: string;
  driverAvatar: string;
  vehicleId: string;
  eventType: 'Microsleep Detected' | 'Distraction Alert' | 'False Alarm' | 'Hard Braking';
  status: 'Emergency Logged' | 'Driver Warned' | 'Dismissed' | 'Logged';
  responseTime: string; // e.g., '142ms'
  location: string; // e.g., 'I-90 Westbound Mile Marker 142.5'
  evidenceImage: string; // URL of facial thumbnail
  timelineSteps: TimelineStep[];
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Operator' | 'Researcher';
  status: boolean; // active/inactive
  lastActive: string;
}
