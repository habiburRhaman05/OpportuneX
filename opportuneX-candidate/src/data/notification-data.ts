
export interface Notification {
  id: string;
  title: string;
  company: string;
  companyIcon: string;
  date: string;
  message: string;
  isRead: boolean;
  type: 'job' | 'message' | 'application' | 'interview';
}

export const notificationsData: Notification[] = [
  {
    id: "1",
    title: "New Job Application",
    company: "Google",
    companyIcon: "🏢",
    date: "2 hours ago",
    message: "Your application for Senior Frontend Developer position has been received and is under review by our hiring team.",
    isRead: false,
    type: "application"
  },
  {
    id: "2",
    title: "Interview Scheduled",
    company: "Microsoft",
    companyIcon: "💼",
    date: "4 hours ago",
    message: "We're excited to schedule your technical interview for the React Developer position. Please check your email for meeting details.",
    isRead: false,
    type: "interview"
  },
  {
    id: "3",
    title: "Message from Recruiter",
    company: "Apple",
    companyIcon: "🍎",
    date: "1 day ago",
    message: "Hi there! I reviewed your profile and would love to discuss an exciting opportunity with our iOS development team. When would be a good time to connect?",
    isRead: true,
    type: "message"
  },
  {
    id: "4",
    title: "Job Match Found",
    company: "Meta",
    companyIcon: "📱",
    date: "2 days ago",
    message: "Based on your skills and preferences, we found 3 new job matches that might interest you. Check them out!",
    isRead: true,
    type: "job"
  },
  {
    id: "5",
    title: "Application Update",
    company: "Netflix",
    companyIcon: "🎬",
    date: "3 days ago",
    message: "Your application status has been updated. The hiring manager is impressed with your portfolio and wants to move forward with the next steps.",
    isRead: false,
    type: "application"
  },
  {
    id: "6",
    title: "New Message",
    company: "Spotify",
    companyIcon: "🎵",
    date: "1 week ago",
    message: "Thank you for your interest in joining our team. We'll be in touch soon with updates about your application for the Backend Engineer position.",
    isRead: true,
    type: "message"
  },
  {
    id: "7",
    title: "Interview Feedback",
    company: "Amazon",
    companyIcon: "📦",
    date: "1 week ago",
    message: "Thank you for taking the time to interview with us. We appreciate your interest and will follow up with next steps within the next few days.",
    isRead: true,
    type: "interview"
  },
  {
    id: "8",
    title: "Profile Viewed",
    company: "Tesla",
    companyIcon: "⚡",
    date: "2 weeks ago",
    message: "A recruiter from Tesla viewed your profile. Make sure your skills and experience are up to date to increase your chances of getting contacted.",
    isRead: true,
    type: "job"
  },
  {
    id: "9",
    title: "Application Submitted",
    company: "Uber",
    companyIcon: "🚗",
    date: "2 weeks ago",
    message: "Your application for Software Engineer position has been successfully submitted. You'll hear back from us within 1-2 weeks.",
    isRead: true,
    type: "application"
  },
  {
    id: "10",
    title: "New Job Alert",
    company: "Airbnb",
    companyIcon: "🏠",
    date: "3 weeks ago",
    message: "New remote opportunities matching your criteria are available. Don't miss out on these exciting positions!",
    isRead: true,
    type: "job"
  },
  {
    id: "11",
    title: "Message from HR",
    company: "LinkedIn",
    companyIcon: "💼",
    date: "3 weeks ago",
    message: "We'd love to learn more about your background and discuss potential opportunities within our engineering team.",
    isRead: true,
    type: "message"
  },
  {
    id: "12",
    title: "Interview Reminder",
    company: "Slack",
    companyIcon: "💬",
    date: "1 month ago",
    message: "This is a friendly reminder about your upcoming interview tomorrow at 2 PM. We're looking forward to speaking with you!",
    isRead: true,
    type: "interview"
  }
];
