import { Education, Experience } from "./user.type";

export type Job = {
  _id: string;
  title: string;
  location: string;
  description: string;
  responsibility: {
    title: string;
    list: string[];
  };
  status: string;
  requirements: {
    education: Education[];
    experience: Experience[];
    skills: string[];
  };
  type: string;
  company: {
    _id: string;
    name: string;
    logo: string;
    companyDescription: string;
  };
  postedAt: string;
  appliedDeadLine: string;
};
