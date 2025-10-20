import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  FilterX,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const SearchCandidatesPage = () => {
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample developer data
  const developers = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Full Stack Developer",
      location: "San Francisco, CA",
      experience: "5 years",
      degree: "BS Computer Science",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      availability: "Full-time",
    },
    {
      id: 2,
      name: "Sarah Williams",
      title: "Frontend Developer",
      location: "New York, NY",
      experience: "3 years",
      degree: "MS Information Technology",
      skills: ["React", "Vue.js", "JavaScript", "HTML/CSS"],
      availability: "Part-time",
    },
    {
      id: 3,
      name: "Michael Brown",
      title: "Backend Engineer",
      location: "Seattle, WA",
      experience: "7 years",
      degree: "PhD Computer Science",
      skills: ["Java", "Spring Boot", "AWS", "PostgreSQL"],
      availability: "Contract",
    },
    {
      id: 4,
      name: "Emily Davis",
      title: "Mobile Developer",
      location: "Austin, TX",
      experience: "4 years",
      degree: "BS Software Engineering",
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      availability: "Full-time",
    },
    {
      id: 5,
      name: "Daniel Wilson",
      title: "DevOps Engineer",
      location: "Chicago, IL",
      experience: "6 years",
      degree: "MS Cloud Computing",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      availability: "Remote",
    },
  ];

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    skills: "",
    location: "",
    experience: "",
    degree: "",
    availability: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      skills: "",
      location: "",
      experience: "",
      degree: "",
      availability: "",
    });
  };

  const toggleFilters = () => {
    setIsFilterOpen(true);
  };

  // Filter the developers based on the criteria
  const filteredDevelopers = developers.filter((dev) => {
    const matchesSearch =
      filters.search === "" ||
      dev.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      dev.title.toLowerCase().includes(filters.search.toLowerCase());

    const matchesSkills =
      filters.skills === "" ||
      dev.skills.some((skill) =>
        skill.toLowerCase().includes(filters.skills.toLowerCase())
      );

    const matchesLocation =
      filters.location === "" ||
      dev.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesExperience =
      filters.experience === "" || dev.experience.includes(filters.experience);

    const matchesDegree =
      filters.degree === "" ||
      dev.degree.toLowerCase().includes(filters.degree.toLowerCase());

    const matchesAvailability =
      filters.availability === "" || dev.availability === filters.availability;

    return (
      matchesSearch &&
      matchesSkills &&
      matchesLocation &&
      matchesExperience &&
      matchesDegree &&
      matchesAvailability
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Find Candidates</h1>
            <p className="text-muted-foreground">
              Search for talented developers based on skills, experience, and
              more
            </p>
          </div>
        </div>

        <div className=" ">
          {/* Results Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={toggleFilters}>
                <Filter className="h-4 w-4 mr-2" />
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </Button>
              <p className="text-muted-foreground">
                {filteredDevelopers.length} candidates found
              </p>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="experience-desc">
                    Experience (High to Low)
                  </SelectItem>
                  <SelectItem value="experience-asc">
                    Experience (Low to High)
                  </SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredDevelopers.length > 0 ? (
              <div className="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
                {filteredDevelopers.map((dev) => (
                  <Card
                    key={dev.id}
                    className="overflow-hidden hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {dev.name}
                            </h3>
                            <p className="text-muted-foreground">{dev.title}</p>
                          </div>
                          <div className="flex items-center mt-2 sm:mt-0">
                            <Badge variant="outline" className="ml-auto">
                              {dev.availability}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{dev.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>{dev.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span>{dev.degree}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {dev.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 flex justify-end">
                        <Button size="sm">View Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="py-12">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-medium mb-2">
                    No candidates found
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    We couldn't find any developers matching your search
                    criteria. Try adjusting your filters or search term.
                  </p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* ffilter model  */}
        <Dialog
          open={isFilterOpen}
          onOpenChange={(value) => setIsFilterOpen(value)}
        >
          <DialogContent>
            <div className="h-fit sticky top-4 animate-fade-in">
              <div className="p-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by name or title"
                        className="pl-9"
                        value={filters.search}
                        onChange={(e) =>
                          handleFilterChange("search", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    <div className="relative">
                      <Code className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="skills"
                        placeholder="E.g. React, Python, AWS"
                        className="pl-9"
                        value={filters.skills}
                        onChange={(e) =>
                          handleFilterChange("skills", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="City, state, or country"
                        className="pl-9"
                        value={filters.location}
                        onChange={(e) =>
                          handleFilterChange("location", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Select
                      value={filters.experience}
                      onValueChange={(value) =>
                        handleFilterChange("experience", value)
                      }
                    >
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 year">1 year</SelectItem>
                        <SelectItem value="2 years">2 years</SelectItem>
                        <SelectItem value="3 years">3 years</SelectItem>
                        <SelectItem value="4 years">4 years</SelectItem>
                        <SelectItem value="5 years">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="degree">Education</Label>
                    <Select
                      value={filters.degree}
                      onValueChange={(value) =>
                        handleFilterChange("degree", value)
                      }
                    >
                      <SelectTrigger id="degree">
                        <SelectValue placeholder="Degree level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BS">Bachelor's Degree</SelectItem>
                        <SelectItem value="MS">Master's Degree</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                        <SelectItem value="Self-taught">Self-taught</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={filters.availability}
                      onValueChange={(value) =>
                        handleFilterChange("availability", value)
                      }
                    >
                      <SelectTrigger id="availability">
                        <SelectValue placeholder="Type of employment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full mt-2">Apply Filters</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default SearchCandidatesPage;
