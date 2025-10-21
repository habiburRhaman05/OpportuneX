import AutoCompleteSearchBar from "@/components/AutoCompleteBar";
import { queryClientIns } from "@/components/QueryClientWrapper";

import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useApiQuery } from "@/hooks/useApi";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ApplicationsPage = () => {
  const [params, setParams] = useSearchParams();
  const newParams = new URLSearchParams();
  const [inputValue, setInputValue] = useState(params.get("search") || "");

  const handleSelect = (value) => {
    setInputValue(value);
    newParams.set("search", value);
    setParams(newParams);
  };
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const queryString = `${inputValue ? `search=${inputValue.trim()}` : ""}`;
  const per_page = 10;
  const { refetch, data, isLoading, error } = useApiQuery({
    url: "/job/all-applications",
    queryKey: ["applications-data", params.toString()],
    enabled: true,
  });
  const totalPages = Math.round(data?.data?.length / per_page);
  return (
    <div className="p-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          All Applications and Posted Jobs
        </h1>
        <p className="text-muted-foreground">
          Here you can find your all posted-jobs and how many candidate apply on
          you job also see how many job current active{" "}
        </p>
      </div>
      <div>
        <div className="grid place-content-between w-full border rounded-md p-4 grid-cols-5    ">
          <div className="col-span-2 flex gap-x-3">
            <AutoCompleteSearchBar
              key={"search"}
              value={inputValue}
              handleSelect={handleSelect}
              className={"relative w-full"}
            />
          </div>
          <div className="col-span-3 p-2 flex  justify-end">
            <div className="w-[150px]">
              <Select>
                <SelectTrigger>
                  <div className="flex gap-x-3">
                    <span>Letast</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Letest</SelectItem>
                  <SelectItem value="most-applied">Most Applied</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : data?.data?.length > 0 ? (
          data?.data?.map((application) => {
            return (
              <div
                key={application._id}
                className="mt-8 p-4 border rounded-md md:flex items-center "
              >
                <div className=" md:w-[80%]">
                  <h1 className="text-2xl text-zinc-300 font-bold mb-2">
                    {application?.jobTitle}
                  </h1>
                  <h4 className="text-zinc-400">{application?.description}</h4>
                  <h5 className="text-zinc-400 mt-2">
                    Location : Dhaka,Bangladesh
                  </h5>
                  <h5 className="text-blue-400 mt-2">
                    Total : <Badge> {application?.totalApplication}</Badge>{" "}
                    application
                  </h5>
                </div>
                <div className="flex items-center justify-end flex-1">
                  <Link
                    to={"/recruiter/applications/164631646461"}
                    className="md:mt-0 mt-3 text-blue-500 underline text-end"
                  >
                    View Applications
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>no application found</p>
        )}

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
                            queryKey: ["applications-data"],
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
    </div>
  );
};

export default ApplicationsPage;
