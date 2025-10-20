
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "./rich-text-editor";
import { ImageUpload } from "./image-upload";
import { CustomSelect } from "./custom-select";
import { companyFormSchema, CompanyFormValues, defaultCompanyValues, countries, cities } from "@/schemas/company-form-schema";
import { ThemeToggle } from "./theme-toggle";
import { Progress } from "./ui/progress";

export function CompanyForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: defaultCompanyValues,
    mode: "onChange",
  });

  const handleLogoChange = (file: File | string) => {
    // If a new file is uploaded, simulate upload progress
    if (file instanceof File) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress with intervals
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      
      // Make sure to clear the interval if component unmounts
      return () => clearInterval(interval);
    }
    
    // Update the form value
    form.setValue("logo", file);
  };

  async function onSubmit(data: CompanyFormValues) {
    try {
      setIsSubmitting(true);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Log form data to console
      console.log('Form submitted:', data);
      
      toast({
        title: "Success!",
        description: "Company information has been saved successfully.",
      });
      
      // Here you would typically send data to your database
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save company information. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-10 mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Create New Company</h1>
          <p className="text-muted-foreground">Enter your company details to get started</p>
        </div>
        <ThemeToggle />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 form-appear">
          <Card className="overflow-hidden border-2 shadow-sm">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-xl">Company Details</CardTitle>
              <CardDescription>
                Basic information about your company
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter company name"
                          className="form-field-focus"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          className="form-field-focus"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <CustomSelect
                          options={countries}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select a country"
                          error={form.formState.errors.country?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <CustomSelect
                          options={cities}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select a city"
                          error={form.formState.errors.city?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="company@example.com"
                          className="form-field-focus"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contact@example.com"
                          className="form-field-focus"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <>
                        <ImageUpload
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            handleLogoChange(value);
                          }}
                          error={form.formState.errors.logo?.message?.toString()}
                          label="Upload Company Logo"
                        />
                        {isUploading && (
                          <div className="mt-2 space-y-2">
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="text-xs text-muted-foreground text-center">
                              Uploading... {uploadProgress}%
                            </p>
                          </div>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value || ''}
                        onChange={field.onChange}
                        error={form.formState.errors.description?.message?.toString()}
                        placeholder="Describe your company..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-6 border-t bg-muted/30">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => form.reset(defaultCompanyValues)}
              >
                Reset
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? "Saving..." : "Create Company"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
