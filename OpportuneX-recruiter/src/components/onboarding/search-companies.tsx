import { FormField } from "@/components/forms/FormField";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { queryClientIns } from "@/components/QueryClientWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import useDebounceValue from "@/hooks/useDebounce";
import { createCompanySchema } from "@/schemas/form-schema";
import { Building2, Loader, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

export default function SearchCompaniesForm({ toggleSearchForm }) {
  const { recruiter } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounceValue(searchQuery, 500);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const {
    data: searchData,
    isLoading: isSearching,
    error,
  } = useApiQuery({
    url: "/company/search-companies",
    queryKey: ["search-companies", debounceValue],
    enabled: debounceValue.length > 0,
  });

  return (
    <div className="space-y-6">
      <FormField label="Company Search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for your company..."
            className="pl-10"
          />
        </div>
      </FormField>

      {searchQuery && searchData?.data?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Suggested companies
          </h3>
          <div className="space-y-2">
            {isSearching ? (
              <div className="flex items-center justify-center m-4 w-full">
                <Loader className="animate-spin" />
              </div>
            ) : (
              searchData?.data.map((company) => (
                <CompanyCard company={company} />
              ))
            )}
          </div>
        </div>
      )}

      {searchQuery && searchData?.data?.length === 0 && (
        <div className="text-center py-8 space-y-4">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="font-medium">No companies found</h3>
            <p className="text-sm text-muted-foreground">
              Can't find your company? Create a new one below.
            </p>
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <div className="text-center space-y-4">
          <h3 className="font-medium">Don't see your company?</h3>
          <p className="text-sm text-muted-foreground">
            Create a new company profile to get started
          </p>
          <Button onClick={() => toggleSearchForm(false)}>
            Create New Company
          </Button>
        </div>
      </div>
    </div>
  );
}

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const selectCompnayMutation = useApiMutation({
    url: "/recruiter/auth/profile/update",
    method: "put",
    onSuccess: () => {
      toast({
        title: "Profile Updated Successfully",
        className: "bg-zinc-900",
      });
      queryClientIns.invalidateQueries({
        queryKey: ["fetch-profile-data"],
      });
    },
  });

  const selectCompany = async (company_id) => {
    await selectCompnayMutation.mutateAsync({ company: company_id });
  };
  useEffect(() => {
    if (selectCompnayMutation.isSuccess) {
      navigate("/recruiter/auth/onboarding/welcome");
    }
  }, [selectCompnayMutation.isSuccess]);
  return (
    <Card
      key={company._id}
      className="p-4 cursor-pointer hover:bg-accent transition-colors"
    >
      <div
        className="flex items-start justify-between"
        onClick={() => selectCompany(company._id)}
      >
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-medium">{company.name}</h4>
            {/* <p className="text-sm text-muted-foreground">
                          {company.industry}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {company.size}
                        </p> */}
          </div>
        </div>
        <Button size="sm">
          {selectCompnayMutation.isPending ? (
            <Loader className="animate-spin" />
          ) : (
            "Select"
          )}
        </Button>
      </div>
    </Card>
  );
};
