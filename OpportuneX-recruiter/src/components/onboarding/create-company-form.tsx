import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { getNames } from "country-list";
import { Check, ChevronsUpDown } from "lucide-react";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { createCompanySchema } from "@/schemas/form-schema";
import { cn } from "@/lib/utils";

type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

export default function CreateCompanyForm({
  toggleSearchForm,
}: {
  toggleSearchForm: (v: boolean) => void;
}) {
  const { recruiter } = useUser();
  const {
    createCompanyMutation: {
      mutateAsync: createCompanyHandler,
      isPending,
      isSuccess,
    },
  } = useAuth();
  const navigate = useNavigate();

  // ✅ Form hook setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
  });

  // ✅ Country & Industry search data
  const countries = getNames();
  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Manufacturing",
    "Energy",
    "Real Estate",
    "Transportation",
    "Entertainment",
    "Other",
  ];

  // ✅ Popover states
  const [openCountry, setOpenCountry] = useState(false);
  const [openIndustry, setOpenIndustry] = useState(false);

  const aboutLength = watch("description")?.length || 0;

  // ✅ Handle Submit
  const onSubmit = async (data: CreateCompanyFormData) => {
    await createCompanyHandler(data);
  };

  // ✅ Redirect after success
  useEffect(() => {
    if (isSuccess) navigate("/recruiter/auth/onboarding/welcome");
  }, [isSuccess]);

  return (
    <div>
      {/* 🏢 Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Provide your company information</h1>
        <p className="text-muted-foreground">
          Fill in the form to create your company profile.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 🏢 Company Name */}
        <FormField label="Company Name" required error={errors.name?.message}>
          <Input {...register("name")} placeholder="Enter company name" />
        </FormField>

        {/* 📧 Official Email */}
        <FormField
          label="Official Email"
          required
          error={errors.officialEmail?.message}
        >
          <Input
            {...register("officialEmail")}
            placeholder="example@company.com"
          />
        </FormField>

        {/* 🌐 Website */}
        <FormField label="Website" required error={errors.website?.message}>
          <Input {...register("website")} placeholder="https://company.com" />
        </FormField>

        {/* 📍 Location with searchable countries */}
        <FormField label="Location" required error={errors.location?.message}>
          <Popover open={openCountry} onOpenChange={setOpenCountry}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !watch("location") && "text-muted-foreground"
                )}
              >
                {watch("location") || "Select Country"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandList>
                  {countries.map((country) => (
                    <CommandItem
                      key={country}
                      onSelect={() => {
                        setValue("location", country);
                        setOpenCountry(false);
                      }}
                    >
                      {country}
                      {watch("location") === country && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormField>

        {/* 👥 Company Size */}
        <FormField label="Company Size" required error={errors.size?.message}>
          <Select onValueChange={(value) => setValue("size", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="201-500">201-500 employees</SelectItem>
              <SelectItem value="501-1000">501-1000 employees</SelectItem>
              <SelectItem value="1000+">1000+ employees</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        {/* 🏭 Industry with search */}
        <FormField label="Industry" required error={errors.industry?.message}>
          <Popover open={openIndustry} onOpenChange={setOpenIndustry}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !watch("industry") && "text-muted-foreground"
                )}
              >
                {watch("industry") || "Select Industry"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search industry..." />
                <CommandList>
                  {industries.map((industry) => (
                    <CommandItem
                      key={industry}
                      onSelect={() => {
                        setValue("industry", industry);
                        setOpenIndustry(false);
                      }}
                    >
                      {industry}
                      {watch("industry") === industry && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormField>

        {/* 📝 About */}
        <FormField
          label="About Us"
          required
          error={errors.description?.message}
          description={`${aboutLength}/500 characters`}
        >
          <Textarea
            {...register("description")}
            placeholder="Tell us about your company culture, mission, and uniqueness..."
            className="min-h-[100px] resize-none"
            maxLength={500}
          />
        </FormField>

        {/* 🔘 Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => toggleSearchForm(true)}
          >
            Back to Search
          </Button>

          <Button type="submit" disabled={isPending} className="min-w-[140px]">
            {isPending ? "Creating..." : "Create Company"}
          </Button>
        </div>
      </form>
    </div>
  );
}
