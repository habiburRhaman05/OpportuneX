import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import CommonLayout from "./layouts/CommonLayout";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import CandidateProfilePage from "./pages/profilePage/CandidatePorfilePage";
import OnBoardingLayout from "./layouts/OnBoardingLayout";
import OnboardingFinish from "./pages/onboarding/finish";
import ProfileInfoForm from "./pages/onboarding/profile-info";
import EmailVerifyPage from "./pages/onboarding/verify-email";
import ProfileEditPage from "./pages/profilePage/edit-profile/page";
import EducationEditForm from "./components/edit-page/EducationEditForm";
import ProfessionalInformation from "./components/edit-page/ProfessonalInformation";
import ProfileInformationForm from "./components/edit-page/ProfileInformationForm";
import ResumeForm from "./components/edit-page/ResumeEditForm";
import WorkExperience from "./components/edit-page/work-experiences";
import EmailVerify from "./components/email-verify-page/EmaillVerify";
import OnboardingProtected from "./components/middleware/OnboardingProtected";
import ProtectedRoutes from "./components/middleware/ProtectedRoutes";
import { AccountInfoTab } from "./components/settings-page/AccountInfoTab";
import { ChangePasswordTab } from "./components/settings-page/ChangePasswordTab";
import { SecuityTab } from "./components/settings-page/SecurityTab";
import CandidateProfileLayout from "./layouts/ProfileLayout";
import AccountSettingLayout from "./layouts/SettingLayout";
import Companies from "./pages/companies/CompaniesPage";
import CompanyDetailsPage from "./pages/companies/CompanyDetailsPage";
import JobDetailsPage from "./pages/jobs/jobDetails";
import Jobs from "./pages/jobs/jobsPage";
import OnboardingPage from "./pages/onboarding/profile-info";
import AppliedJobsPage from "./pages/applied-jobs-page/applied-applications-page";
import ApplicationDetails from "./pages/applied-jobs-page/application-details";
import AbortControllerDemo from "./components/shared/AbortController";

const RoutesWrapper = () => {
  return (
    <div>
      <Routes>
        {/* Common Layout Routes */}

        <Route path="/" element={<CommonLayout />}>
          <Route path="/testing" element={<AbortControllerDemo />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />

          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:name" element={<CompanyDetailsPage />} />
        </Route>

        {/* Auth Layout Routes */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Onboarding Layout Routes */}

        <Route
          path="/onboarding"
          element={
            // <OnboardingProtected>
            <OnBoardingLayout />
            // </OnboardingProtected>
          }
        >
          <Route
            path="email-verification"
            element={
              // <OnboardingProtected>
              <EmailVerifyPage />
              // </OnboardingProtected>
            }
          />
          <Route path="profile-info" element={<ProfileInfoForm />} />
          <Route path="welcome" element={<OnboardingFinish />} />
        </Route>

        {/* profile Layout Routes */}

        <Route path="/candidate" element={<CandidateProfileLayout />}>
          <Route
            path="profile"
            element={
              <ProtectedRoutes Loader={"profile-skelection"}>
                <CandidateProfilePage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="profile/applied-applications"
            element={<AppliedJobsPage />}
          />
          <Route
            path="profile/applied-applications/:applicationId"
            element={<ApplicationDetails />}
          />
          <Route path="profile/edit" element={<ProfileEditPage />}>
            <Route path="personal" element={<ProfileInformationForm />} />
            <Route path="professional" element={<ProfessionalInformation />} />
            <Route path="educations" element={<EducationEditForm />} />
            <Route path="experiences" element={<WorkExperience />} />
            <Route path="resume" element={<ResumeForm />} />
          </Route>

          <Route path="profile/onboarding" element={<OnboardingPage />} />
          <Route path="account/settings" element={<AccountSettingLayout />}>
            <Route
              path="account-info"
              element={
                <ProtectedRoutes Loader={null}>
                  <AccountInfoTab />
                </ProtectedRoutes>
              }
            />
            <Route
              path="change-password"
              element={
                <>
                  <ChangePasswordTab />
                </>
              }
            />
            <Route
              path="security"
              element={
                <>
                  <SecuityTab />
                </>
              }
            />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default RoutesWrapper;
