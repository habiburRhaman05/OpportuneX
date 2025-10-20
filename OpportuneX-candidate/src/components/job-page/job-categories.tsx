import { useApiQuery } from "@/hooks/useApi";
import React from "react";
import { Link } from "react-router-dom";

const JobCategoriesList = () => {
  const { data: jobData, isLoading } = useApiQuery({
    url: "/job/categories",
    queryKey: ["fetch-job-cattegories"],
    enabled: true,
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {isLoading ? (
        <div>Loading...</div>
      ) : jobData?.data.length > 0 ? (
        jobData?.data?.slice(0, 6).map((category, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 transition-transform hover:scale-105 shadow-sm"
          >
            <h3 className="font-semibold text-sm">{category.name}</h3>
            <p className="text-xs text-shimmer-primary mt-2">
              {category.jobCount} jobs
            </p>
          </div>
        ))
      ) : (
        <div>no categories found</div>
      )}
      <Link to={""} className="underline text-blue-500">
        View All Categories
      </Link>
    </div>
  );
};

export default JobCategoriesList;
