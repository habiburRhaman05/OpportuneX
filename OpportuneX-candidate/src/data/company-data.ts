
export interface CompanyType {
  id: number;
  name: string;
  logo?: string;
  industry: string;
  description: string;
  location: string;
  size: string;
  founded: number;
  website: string;
  featured: boolean;
  jobCount: number;
}

export const companyData: CompanyType[] = [
  {
    id: 1,
    name: "TechVision Solutions",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueSUyMGxvZ298ZW58MHx8MHx8fDA%3D",
    industry: "Technology",
    description: "Leading software development company specializing in AI and machine learning solutions.",
    location: "San Francisco",
    size: "201-500",
    founded: 2015,
    website: "https://techvisionsolutions.com",
    featured: true,
    jobCount: 24
  },
  {
    id: 2,
    name: "HealthPlus Medical",
    logo: "https://images.unsplash.com/photo-1581512798638-8460f6e52608?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhbHRoY2FyZSUyMGxvZ298ZW58MHx8MHx8fDA%3D",
    industry: "Healthcare",
    description: "Innovative healthcare provider focused on patient-centered care and medical technology.",
    location: "Boston",
    size: "501-1000",
    founded: 2010,
    website: "https://healthplusmedical.com",
    featured: true,
    jobCount: 18
  },
  {
    id: 3,
    name: "FinEdge Capital",
    logo: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jZSUyMGxvZ298ZW58MHx8MHx8fDA%3D",
    industry: "Finance",
    description: "Digital-first financial services firm specializing in investment management and financial planning.",
    location: "New York",
    size: "51-200",
    founded: 2018,
    website: "https://finedgecapital.com",
    featured: false,
    jobCount: 12
  },
  {
    id: 4,
    name: "EduLearn Academy",
    industry: "Education",
    description: "Online education platform offering courses in technology, business, and creative arts.",
    location: "Remote",
    size: "1-50",
    founded: 2019,
    website: "https://edulearn.academy",
    featured: false,
    jobCount: 8
  },
  {
    id: 5,
    name: "ShopWave Commerce",
    logo: "https://images.unsplash.com/photo-1622473590773-f588134b6ce9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D",
    industry: "E-commerce",
    description: "Leading e-commerce platform for fashion and lifestyle products.",
    location: "London",
    size: "201-500",
    founded: 2012,
    website: "https://shopwave.com",
    featured: true,
    jobCount: 15
  },
  {
    id: 6,
    name: "InnoManufacture",
    industry: "Manufacturing",
    description: "Innovative manufacturing company specializing in sustainable production methods.",
    location: "Detroit",
    size: "501-1000",
    founded: 2005,
    website: "https://innomanufacture.com",
    featured: false,
    jobCount: 22
  },
  {
    id: 7,
    name: "DataSphere Analytics",
    logo: "https://images.unsplash.com/photo-1593569902332-826bfcfe8bf8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2hub2xvZ3klMjBsb2dvfGVufDB8fDB8fHww",
    industry: "Technology",
    description: "Data analytics company helping businesses make data-driven decisions.",
    location: "Berlin",
    size: "51-200",
    founded: 2017,
    website: "https://datasphere.io",
    featured: false,
    jobCount: 11
  },
  {
    id: 8,
    name: "MediTech Innovations",
    industry: "Healthcare",
    description: "Medical technology company developing cutting-edge healthcare devices.",
    location: "Singapore",
    size: "51-200",
    founded: 2016,
    website: "https://meditechinnovations.com",
    featured: false,
    jobCount: 9
  },
  {
    id: 9,
    name: "GlobalBank Financial",
    logo: "https://images.unsplash.com/photo-1593672755342-741a7f868732?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbmslMjBsb2dvfGVufDB8fDB8fHww",
    industry: "Finance",
    description: "International banking and financial services corporation with emphasis on sustainable banking.",
    location: "Tokyo",
    size: "1000+",
    founded: 1998,
    website: "https://globalbank.finance",
    featured: true,
    jobCount: 32
  },
  {
    id: 10,
    name: "LearnSphere",
    industry: "Education",
    description: "Educational technology company providing interactive learning solutions for K-12 schools.",
    location: "Chicago",
    size: "51-200",
    founded: 2014,
    website: "https://learnsphere.edu",
    featured: false,
    jobCount: 7
  },
  {
    id: 11,
    name: "RetailNext",
    industry: "E-commerce",
    description: "Next-generation retail platform combining online and offline shopping experiences.",
    location: "Seattle",
    size: "201-500",
    founded: 2011,
    website: "https://retailnext.shop",
    featured: false,
    jobCount: 13
  },
  {
    id: 12,
    name: "GreenTech Manufacturing",
    logo: "https://images.unsplash.com/photo-1620283085439-39620a1e21c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyZWVuJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D",
    industry: "Manufacturing",
    description: "Sustainable manufacturing company focused on eco-friendly production processes.",
    location: "Portland",
    size: "201-500",
    founded: 2009,
    website: "https://greentechmfg.com",
    featured: true,
    jobCount: 19
  },
  {
    id: 13,
    name: "CloudSoft Solutions",
    industry: "Technology",
    description: "Cloud computing company offering infrastructure and platform services.",
    location: "Austin",
    size: "51-200",
    founded: 2015,
    website: "https://cloudsoftsolutions.com",
    featured: false,
    jobCount: 16
  },
  {
    id: 14,
    name: "BioHealth Research",
    industry: "Healthcare",
    description: "Biotech research company focused on developing innovative medical treatments.",
    location: "Cambridge",
    size: "51-200",
    founded: 2013,
    website: "https://biohealthresearch.com",
    featured: false,
    jobCount: 8
  },
  {
    id: 15,
    name: "InvestWise",
    industry: "Finance",
    description: "Financial technology company providing automated investment services.",
    location: "Remote",
    size: "1-50",
    founded: 2020,
    website: "https://investwise.io",
    featured: false,
    jobCount: 5
  },
  {
    id: 16,
    name: "EduTech Pioneers",
    logo: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
    industry: "Education",
    description: "Educational technology company developing AI-powered learning tools.",
    location: "Toronto",
    size: "51-200",
    founded: 2016,
    website: "https://edutechpioneers.com",
    featured: true,
    jobCount: 14
  }
];
