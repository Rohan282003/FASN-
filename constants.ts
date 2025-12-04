
import { User, UserRole, Course, StudentSummary } from './types';

export const MOCK_STUDENT: User = {
  id: 's1',
  name: 'Rohan',
  email: 'rohan.student@christ.edu',
  role: UserRole.STUDENT,
  // Transparent 3D Face Avatar
  avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/cool-boy-avatar-6299539-5187871.png', 
  xp: 8540,
  level: 24,
  badges: ['Supply Chain Architect', 'Data Oracle', 'Neon Scholar'],
  class: 'MBA (Business Analytics)',
  semester: 4,
  regNo: '2321204',
  marksHistory: [
    { sem: 'Sem 1', gpa: 7.2 },
    { sem: 'Sem 2', gpa: 7.8 },
    { sem: 'Sem 3', gpa: 8.1 },
    { sem: 'Sem 4', gpa: 8.5 },
  ]
};

export const MOCK_FACULTY: User = {
  id: 'f1',
  name: 'Prof. Krishna Durba',
  email: 'krishna.durba@christ.edu',
  role: UserRole.FACULTY,
  avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/professor-avatar-6299536-5187868.png', // Distinct avatar for faculty
};

// Top High Level Students Leaderboard
export const TOP_AGENTS = [
  { rank: 1, name: 'Sarah_K', level: 32, avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299541-5187873.png' },
  { rank: 2, name: 'Arjun_V', level: 30, avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/male-avatar-6299533-5187865.png?f=webp' },
  { rank: 3, name: 'Mei_Lin', level: 28, avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/female-avatar-6299540-5187872.png?f=webp' },
];

export const AVATAR_VARIANTS = [
  { id: 'default', name: 'Neural Default', url: 'https://cdn3d.iconscout.com/3d/premium/thumb/cool-boy-avatar-6299539-5187871.png' },
  { id: 'tactical', name: 'Tactical Ops', url: 'https://cdn3d.iconscout.com/3d/premium/thumb/male-avatar-6299533-5187865.png?f=webp' },
  { id: 'netrunner', name: 'Netrunner V', url: 'https://cdn3d.iconscout.com/3d/premium/thumb/female-avatar-6299540-5187872.png?f=webp' },
  { id: 'corp', name: 'Corp Exec', url: 'https://cdn3d.iconscout.com/3d/premium/thumb/businessman-avatar-6299534-5187866.png' },
  { id: 'rogue', name: 'Rogue Agent', url: 'https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299541-5187873.png' }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    code: 'MBA-SCM-2077',
    title: 'Supply Chain Analytics',
    instructor: 'Prof. Krishna Durba',
    progress: 40, // recalculated based on units
    thumbnail: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800', 
    tags: ['Logistics', 'Operations', 'Network Theory'],
    description: 'Optimizing hyper-loop distribution networks and autonomous drone fleets in high-density sectors.',
    units: [
      {
        id: 'u1',
        title: 'Unit 1: Network Optimization',
        description: 'Introduction to graph theory in logistics nodes.',
        videoUrl: 'https://www.youtube.com/embed/P-M2dBlN3CY', // Mock Link
        notes: 'Network optimization involves using mathematical modeling to find the best network configuration. Key concepts: Center of Gravity Method, Linear Programming for Transportation Problems.',
        completed: true
      },
      {
        id: 'u2',
        title: 'Unit 2: Demand Forecasting',
        description: 'Predictive algorithms for volatile markets.',
        videoUrl: 'https://www.youtube.com/embed/o3A9J6e8gT4',
        notes: 'Moving Averages, Exponential Smoothing (Holt-Winters). AI application in sensing demand spikes from social media signals.',
        completed: true
      },
      {
        id: 'u3',
        title: 'Unit 3: Inventory Management',
        description: 'Just-in-Time (JIT) protocols for autonomous warehouses.',
        videoUrl: 'https://www.youtube.com/embed/K9JjM8Fz4rA',
        notes: 'EOQ Models, Safety Stock calculations. Managing multi-echelon inventory systems using reinforcement learning.',
        completed: false
      },
      {
        id: 'u4',
        title: 'Unit 4: Drone Fleet Logistics',
        description: 'Routing algorithms for last-mile delivery.',
        videoUrl: 'https://www.youtube.com/embed/9w16p4hJq5M',
        notes: 'Traveling Salesman Problem (TSP) variations. Battery life constraints vs payload optimization. airspace regulations.',
        completed: false
      },
      {
        id: 'u5',
        title: 'Unit 5: Blockchain in SCM',
        description: 'Immutable ledgers for tracking high-value assets.',
        videoUrl: 'https://www.youtube.com/embed/SSo_EIwHSd4',
        notes: 'Smart Contracts for auto-payment upon delivery. Traceability of raw materials to ensure sustainability compliance.',
        completed: false
      }
    ]
  },
  {
    id: 'c2',
    code: 'MBA-MKT-AI',
    title: 'Marketing Analytics',
    instructor: 'Prof. Krishna Durba',
    progress: 20,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', 
    tags: ['Analytics', 'Big Data', 'Consumer Behavior'],
    description: 'Decoding consumer neural patterns to predict purchasing behavior in the metaverse.',
    units: [
      {
        id: 'mu1',
        title: 'Unit 1: Customer Lifetime Value',
        description: 'Calculating CLV using predictive modeling.',
        videoUrl: 'https://www.youtube.com/embed/yF7O4wX6-wA',
        notes: 'CLV = Average Value of Sale × Number of Transactions × Retention Time Period. Cohort analysis helps in segmenting high-value users.',
        completed: true
      },
      {
        id: 'mu2',
        title: 'Unit 2: Segmentation & Targeting',
        description: 'Cluster analysis for micro-segmentation.',
        videoUrl: 'https://www.youtube.com/embed/2uQ5x8m2b1w',
        notes: 'K-Means Clustering. Psychographic vs Demographic segmentation in the digital age.',
        completed: false
      },
      {
        id: 'mu3',
        title: 'Unit 3: Sentiment Analysis',
        description: 'NLP for brand reputation management.',
        videoUrl: 'https://www.youtube.com/embed/6i7p1gQ5W6o',
        notes: 'Using Python NLTK/Spacy. Analyzing Twitter/X feeds for real-time brand perception. Irony detection challenges.',
        completed: false
      },
      {
        id: 'mu4',
        title: 'Unit 4: Marketing Mix Modeling',
        description: 'Optimizing spend across digital channels.',
        videoUrl: 'https://www.youtube.com/embed/9gQ5W6o', // Mock
        notes: 'Regression analysis to determine the impact of Price, Promotion, Product, and Place on sales volume.',
        completed: false
      },
      {
        id: 'mu5',
        title: 'Unit 5: Web Analytics & A/B Testing',
        description: 'Conversion Rate Optimization (CRO).',
        videoUrl: 'https://www.youtube.com/embed/8jQ5W6o', // Mock
        notes: 'Google Analytics 4 events. Designing statistically significant A/B tests for landing pages.',
        completed: false
      }
    ]
  }
];

export const MOCK_CLASS_ROSTER: StudentSummary[] = [
  {
    id: 's1',
    name: 'Rohan',
    avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/cool-boy-avatar-6299539-5187871.png',
    rollNo: '2321204',
    attendance: 92,
    gpa: 8.15,
    riskLevel: 'Low',
    lastActive: '10m ago',
    email: 'rohan.student@christ.edu',
    class: 'MBA (BA)',
    marksHistory: [
      { sem: 'Sem 1', gpa: 7.2 },
      { sem: 'Sem 2', gpa: 7.8 },
      { sem: 'Sem 3', gpa: 8.1 },
      { sem: 'Sem 4', gpa: 8.5 },
    ]
  },
  {
    id: 's2',
    name: 'Sarah Jenkins',
    avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299541-5187873.png',
    rollNo: '2321205',
    attendance: 85,
    gpa: 7.9,
    riskLevel: 'Low',
    lastActive: '2h ago',
    email: 'sarah.j@christ.edu',
    class: 'MBA (BA)',
     marksHistory: [
      { sem: 'Sem 1', gpa: 7.5 },
      { sem: 'Sem 2', gpa: 7.6 },
      { sem: 'Sem 3', gpa: 7.9 },
      { sem: 'Sem 4', gpa: 7.9 },
    ]
  },
  {
    id: 's3',
    name: 'Arjun Verma',
    avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/male-avatar-6299533-5187865.png?f=webp',
    rollNo: '2321210',
    attendance: 72,
    gpa: 6.8,
    riskLevel: 'Medium',
    lastActive: '1d ago',
    email: 'arjun.v@christ.edu',
    class: 'MBA (BA)',
     marksHistory: [
      { sem: 'Sem 1', gpa: 6.5 },
      { sem: 'Sem 2', gpa: 6.2 },
      { sem: 'Sem 3', gpa: 6.8 },
      { sem: 'Sem 4', gpa: 6.9 },
    ]
  },
  {
    id: 's4',
    name: 'Mei Lin',
    avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/female-avatar-6299540-5187872.png?f=webp',
    rollNo: '2321215',
    attendance: 45,
    gpa: 5.2,
    riskLevel: 'High',
    lastActive: '5d ago',
    email: 'mei.lin@christ.edu',
    class: 'MBA (BA)',
     marksHistory: [
      { sem: 'Sem 1', gpa: 5.5 },
      { sem: 'Sem 2', gpa: 5.1 },
      { sem: 'Sem 3', gpa: 4.8 },
      { sem: 'Sem 4', gpa: 5.2 },
    ]
  }
];

export const PENDING_TASKS = [
  { id: 1, title: 'Submit Drone Routing Algorithm', due: '2h remaining', priority: 'High' },
  { id: 2, title: 'Review Marketing Heatmaps', due: 'Tomorrow', priority: 'Medium' },
  { id: 3, title: 'Complete Ethics Simulation', due: 'Fri', priority: 'Low' },
];

export const ATTENDANCE_DATA = [
  { day: 'Mon', hours: 4.2 },
  { day: 'Tue', hours: 3.5 },
  { day: 'Wed', hours: 5.1 },
  { day: 'Thu', hours: 2.8 },
  { day: 'Fri', hours: 6.0 },
  { day: 'Sat', hours: 1.5 },
  { day: 'Sun', hours: 0.5 },
];

export const STORE_ITEMS = [
  { id: 1, type: 'Case Study', title: 'Neo-Tokyo Logistics Crisis', price: 'Free' },
  { id: 2, type: 'Notes', title: 'SCM Module 4 Summaries', price: 'Free' },
  { id: 3, type: 'Textbook', title: 'Predictive Analytics v2.1', price: 'Free' },
  { id: 4, type: 'Data Pack', title: 'Global Market Datasets', price: 'Free' },
];

export const FACULTY_STATS = {
  classPerformance: 88, // %
  totalAttendance: 94, // %
  activeStudents: 142,
  assignmentsGraded: 450
};

export const FACULTY_NOTIFICATIONS = [
  { id: 1, text: "Admin: Grade submission deadline extended for SCM.", time: "2h ago", type: "info" },
  { id: 2, text: "System: Server maintenance scheduled for 02:00.", time: "5h ago", type: "system" },
  { id: 3, text: "Student: Rohan requested extension for Unit 3.", time: "1d ago", type: "alert" }
];

export const INITIAL_TUTOR_MESSAGE = "Connection established. I am your FASN AI Link. Accessing course database... Ready. What module shall we decrypt today?";
