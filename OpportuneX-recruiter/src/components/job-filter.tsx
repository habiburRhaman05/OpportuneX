import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import AutoCompleteSearchBar from "./AutoCompleteBar";

interface JobFilterProps {
  filters: {
    status: string;
    type: string;
    search: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
}

export function JobFilter({ filters, onFilterChange }: JobFilterProps) {
  const handleSelect = (value) => {
    onFilterChange("search", value);
  };
  return (
    <Card className="p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <AutoCompleteSearchBar
          key={"search"}
          value={filters.search}
          handleSelect={handleSelect}
          className={"relative"}
        />
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.type}
          onValueChange={(value) => onFilterChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Freelance">Freelance</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
