import { Driver, Incident, SystemUser } from './types';

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'FL-2204',
    name: 'Marcus Chen',
    licenseGrade: 'Excellent',
    drivingHours: '6h 12m',
    vehicleId: 'Freight-09',
    phone: '+1 (555) 012-3456',
    email: 'marcus.chen@safedrive.io'
  },
  {
    id: 'FL-2309',
    name: 'Sarah Jenkins',
    licenseGrade: 'Good',
    drivingHours: '4h 15m',
    vehicleId: 'SF-239-JK',
    phone: '+1 (555) 678-9012',
    email: 'sarah.j@safedrive.io'
  },
  {
    id: 'FL-5021',
    name: 'Marcus Thorne',
    licenseGrade: 'Excellent',
    drivingHours: '2h 45m',
    vehicleId: 'TX-882-MT',
    phone: '+1 (555) 123-9876',
    email: 'm.thorne@safedrive.io'
  },
  {
    id: 'FL-9911',
    name: 'David Chen',
    licenseGrade: 'Average',
    drivingHours: '7h 10m',
    vehicleId: 'CA-101-DC',
    phone: '+1 (555) 890-5678',
    email: 'd.chen@safedrive.io'
  },
  {
    id: 'FL-4458',
    name: 'Elena Rodriguez',
    licenseGrade: 'Excellent',
    drivingHours: '5h 30m',
    vehicleId: 'FL-445-ER',
    phone: '+1 (555) 345-6789',
    email: 'elena.r@safedrive.io'
  }
];

