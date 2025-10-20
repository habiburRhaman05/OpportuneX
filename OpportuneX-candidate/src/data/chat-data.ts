
interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'me' | 'other';
  type: 'text' | 'image' | 'file';
  replyTo?: string;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  lastSeen: string;
  type: 'developer' | 'hr' | 'company';
  messages: Message[];
}

export const chatData: Chat[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/placeholder.svg',
    lastMessage: 'Thanks for the interview! Looking forward to hearing back.',
    timestamp: '2024-01-15T10:30:00Z',
    unreadCount: 2,
    isOnline: true,
    lastSeen: '',
    type: 'hr',
    messages: [
      {
        id: '1-1',
        text: 'Hi! I wanted to follow up on our interview yesterday.',
        timestamp: '2024-01-15T09:00:00Z',
        sender: 'other',
        type: 'text'
      },
      {
        id: '1-2',
        text: 'Hello Sarah! Thank you for reaching out. The interview went great!',
        timestamp: '2024-01-15T09:05:00Z',
        sender: 'me',
        type: 'text'
      },
      {
        id: '1-3',
        text: 'I\'m really excited about this opportunity and I think my skills align perfectly with what you\'re looking for.',
        timestamp: '2024-01-15T09:06:00Z',
        sender: 'me',
        type: 'text'
      },
      {
        id: '1-4',
        text: 'That\'s wonderful to hear! We were impressed with your portfolio and experience.',
        timestamp: '2024-01-15T09:10:00Z',
        sender: 'other',
        type: 'text'
      },
      {
        id: '1-5',
        text: 'Thanks for the interview! Looking forward to hearing back.',
        timestamp: '2024-01-15T10:30:00Z',
        sender: 'other',
        type: 'text'
      }
    ]
  },
  {
    id: '2',
    name: 'TechCorp Inc',
    avatar: '/placeholder.svg',
    lastMessage: 'We\'d like to schedule a technical interview.',
    timestamp: '2024-01-15T08:45:00Z',
    unreadCount: 1,
    isOnline: false,
    lastSeen: '2 hours ago',
    type: 'company',
    messages: [
      {
        id: '2-1',
        text: 'Hello! We reviewed your application for the Senior Frontend Developer position.',
        timestamp: '2024-01-15T08:00:00Z',
        sender: 'other',
        type: 'text'
      },
      {
        id: '2-2',
        text: 'Thank you for considering my application!',
        timestamp: '2024-01-15T08:15:00Z',
        sender: 'me',
        type: 'text'
      },
      {
        id: '2-3',
        text: 'We\'d like to schedule a technical interview.',
        timestamp: '2024-01-15T08:45:00Z',
        sender: 'other',
        type: 'text'
      }
    ]
  },
  {
    id: '3',
    name: 'Alex Chen',
    avatar: '/placeholder.svg',
    lastMessage: 'Let me know if you need any references!',
    timestamp: '2024-01-14T16:20:00Z',
    unreadCount: 0,
    isOnline: true,
    lastSeen: '',
    type: 'developer',
    messages: [
      {
        id: '3-1',
        text: 'Hey! How did your interview at TechCorp go?',
        timestamp: '2024-01-14T15:00:00Z',
        sender: 'other',
        type: 'text'
      },
      {
        id: '3-2',
        text: 'It went really well! Thanks for referring me.',
        timestamp: '2024-01-14T15:30:00Z',
        sender: 'me',
        type: 'text'
      },
      {
        id: '3-3',
        text: 'That\'s great to hear! You\'re perfect for that role.',
        timestamp: '2024-01-14T16:00:00Z',
        sender: 'other',
        type: 'text'
      },
      {
        id: '3-4',
        text: 'Let me know if you need any references!',
        timestamp: '2024-01-14T16:20:00Z',
        sender: 'other',
        type: 'text'
      }
    ]
  },
  {
    id: '4',
    name: 'Maria Rodriguez',
    avatar: '/placeholder.svg',
    lastMessage: 'Your portfolio looks amazing!',
    timestamp: '2024-01-14T11:30:00Z',
    unreadCount: 3,
    isOnline: false,
    lastSeen: '1 day ago',
    type: 'hr',
    messages: [
      {
        id: '4-1',
        text: 'Hi! I came across your profile and I\'m interested in discussing some opportunities.',
        timestamp: '2024-01-14T10:00:00Z',
        sender: 'other',
        type: 'text'
      },
      {
        id: '4-2',
        text: 'Your portfolio looks amazing!',
        timestamp: '2024-01-14T11:30:00Z',
        sender: 'other',
        type: 'text'
      }
    ]
  },
  {
    id: '5',
    name: 'StartupXYZ',
    avatar: '/placeholder.svg',
    lastMessage: 'When can you start?',
    timestamp: '2024-01-13T14:15:00Z',
    unreadCount: 0,
    isOnline: true,
    lastSeen: '',
    type: 'company',
    messages: [
      {
        id: '5-1',
        text: 'We\'d love to offer you the position!',
        timestamp: '2024-01-13T14:00:00Z',
        sender: 'other',
        type: 'text'
      },
      {
        id: '5-2',
        text: 'When can you start?',
        timestamp: '2024-01-13T14:15:00Z',
        sender: 'other',
        type: 'text'
      }
    ]
  },
  {
    id: '6',
    name: 'David Kim',
    avatar: '/placeholder.svg',
    lastMessage: 'Thanks for the code review!',
    timestamp: '2024-01-12T09:45:00Z',
    unreadCount: 0,
    isOnline: false,
    lastSeen: '3 days ago',
    type: 'developer',
    messages: [
      {
        id: '6-1',
        text: 'Could you take a look at my React component?',
        timestamp: '2024-01-12T09:00:00Z',
        sender: 'other',
        type: 'text'
      },
      {
        id: '6-2',
        text: 'Sure! Send me the code.',
        timestamp: '2024-01-12T09:15:00Z',
        sender: 'me',
        type: 'text'
      },
      {
        id: '6-3',
        text: 'Thanks for the code review!',
        timestamp: '2024-01-12T09:45:00Z',
        sender: 'other',
        type: 'text'
      }
    ]
  }
];
