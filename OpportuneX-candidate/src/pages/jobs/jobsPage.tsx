import { useState } from "react";

import JobCard from "@/components/job-page/job-card";
import JobFiltersDrawer from "@/components/job-page/job-filters-drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

import { JobSortMenu } from "@/components/job-page/job-sort-menu";
import { useApiQuery } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { FilterIcon, XIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  // Active filters from URL params
  const activeLocation = searchParams.get("location") || "";
  const activeType = searchParams.get("type") || "";
  const activeExperience = searchParams.get("experience") || "";
  const activeSort = searchParams.get("sort") || "relevance";

  // Handle filter application
  const applyFilters = (filters: {
    location?: string;
    type?: string;
    experience?: string;
  }) => {
    const params = new URLSearchParams(searchParams);

    if (filters.location) {
      params.set("location", filters.location);
    } else {
      params.delete("location");
    }

    if (filters.type) {
      params.set("type", filters.type);
    } else {
      params.delete("type");
    }

    if (filters.experience) {
      params.set("experience", filters.experience);
    } else {
      params.delete("experience");
    }

    setSearchParams(params);
    setIsFiltersOpen(false);
  };

  // Handle sort change
  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortValue);
    setSearchParams(params);
  };

  // Clear a single filter
  const clearFilter = (filterName: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(filterName);
    setSearchParams(params);
  };

  // Clear all filters
  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("q", searchTerm);
    }
    setSearchParams(params);
  };

  // Handle pagination change
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (page) {
      params.set("page", page.toString());
    }
    setSearchParams(params);

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelect = (data) => {
    const params = new URLSearchParams(searchParams);
    if (data) {
      params.set("search", data);
    }
    setSearchParams(params);
  };

  const { data: jobData, isLoading } = useApiQuery({
    url: "/job/all",
    queryKey: ["fetch-job-data", searchParams.toString()],
    enabled: true,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Header section with categories */}
        <section className="bg-gradient-to-r from-shimmer-primary/20 to-shimmer-secondary/20 dark:from-shimmer-dark dark:to-shimmer-dark/80 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Find Your Dream Job
            </h1>
            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="relative flex-grow w-full">
                {/* <AutoCompleteSearchBar
                  key={"search"}
                  url={"/job/search"}
                  //   placeholder="Search for jobs, companies, or technologies..."
                  value={searchTerm}
                  className="w-full"
                  handleSelect={handleSelect}
                /> */}
              </div>

              <div className="flex gap-2 w-full md:w-auto justify-end">
                <Button
                  onClick={() => setIsFiltersOpen(true)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FilterIcon className="w-4 h-4" />
                  <span>Filters</span>
                </Button>

                <JobSortMenu
                  activeSort={activeSort}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content section */}

        <div className="container mx-auto p-4">
          {/* Active filters */}
          {(activeLocation || activeType || activeExperience) && (
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Active filters:
                </span>

                {activeLocation && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5"
                  >
                    Location: {activeLocation}
                    <button
                      onClick={() => clearFilter("location")}
                      className="ml-1 hover:text-destructive"
                    >
                      <XIcon size={14} />
                    </button>
                  </Badge>
                )}

                {activeType && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5"
                  >
                    Type: {activeType}
                    <button
                      onClick={() => clearFilter("type")}
                      className="ml-1 hover:text-destructive"
                    >
                      <XIcon size={14} />
                    </button>
                  </Badge>
                )}

                {activeExperience && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5"
                  >
                    Experience: {activeExperience}
                    <button
                      onClick={() => clearFilter("experience")}
                      className="ml-1 hover:text-destructive"
                    >
                      <XIcon size={14} />
                    </button>
                  </Badge>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-sm text-shimmer-primary hover:text-shimmer-secondary"
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {jobData?.data?.length}{" "}
            {jobData?.data?.length === 1 ? "job" : "jobs"} found
          </p>

          {isLoading ? (
            // Skeleton loading state - Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-100 dark:border-gray-800 rounded-xl h-full"
                >
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/4" />
                      <div className="flex gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Job listings - Grid View */}
              {jobData?.data?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {jobData?.data?.map((job, index) => (
                    <div
                      key={job.id}
                      className="border border-gray-100 dark:border-gray-800 rounded-xl p-6 transition-shadow hover:shadow-md h-full"
                    >
                      <JobCard
                        id={job._id}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        salary={"55"}
                        type={job.type}
                        logo={job.logo}
                        postedAt={job.postedAt}
                        featured={job.featured}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4 text-6xl">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">
                    No matching jobs found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your search filters
                  </p>
                  <Button onClick={clearAllFilters}>Clear all filters</Button>
                </div>
              )}

              {/* Pagination */}
              {jobData?.data?.length > 0 && (
                <div className="mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                          }
                          className={cn(
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          )}
                        />
                      </PaginationItem>

                      {Array.from(
                        { length: Math.min(5, jobData?.totalPages) },
                        (_, i) => {
                          // Logic for showing pagination links near current page
                          let pageNum;
                          if (jobData?.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= jobData?.totalPages - 2) {
                            pageNum = jobData?.totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <PaginationItem key={i}>
                              <PaginationLink
                                onClick={() => handlePageChange(pageNum)}
                                isActive={pageNum === currentPage}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            handlePageChange(
                              Math.min(jobData?.totalPages, currentPage + 1)
                            )
                          }
                          className={cn(
                            currentPage === jobData?.totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          )}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <JobFiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        activeLocation={activeLocation}
        activeType={activeType}
        activeExperience={activeExperience}
        onApply={applyFilters}
      />
    </div>
  );
};

export default Jobs;