export const INITIAL_USERS: SystemUser[] = [
  {
    id: 'user-1',
    name: 'Julianne Davis',
    email: 'julianne.d@safedrive.io',
    role: 'Administrator',
    status: true,
    lastActive: '2 mins ago'
  },
  {
    id: 'user-2',
    name: 'Marcus Rodriguez',
    email: 'm.rodriguez@safedrive.io',
    role: 'Operator',
    status: true,
    lastActive: '1 hour ago'
  },
  {
    id: 'user-3',
    name: 'Sarah Chen',
    email: 'sarah.chen@analytics.com',
    role: 'Researcher',
    status: false,
    lastActive: 'Yesterday'
  },
  {
    id: 'user-4',
    name: 'Ben Kingston',
    email: 'ben.k@safedrive.io',
    role: 'Operator',
    status: true,
    lastActive: '3 days ago'
  }
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'SD-98421',
    date: 'Oct 24, 2023',
    time: '14:32:10',
    driverName: 'Marcus Chen',
    driverAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxgsWq8xCm0jPF_1nsM9f8yNSZg9-VmDpMTHIfivUDsaeXQc20swATz92iNaujX-9nfrEz6HAxk4M6QqhJ_HiZ9GRWbHOiiarFE3e93E077DuI6xH9BBLqmpEyr6pQtQBUlFXsvRjWHpQeEaCY2xDI0blTOsa5GDKb2rxq4dY-QKupYDfdB3nSeF-J84aHCXCE7CMW5ldGOHxlR8HGzq13-h8iXJbJSXAgxm287wHuqV4OtDkAKqmN8b9x1AfDQtEtoRJkvJwarMlj',
    vehicleId: 'Freight-09',
    eventType: 'Microsleep Detected',
    status: 'Emergency Logged',
    responseTime: '112ms',
    location: 'I-90 Westbound Mile Marker 142.5',
    evidenceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrQ1Q_aO6i_S7nVmS2HTzpfW0v29QbUMSmNup3w98gsnEbfgL_nR8Q5QIUrHFQkpRNJ-msOYapApYgOe_x5grBdAWk69n5bysb7FhKNqN-A35Pgk2rqacri1nGh9fKfjxMRiVHRzyRGA5xD32n21VLZpbN4vkXkdT_umrTOsg6kEXt_6JKFkXIoSQiP7UzbehgtykcEsSgGcEwVHdOog6dL_3mK2AT1gik5s8mgL49ks5OQ4bOWIF-xc8AjxGHCjFhBbeqCK_KujN8',
    timelineSteps: [
      { id: '1', name: 'Detection', time: '14:32:10.4', detail: 'Neural net flagged eye fatigue (>1.2s closed)', icon: 'Activity' },
      { id: '2', name: 'Sound alert', time: '14:32:10.8', detail: 'Cabin speaker activated (75dB warning)', icon: 'Volume2' },
      { id: '3', name: 'Escalation', time: '14:32:12.1', detail: 'Seat haptic pulses engaged actively', icon: 'AlertTriangle' },
      { id: '4', name: 'Notification sent', time: '14:32:15.5', detail: 'Incident logged to fleet cloud system', icon: 'CheckCircle2' }
    ]
  },
  {
    id: 'SD-23901',
    date: 'Oct 19, 2023',
    time: '14:22:10',
    driverName: 'Sarah Jenkins',
    driverAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrO9l1hgJ6GCZCIpEFIOH0VQrbegF09BX7rPG4NZogWVveUIjFBVkdWvv8ttPU7ZxoZWIVuVoOKJxhKxCuWM6rqJSD4Q6e4Rc57xwimYi1w-z2YifUA806-P9J6J_5luuy4KoLqLk3_8RK2wxdLmM-gzJwTm8za7hiO6Q7HIa21ITK7FMLtqT_6YX7M4x9yT-NoC4-pqBAOT8B6-7sCkce_RAJmk5PmbxpFPpZrVsv4O8bxfC-O5sADHO0KWVk78joRPE-RlZyCkCo',
    vehicleId: 'SF-239-JK',
    eventType: 'Microsleep Detected',
    status: 'Emergency Logged',
    responseTime: '112ms',
    location: 'US-101 Southbound Exit 43',
    evidenceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa7RzQF-fc_hFS5X3gzL-R8EYkmINev30e9unkOwYGAp5rNl4CTf9yBciUPfk_o88f4zyr5aYJoEPTjkTQIAhMgwJZT34lLBs1tsYQ6XgyzGUC2hG5TUys2Qrl4EUO14y8Wt1VjyDlQyLgnQppL9amzqJOXVzgTYCukwvX96AGSYVETvWjd7ye4YzCA-ZxvuXz2_eXGeVprC5QxdpLQgKDrzusDlDfOblX5QUkk6yO_ceapJNypV6N3EzFVGJlWJXvv_EkXWd4s3O5',
    timelineSteps: [
      { id: '1', name: 'Triggered', time: '14:22:10.1', detail: 'Microsleep pattern matched', icon: 'Activity' },
      { id: '2', name: 'Acoustic Alert', time: '14:22:10.4', detail: 'Sirens activated in cabin', icon: 'Volume2' },
      { id: '3', name: 'SMS Sent', time: '14:22:12.3', detail: 'Emergency SMS dispatched to Elena Sterling', icon: 'CheckCircle2' }
    ]
  },
  {
    id: 'SD-88204',
    date: 'Oct 19, 2023',
    time: '11:05:45',
    driverName: 'Marcus Thorne',
    driverAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB2yLhS8bDo1swvXntV-uDNFFxPsnjqhUs34auJqjFOZn0ROd4avBYaG4Wz7XgbDirg6AzdhiirVjAfSrWmz4uzWTi0HjM-RpFsJ1r6nPJQKxWIr_tgVMnJIeGwUlXQ4MYgR0SBVWqUTAKBJa86zBD2UK7txZ0JRYzAWWReEXq5WXfwX1djFrsoCcUdB-B8j-Ag6V44OBiTddHvGKqeZR7NdprqVoG-yEn09tKCe1Eh1ZrSQwaFdyuXlnbHJdW5cpHypYAl2gADlid',
    vehicleId: 'TX-882-MT',
    eventType: 'Distraction Alert',
    status: 'Driver Warned',
    responseTime: '164ms',
    location: 'I-94 Eastbound near Mile 20',
    evidenceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa7RzQF-fc_hFS5X3gzL-R8EYkmINev30e9unkOwYGAp5rNl4CTf9yBciUPfk_o88f4zyr5aYJoEPTjkTQIAhMgwJZT34lLBs1tsYQ6XgyzGUC2hG5TUys2Qrl4EUO14y8Wt1VjyDlQyLgnQppL9amzqJOXVzgTYCukwvX96AGSYVETvWjd7ye4YzCA-ZxvuXz2_eXGeVprC5QxdpLQgKDrzusDlDfOblX5QUkk6yO_ceapJNypV6N3EzFVGJlWJXvv_EkXWd4s3O5',
    timelineSteps: [
      { id: '1', name: 'Distraction Event', time: '11:05:45.1', detail: 'Gaze diverted from road for >3.0s', icon: 'EyeOff' },
      { id: '2', name: 'Warning Tone', time: '11:05:45.5', detail: 'Audio beep triggered', icon: 'Volume2' },
      { id: '3', name: 'Correction', time: '11:05:46.2', detail: 'Driver eyes returned to road', icon: 'CheckCircle2' }
    ]
  },
  {
    id: 'SD-10177',
    date: 'Oct 18, 2023',
    time: '16:50:22',
    driverName: 'David Chen',
    driverAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3fFkIe-JM6YFMoxSnKt14XwsxBaVtv4FRzoXmjsJDUFvyotXj2rB_TTjYDQ1GvLV841mdqe0B6KKo1f9_xfTyE0niBobCPOh4B8ZOOzz34iKk90nOOWBo74pLUX5vf35vrehPNDKp2oPtwRbZxhadcqvA7aXp4MbG5OdmuRr6Tt7aAuzK-XwSO5uVViX1Rf86mA84Y6E3xginodbes7wPARF4M09hTGDZcSIW10Igz_7CYEMD5sRjFzjkvLhJs_Q88x8TGb2MSli',
    vehicleId: 'CA-101-DC',
    eventType: 'False Alarm',
    status: 'Dismissed',
    responseTime: '298ms',
    location: 'Inner City Route A',
    evidenceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa7RzQF-fc_hFS5X3gzL-R8EYkmINev30e9unkOwYGAp5rNl4CTf9yBciUPfk_o88f4zyr5aYJoEPTjkTQIAhMgwJZT34lLBs1tsYQ6XgyzGUC2hG5TUys2Qrl4EUO14y8Wt1VjyDlQyLgnQppL9amzqJOXVzgTYCukwvX96AGSYVETvWjd7ye4YzCA-ZxvuXz2_eXGeVprC5QxdpLQgKDrzusDlDfOblX5QUkk6yO_ceapJNypV6N3EzFVGJlWJXvv_EkXWd4s3O5',
    timelineSteps: [
      { id: '1', name: 'Alert Triggered', time: '16:50:22.0', detail: 'Shadow misidentified as fatigue risk', icon: 'Activity' },
      { id: '2', name: 'Review', time: '16:50:24.5', detail: 'Operator verified driver was fully awake', icon: 'Eye' },
      { id: '3', name: 'Cleared', time: '16:50:25.0', detail: 'Dismissed state manually synchronized', icon: 'Check' }
    ]
  },
  {
    id: 'SD-44589',
    date: 'Oct 18, 2023',
    time: '08:12:00',
    driverName: 'Elena Rodriguez',
    driverAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO0YkWTjegsCaenyRYLhMzNJ5XSjsrhGc9_mjgHPjujWNkt4R8c4jfomyZJSQ0-uRCHfuj8kEtO5LlRJpVUgzAsAoJWN_ilD1YpSLFsnx5pkWtZ9elWPqtIkUqlE8TutoLVmXvxdYUtUEW4JqT1cBZ8IeJgc4bW4Ktg8x3DK-E8Hs183R97rggxMveYI_uPSOvB4NGZNu6XPq7sdGORbtFaIg4ihzGPTfE8OalWJNaRqWOsU6p7dKm8OPToG-ZjNnhuAQ1EtehG2-J',
    vehicleId: 'FL-445-ER',
    eventType: 'Hard Braking',
    status: 'Logged',
    responseTime: '124ms',
    location: 'I-5 North Exit 172',
    evidenceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa7RzQF-fc_hFS5X3gzL-R8EYkmINev30e9unkOwYGAp5rNl4CTf9yBciUPfk_o88f4zyr5aYJoEPTjkTQIAhMgwJZT34lLBs1tsYQ6XgyzGUC2hG5TUys2Qrl4EUO14y8Wt1VjyDlQyLgnQppL9amzqJOXVzgTYCukwvX96AGSYVETvWjd7ye4YzCA-ZxvuXz2_eXGeVprC5QxdpLQgKDrzusDlDfOblX5QUkk6yO_ceapJNypV6N3EzFVGJlWJXvv_EkXWd4s3O5',
    timelineSteps: [
      { id: '1', name: 'Deceleration Detected', time: '08:12:00.1', detail: 'Negative force exceeded 0.7g threshold', icon: 'ArrowDownCircle' },
      { id: '2', name: 'Log Captured', time: '08:12:00.3', detail: 'Vehicle telemetry snapshot exported', icon: 'Database' }
    ]
  }
];

export const MOCK_TEST_SCENARIOS = [
  { name: 'Microsleep Detection @ 60mph', category: 'Visual Monitoring', lastRun: '2 hours ago', response: '112ms', status: 'Pass' },
  { name: 'Low-Light Perimeter Check', category: 'Surround Sensing', lastRun: '4 hours ago', response: '164ms', status: 'Pass' },
  { name: 'Emergency Brake Assist Lag', category: 'Active Control', lastRun: 'Yesterday', response: '298ms', status: 'Fail' },
  { name: 'Driver Distraction (Phone Use)', category: 'Interior Monitor', lastRun: 'Yesterday', response: '124ms', status: 'Pass' },
  { name: 'Night Fog Pathing', category: 'LIDAR Radar', lastRun: '2 days ago', response: '185ms', status: 'Pass' },
  { name: 'Tailgate Buffer Verification', category: 'Surround Sensing', lastRun: '3 days ago', response: '92ms', status: 'Pass' }
];

export const MOCK_CONTACTS = [
  { name: 'Sarah Connor', relationship: 'Sister', channel: 'SMS', phone: '+1 (234) 567-8901' },
  { name: 'John Doe', relationship: 'Friend', channel: 'WhatsApp', phone: '+1 (987) 654-3210' }
];
