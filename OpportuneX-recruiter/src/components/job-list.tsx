import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "@/store/useJobStore";
import { routes } from "@/lib/clientRoutes";

interface JobListProps {
  filters: {
    status: string;
    type: string;
    search: string;
  };
}

export function JobList({ data }) {
  const navigate = useNavigate();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>

            <TableHead>Status</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length > 0 ? (
            data?.map((job) => (
              <TableRow key={job?._id}>
                <TableCell className="font-medium">
                  <a
                    className="cursor-pointer hover:text-primary hover:underline"
                    onClick={() => navigate(`/jobs/${job?._id}`)}
                  >
                    {job?.title}
                  </a>
                </TableCell>
                <TableCell>{job?.location}</TableCell>
                <TableCell>{job?.type}</TableCell>
                {/* <TableCell>${job?.salary.toLocaleString()}</TableCell> */}
                <TableCell>
                  <Badge
                    variant={job?.status === "open" ? "default" : "secondary"}
                  >
                    {job?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* {formatDistance(new Date(job?.postedDate), new Date(), {
                    addSuffix: true,
                  })} */}
                  25-09-2025
                </TableCell>
                <TableCell className="text-right flex flex-col gap-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(`${routes.posted_jobs_page}/${job?._id}`)
                    }
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-10 text-muted-foreground"
              >
                No jobs match your filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
