
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface JobSortMenuProps {
  activeSort: string;
  onSortChange: (value: string) => void;
}

export const JobSortMenu = ({ activeSort, onSortChange }: JobSortMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          <span>Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuRadioGroup value={activeSort} onValueChange={onSortChange}>
          <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="salary-high">Salary: High to Low</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="salary-low">Salary: Low to High</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
