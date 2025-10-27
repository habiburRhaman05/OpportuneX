import { JobList } from "@/components/job-list";
import { JobFilter } from "@/components/job-filter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApi";
import JobListingPageSkelection from "@/components/skelections/JobListingPageSkelection";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { queryClientIns } from "@/components/QueryClientWrapper";
import { routes } from "@/lib/clientRoutes";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/context/AuthContext";

const PostedJobsListingPage = () => {
  const [params, setParams] = useSearchParams();
  const newParams = new URLSearchParams(params);
  const { recruiter } = useUser();
  const [filters, setFilters] = useState({
    status: params.get("status") || "all",
    type: params.get("type") || "all",
    search: params.get("search") || "",
  });
  const navigate = useNavigate();

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    newParams.set(filterName, value);
    setParams(newParams);
  };
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);

  const { refetch, data, isLoading, error } = useApiQuery<{ data: any }>({
    url: `/job/${recruiter.company._id}/posted-jobs?` + newParams.toString(),
    queryKey: ["posted-jobs-data", filters],
    enabled: true,
    refetchOnMount: false,
    staleTime: 5,
    cacheTime: 5,
  });

  const per_page = 10;
  const totalPages = Math.round(data?.data?.length / per_page);

  useEffect(() => {
    const page = params.get("page");
    if (!page) {
      setCurrentPage(1);
      newParams.set("page", "1");
      setParams(newParams);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Jobs</h1>
          <p className="text-muted-foreground">
            Browse and manage job listings
          </p>
        </div>
        <Button onClick={() => navigate(routes.post_new_job_page)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      <JobFilter filters={filters} onFilterChange={handleFilterChange} />

      <div className="rounded-lg border bg-card ">
        {isLoading ? (
          <JobListingPageSkelection asChild={true} />
        ) : (
          <JobList data={data?.data} />
        )}
      </div>

      {/* Pagination */}
      {data?.data?.length > per_page && (
        <div className="my-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="mr-8">
                <PaginationLink
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  Previous
                </PaginationLink>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => {
                // Logic for showing pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={async () => {
                        setCurrentPage(pageNum);
                        newParams.set("page", pageNum);
                        setParams(newParams);
                        refetch();
                        queryClientIns.removeQueries({
                          queryKey: ["posted-jobs-data"],
                        });
                        // await refetch({ cancelRefetch: true });
                      }}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem className="ml-8">
                <PaginationLink
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  // disabled={currentPage === totalPages}
                  className={
                    currentPage === 8
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default PostedJobsListingPage;
