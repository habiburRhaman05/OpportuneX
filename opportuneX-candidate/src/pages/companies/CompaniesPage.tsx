import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import CompanyCard from "@/components/companies-page/company-card";
import CompanyFiltersModal from "@/components/modals/company-filters-modal";
import { Search, Filter, X } from "lucide-react";
import { companyData } from "@/data/company-data";

const Companies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [companies, setCompanies] = useState(companyData);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 12;

  // Categories for top grid
  const categories = [
    { name: "Technology", count: 45, icon: "💻" },
    { name: "Healthcare", count: 32, icon: "🏥" },
    { name: "Finance", count: 28, icon: "💰" },
    { name: "Education", count: 24, icon: "🎓" },
    { name: "E-commerce", count: 22, icon: "🛒" },
    { name: "Manufacturing", count: 19, icon: "🏭" },
  ];

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Get filters from URL
    const industry = searchParams.get("industry");
    const size = searchParams.get("size");
    const location = searchParams.get("location");

    const newFilters: Record<string, string> = {};
    if (industry) newFilters.industry = industry;
    if (size) newFilters.size = size;
    if (location) newFilters.location = location;

    setActiveFilters(newFilters);

    // Apply filters and search
    filterCompanies(searchParams.get("search") || "", newFilters);
  }, [searchParams]);

  const filterCompanies = (query: string, filters: Record<string, string>) => {
    let filtered = [...companyData];

    // Apply search query
    if (query) {
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(query.toLowerCase()) ||
          company.industry.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(
          (company) =>
            company[key as keyof typeof company]?.toString().toLowerCase() ===
            value.toLowerCase()
        );
      }
    });

    setCompanies(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchParams.set("search", searchQuery);
    setSearchParams(searchParams);
  };

  const handleFilterApply = (newFilters: Record<string, string>) => {
    // Update URL with filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    setSearchParams(searchParams);
    setShowFilters(false);
    setActiveFilters(newFilters);
  };

  const clearFilter = (key: string) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    const search = searchParams.get("search");
    setSearchParams(search ? { search } : {});
  };

  // Pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(companies.length / companiesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50 dark:from-background dark:to-gray-900/20">
      <div className="pt-4 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-plus-jakarta text-center mb-6">
            <span className="gradient-text">Discover Top Companies</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Explore leading companies across various industries. Find your dream
            workplace with our comprehensive company directory.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm"
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <span className="text-3xl mb-2">{category.icon}</span>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.count} companies
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="relative flex-grow w-full sm:max-w-md"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 flex items-center"
              onClick={() => setShowFilters(true)}
            >
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {Object.keys(activeFilters).length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {Object.entries(activeFilters).map(([key, value]) => (
              <Badge
                key={key}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {key}: {value}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => clearFilter(key)}
                />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Companies Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <>
            {currentCompanies.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No companies found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearAllFilters}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {companies.length > companiesPerPage && (
          <div className="my-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  >
                    Previous
                  </PaginationLink>
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
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

        {/* Company Filters Modal */}
        <CompanyFiltersModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onApply={handleFilterApply}
          initialFilters={activeFilters}
        />
      </div>
    </div>
  );
};

export default Companies;
