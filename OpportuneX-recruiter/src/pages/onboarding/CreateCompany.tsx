import CreateCompanyForm from "@/components/onboarding/create-company-form";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import SearchCompaniesForm from "@/components/onboarding/search-companies";
import { useUser } from "@/context/AuthContext";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const CreateCompanyPage = () => {
  const [showSearchForm, setShowSearchForm] = useState(true);
  const toggleSearchForm = (value) => {
    setShowSearchForm(value);
  };
  const { recruiter } = useUser();
  if (
    recruiter.onboardingSteps.company &&
    recruiter.onboardingSteps.emailVerification
  ) {
    return <Navigate to={"/recruiter/auth/onboarding/welcome"} replace />;
  }

  return (
    <OnboardingLayout currentStep={3}>
      {showSearchForm ? (
        <SearchCompaniesForm toggleSearchForm={toggleSearchForm} />
      ) : (
        <CreateCompanyForm toggleSearchForm={toggleSearchForm} />
      )}
    </OnboardingLayout>
  );
};

export default CreateCompanyPage;
