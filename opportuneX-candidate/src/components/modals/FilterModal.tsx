import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterModal = ({ open, closeModal }) => {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    jobTypes: "",
    skill: "",
    compnay: "",
  });
  const containerRef = useRef(null);

  const handleCheckboxChange = (type: "jobTypes" | "skill", value: string) => {
    setFilters((prev) => {
      if (type === "jobTypes") {
        return { ...prev, jobTypes: value };
      }
      if (type === "skill") {
        return { ...prev, skill: value };
      }
    });
  };

  //   {
  //     "keyword": "react",
  //     "category": "Development",
  //     "location": "USA,NewYork",
  //     "fluency": "Professional",
  //     "salaryMin": "",
  //     "salaryMax": "",
  //     "jobTypes": [
  //         "Part time"
  //     ],
  //     "experience": [
  //         "Fresher"
  //     ]
  // }

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const convertFiltersToParams = (filters) => {
    const params = new URLSearchParams();

    if (filters.category)
      params.set("category", filters.category.replace(/\s+/g, "-"));
    if (filters.location)
      params.set("location", filters.location.replace(/\s+/g, "-"));

    if (filters.skill) params.set("skill", filters.skill.replace(/\s+/g, "-"));

    return params.toString();
  };

  const handleApply = () => {
    // console.log("Applied Filters:", filters);

    // Create a new URLSearchParams object
    const params = convertFiltersToParams(filters); // for example: category=dev&location=delhi&experience=mid+senior
    console.log(params);

    // Update the URL with new query params
    navigate(`?${params.toString()}`);

    // Close modal
    closeModal();
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      location: "",
      jobTypes: "",
      skill: "",
      compnay: "",
    });
  };
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        if (
          e.target !== containerRef.current &&
          containerRef.current &&
          !containerRef.current.contains(e.target)
        ) {
          closeModal();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        ref={containerRef}
        className="max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white p-6 w-full max-w-5xl relative"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 cursor-pointer text-zinc-600 dark:text-zinc-300 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Filter By</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category */}
          <div>
            <label className="block mb-1 text-sm">Category</label>
            <Select
              onValueChange={(value) =>
                setFilters({ ...filters, category: value })
              }
            >
              <SelectTrigger className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white border-none">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white">
                <SelectItem value="Accounting">Accounting</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 text-sm">Location</label>
            <Select
              onValueChange={(value) =>
                setFilters({ ...filters, location: value })
              }
            >
              <SelectTrigger className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white border-none">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white">
                <SelectItem value="california">USA, California</SelectItem>
                <SelectItem value="newYork">USA, New York</SelectItem>
                <SelectItem value="canada">Canada, Toronto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fluency */}
        </div>

        {/* Job Type & Experience */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2 text-sm font-medium">Job Type</p>
            {["Fulltime", "Part time", "Fixed-Price", "Freelance"].map(
              (type) => (
                <label key={type} className="flex items-center space-x-2 mb-1">
                  <Checkbox
                    checked={filters.jobTypes.includes(type)}
                    onCheckedChange={() =>
                      handleCheckboxChange("jobTypes", type)
                    }
                  />
                  <span>{type}</span>
                </label>
              )
            )}
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Skills </p>
            {["react", "node js", "javascript", "nextjs", "java", "python"].map(
              (exp) => (
                <label key={exp} className="flex items-center space-x-2 mb-1">
                  <Checkbox
                    checked={filters.skill === exp}
                    onCheckedChange={() => handleCheckboxChange("skill", exp)}
                  />
                  <span>{exp}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Salary Range */}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <Button
            variant="secondary"
            className="bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
            onClick={resetFilters}
          >
            Reset Filter
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleApply}
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
