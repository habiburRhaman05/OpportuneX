
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface JobFiltersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activeLocation: string;
  activeType: string;
  activeExperience: string;
  onApply: (filters: { location?: string; type?: string; experience?: string }) => void;
}

const JobFiltersDrawer = ({
  isOpen,
  onClose,
  activeLocation,
  activeType,
  activeExperience,
  onApply
}: JobFiltersDialogProps) => {
  const [location, setLocation] = useState(activeLocation);
  const [jobType, setJobType] = useState(activeType);
  const [experience, setExperience] = useState(activeExperience);
  
  const handleApply = () => {
    onApply({
      location,
      type: jobType,
      experience
    });
  };
  
  const handleReset = () => {
    setLocation("");
    setJobType("");
    setExperience("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Jobs</DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          {/* Location filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Location</h3>
            <RadioGroup value={location} onValueChange={setLocation}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Remote" id="location-remote" />
                  <Label htmlFor="location-remote">Remote</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="San Francisco, CA" id="location-sf" />
                  <Label htmlFor="location-sf">San Francisco, CA</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="New York, NY" id="location-ny" />
                  <Label htmlFor="location-ny">New York, NY</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Austin, TX" id="location-austin" />
                  <Label htmlFor="location-austin">Austin, TX</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Boston, MA" id="location-boston" />
                  <Label htmlFor="location-boston">Boston, MA</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="London, UK" id="location-london" />
                  <Label htmlFor="location-london">London, UK</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          {/* Job Type filter */}
          <div className="my-6">
            <h3 className="text-sm font-medium mb-3">Job Type</h3>
            <RadioGroup value={jobType} onValueChange={setJobType}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Full-time" id="type-fulltime" />
                  <Label htmlFor="type-fulltime">Full-time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Part-time" id="type-parttime" />
                  <Label htmlFor="type-parttime">Part-time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Contract" id="type-contract" />
                  <Label htmlFor="type-contract">Contract</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Freelance" id="type-freelance" />
                  <Label htmlFor="type-freelance">Freelance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Internship" id="type-internship" />
                  <Label htmlFor="type-internship">Internship</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          {/* Experience Level filter */}
          <div className="my-6">
            <h3 className="text-sm font-medium mb-3">Experience Level</h3>
            <RadioGroup value={experience} onValueChange={setExperience}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Entry Level" id="exp-entry" />
                  <Label htmlFor="exp-entry">Entry Level</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mid Level" id="exp-mid" />
                  <Label htmlFor="exp-mid">Mid Level</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Senior Level" id="exp-senior" />
                  <Label htmlFor="exp-senior">Senior Level</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Director" id="exp-director" />
                  <Label htmlFor="exp-director">Director</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Executive" id="exp-executive" />
                  <Label htmlFor="exp-executive">Executive</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter className="pt-2">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleReset}>Reset</Button>
            <Button className="flex-1" onClick={handleApply}>Apply Filters</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobFiltersDrawer;
