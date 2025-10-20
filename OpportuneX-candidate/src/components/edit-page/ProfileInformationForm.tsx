import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Camera, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useFileUpload } from "@/hooks/useFileUplaod";

import useAuth from "@/hooks/useAuth";
import { useApiMutation } from "@/hooks/useApi";
import { useUser } from "@/context/AuthContext";
import { queryClientIns } from "../shared/QueryClientWrapper";

type UserData = {
  fullName: string;
  location: string;
  bio: string;
};

const ProfileInformationForm = () => {
  const { user } = useUser();
  const { profileUpdateMutation } = useAuth();
  const [formData, setFormData] = useState<UserData>();
  const [originalData, setOriginalData] = useState<UserData>(user?.data);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);

  // Track dirty state
  const isDirty = JSON.stringify(formData) !== JSON.stringify(originalData);

  // Input change handler
  const handleInputChange = (name: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.location.trim()) newErrors.location = "Loaction is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (formData.bio.length > 500)
      newErrors.bio = "Bio cannot exceed 500 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setFormData({
      fullName: user?.data.fullName || "",

      bio: user?.data.bio || "",
      location: user?.data.location || "",
    });
  }, [user]);

  // Save changes
  const handleSaveChanges = async () => {
    if (!validateForm()) return;
    await profileUpdateMutation.mutateAsync(formData);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Fields */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData?.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className={`bg-zinc-800 border-zinc-700 text-white ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData?.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={formData?.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className={`bg-zinc-800 border-zinc-700 text-white min-h-[120px] ${
                  errors.bio ? "border-red-500" : ""
                }`}
                placeholder="Tell us about yourself..."
              />
              <p className="text-sm text-zinc-400 mt-1">
                {formData?.bio?.length}/500 characters
              </p>
              {errors.bio && (
                <p className="text-red-400 text-sm mt-1">{errors.bio}</p>
              )}
            </div>

            {/* Update Now button */}

            <Button
              type="button"
              disabled={!isDirty || profileUpdateMutation.isPending}
              onClick={handleSaveChanges}
              className="mt-5 bg-blue-600 hover:bg-blue-800 text-white"
            >
              Update Now{" "}
              {profileUpdateMutation.isPending && (
                <Loader className="animate-spin ml-3" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileInformationForm;
