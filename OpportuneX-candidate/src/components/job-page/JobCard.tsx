import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
// import { convertTimestampToReadableDate } from "./../../utils/index";
import { Description } from "@radix-ui/react-dialog";
import { convertTimestampToReadableDate } from "@/utils";

// Utility function to generate dark mode-friendly random background color
const getRandomColor = () => {
  const lightColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-purple-500",
    "bg-indigo-500",
  ];
  const darkColors = [
    "bg-gray-700",
    "bg-blue-800",
    "bg-green-800",
    "bg-purple-800",
    "bg-teal-800",
  ];

  // Randomly select from light or dark color sets based on the theme
  if (document.documentElement.classList.contains("dark")) {
    return darkColors[Math.floor(Math.random() * darkColors.length)];
  }

  return lightColors[Math.floor(Math.random() * lightColors.length)];
};

export interface JobResponsibility {
  title: string;
  list: string[];
}

export interface JobCardProps {
  category: string;
  title: string;
  salary: number;
  skills: string[];
  companyName: string;
  responsibilities: JobResponsibility[];
  description: string;
  date: string; // milliseconds format (e.g., new Date(parseInt(date)))
  role: string;
}

export const JobCard = ({
  companyName,
  date,
  salary,
  location,
  keywords,
  role,
  description,
  title,
}) => {
  const randomBgColor = getRandomColor(); // Get a random background color based on theme
  const readableDate = convertTimestampToReadableDate(parseInt(date));

  return (
    <div
      className={`  ${randomBgColor} dark:bg-zinc-900 p-6 rounded-lg shadow-md`}
    >
      <div className="flex justify-between mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {readableDate}
        </span>
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Bookmark size={18} />
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-1 text-gray-800 dark:text-white">{title}</h3>
        <p>
          {role}
          <span className="text-gray-500 dark:text-gray-400"> at </span>
          <span className="font-bold text-blue-700 ml-2">{companyName}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {keywords?.map((tag, i) => (
          <span
            key={i}
            className="tag text-sm text-white bg-gray-600 dark:bg-zinc-500 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {location}
          </div>
          <div className="font-medium text-gray-800 dark:text-white">
            {salary}
          </div>
        </div>
        <Link
          to={"/jobs/4"}
          className="px-4 py-1.5 bg-black text-white rounded-lg text-sm hover:bg-gray-800 dark:hover:bg-gray-700"
        >
          Details
        </Link>
      </div>
    </div>
  );
};
