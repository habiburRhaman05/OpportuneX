
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface CompanyFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  initialFilters: Record<string, string>;
}

const CompanyFiltersModal = ({
  isOpen,
  onClose,
  onApply,
  initialFilters
}: CompanyFiltersModalProps) => {
  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setFilters({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            Filter Companies
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <label htmlFor="industry" className="text-sm font-medium">
              Industry
            </label>
            <Select
              value={filters.industry || ""}
              onValueChange={(value) => handleFilterChange("industry", value)}
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="size" className="text-sm font-medium">
              Company Size
            </label>
            <Select
              value={filters.size || ""}
              onValueChange={(value) => handleFilterChange("size", value)}
            >
              <SelectTrigger id="size">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sizes</SelectItem>
                <SelectItem value="1-50">1-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="501-1000">501-1000 employees</SelectItem>
                <SelectItem value="1000+">1000+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Select
              value={filters.location || ""}
              onValueChange={(value) => handleFilterChange("location", value)}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="London">London</SelectItem>
                <SelectItem value="Berlin">Berlin</SelectItem>
                <SelectItem value="Tokyo">Tokyo</SelectItem>
                <SelectItem value="Singapore">Singapore</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="founded" className="text-sm font-medium">
              Founded
            </label>
            <Select
              value={filters.founded || ""}
              onValueChange={(value) => handleFilterChange("founded", value)}
            >
              <SelectTrigger id="founded">
                <SelectValue placeholder="Select founding year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Year</SelectItem>
                <SelectItem value="2020+">2020 & Later</SelectItem>
                <SelectItem value="2015-2020">2015-2020</SelectItem>
                <SelectItem value="2010-2015">2010-2015</SelectItem>
                <SelectItem value="2000-2010">2000-2010</SelectItem>
                <SelectItem value="<2000">Before 2000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter className="flex sm:justify-between sm:space-x-2 pt-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={() => onApply(filters)}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyFiltersModal;
