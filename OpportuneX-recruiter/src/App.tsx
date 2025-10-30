import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Register from "./pages/onboarding/Register";
import EmailVerification from "./pages/onboarding/EmailVerification";
import CreateCompany from "./pages/onboarding/CreateCompany";
import StartRecruiting from "./pages/onboarding/welcome";
import RecruiterLoginDarkModern from "./pages/authentication/login/login-page";
import DashboardSkelection from "./components/skelections/DashboardSkelection";
import JobListingPageSkelection from "./components/skelections/JobListingPageSkelection";
import JobDetailsPageSkelection from "./components/skelections/JobDetailsPageSkelection";
import ApplicationsListPageSkeelection from "./components/skelections/JobApplicationsListPageSkeelection";
import CandidateSkelection from "./components/skelections/CandidateCardSkelection";
import RecruiterProfileSkelection from "./components/skelections/RecruiterProfileSkelection";
import CompanyProfileSkelection from "./components/skelections/CompanyProfileSkelection";
import DashboardPage from "./pages/dashboard";
import CandidateDetailsPage from "./pages/jobs/candidates/[id]";
import AccountSetting from "./components/Settings";
import { AccountInfoTab } from "./components/settings/AccountInfoTab";
import { ChangePasswordTab } from "./components/settings/ChangePasswordTab";
import { SecuityTab } from "./components/settings/SecurityTab";
import AccountSettingLayout from "./pages/accounts/Settings";
import ProfileInformationForm from "./components/edit-page/ProfileInformationForm";
import ProfileEditLayout from "./pages/profile/edit";
import CompanyProfileEditForm from "./components/edit-page/CompanyProfileEditForm";
import UpdateJobPage from "./pages/jobs/update";
import UpdateJobPageSkelection from "./components/skelections/UpdateJobPageSkelection";
import { DashboardLayout } from "./layouts/dashboard-layout";
import AuthLayout from "./layouts/auth-layout";
import LoginPage from "./pages/authentication/login/login-page";
import RegisterPage from "./pages/authentication/register/register-page";
import CreateCompanyPage from "./pages/onboarding/CreateCompany";
import OnBoardingGuard from "./components/OnBoardingGuard";
import CompanyProfile from "./pages/company-profile/company-profile";
import AuthProtectedRoute from "./components/auth-protected";
import CompanyEmailVerification from "./pages/verify-company/verify-company-page";
import VerifyPage from "./pages/company-profile/verify";

const PostedJobsList = React.lazy(
  () => import("@/pages/jobs/posted-jobs-page")
);
const PostJobPage = React.lazy(() => import("@/pages/post-job"));

const ApplicationPage = React.lazy(
  () => import("@/pages/applications-page/[applicationId]/Index")
);
const JobDetails = React.lazy(() => import("@/pages/jobs/[id]"));
const SearchCandidatePage = React.lazy(
  () => import("@/pages/candidates/index")
);
const RecruiterProfilePage = React.lazy(
  () => import("@/pages/profile/ProfilePage")
);

// Create a client

const App = () => {
  return (
    <AppWrapper>
      <Routes>
        <Route element={<DashboardLayout />} path="/recruiter/dashboard">
          <Route
            path="overview"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="company/verify"
            element={
              // <ProtectedRoute>
              <CompanyEmailVerification />
              // </ProtectedRoute>
            }
          />
          <Route
            path="posted-jobs"
            element={
              <Suspense fallback={<JobListingPageSkelection />}>
                <ProtectedRoute>
                  <PostedJobsList />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="posted-jobs/:id"
            element={
              <Suspense fallback={<JobDetailsPageSkelection />}>
                <ProtectedRoute>
                  <JobDetails />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="posted-jobs/:id/update"
            element={
              <Suspense fallback={<UpdateJobPageSkelection />}>
                <ProtectedRoute>
                  <UpdateJobPage />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="post-new-job"
            element={
              <Suspense fallback={<UpdateJobPageSkelection />}>
                <ProtectedRoute>
                  <PostJobPage />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="posted-jobs/:id/applicants"
            element={
              <Suspense fallback={<JobDetailsPageSkelection />}>
                <ProtectedRoute>
                  <ApplicationPage />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="posted-jobs/:id/applicants/:candidateId"
            element={
              <Suspense fallback={<JobDetailsPageSkelection />}>
                <ProtectedRoute>
                  <CandidateDetailsPage />
                </ProtectedRoute>
              </Suspense>
            }
          />

          <Route
            path="profile"
            element={
              <Suspense fallback={<RecruiterProfileSkelection />}>
                <ProtectedRoute>
                  <RecruiterProfilePage />
                </ProtectedRoute>
              </Suspense>
            }
          ></Route>
          <Route
            path="company-profile/verify"
            element={
              // <ProtectedRoute>
              <VerifyPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="company-profile"
            element={
              // <ProtectedRoute>
              <CompanyProfile />
              // </ProtectedRoute>
            }
          />
          <Route
            path="profile/edit"
            element={
              <Suspense fallback={<CompanyProfileSkelection />}>
                <ProfileEditLayout />
              </Suspense>
            }
          >
            <Route
              path="personal"
              element={
                <Suspense fallback={<CompanyProfileSkelection />}>
                  <ProfileInformationForm />
                </Suspense>
              }
            />
            <Route
              path="company"
              element={
                <Suspense fallback={<CompanyProfileSkelection />}>
                  <CompanyProfileEditForm />
                </Suspense>
              }
            />
          </Route>
          <Route path="account-settings" element={<AccountSettingLayout />}>
            <Route path="account-info" element={<AccountInfoTab />} />
            <Route path="change-password" element={<ChangePasswordTab />} />
            <Route path="security" element={<SecuityTab />} />
          </Route>
        </Route>
        {/* Auth Layout Routes */}
        <Route path="/recruiter/auth" element={<AuthLayout />}>
          <Route
            path="login"
            element={
              <AuthProtectedRoute>
                <LoginPage />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="onboarding/register"
            element={
              <AuthProtectedRoute>
                <RegisterPage />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="onboarding/email-verification"
            element={
              <OnBoardingGuard>
                <EmailVerification />
              </OnBoardingGuard>
            }
          />
          <Route
            path="onboarding/company"
            element={
              <OnBoardingGuard>
                <CreateCompanyPage />
              </OnBoardingGuard>
            }
          />
          <Route
            path="onboarding/welcome"
            element={
              <OnBoardingGuard>
                <StartRecruiting />
              </OnBoardingGuard>
            }
          />
        </Route>
      </Routes>
    </AppWrapper>
  );
};

export default App;

//  <Routes>
//     <Route element={<DashboardLayout />} path="/recruiter/dashboard">
//       <Route
//         path="posted-jobs"
//         element={
//           <Suspense>
//             <JobsPage />
//           </Suspense>
//         }
//       ></Route>
//       <Route
//         path="posted-jobs/:id"
//         element={
//           <Suspense fallback={<JobDetailsPageSkelection asChild={false} />}>
//             <JobDetails />
//           </Suspense>
//         }
//       />
//       <Route
//         path="posted-jobs/:id/update"
//         element={
//           <Suspense fallback={<UpdateJobPageSkelection />}>
//             <UpdateJobPage />
//           </Suspense>
//         }
//       />
//       <Route
//         path="post-new-job"
//         element={
//           <Suspense fallback={<UpdateJobPageSkelection />}>
//             <PostJobPage />
//           </Suspense>
//         }
//       />
//       <Route
//         path="posted-jobs/:id/applicants"
//         element={
//           <Suspense fallback={<JobDetailsPageSkelection asChild={false} />}>
//             <ApplicationPage />
//           </Suspense>
//         }
//       />
//       <Route
//         path="posted-jobs/:id/applicants/:candidateId"
//         element={
//           <Suspense fallback={<JobDetailsPageSkelection asChild={false} />}>
//             <CandidateDetailsPage />
//           </Suspense>
//         }
//       />

//       <Route
//         path="search-candidates"
//         element={
//           <Suspense>
//             <SearchCandidatePage />
//           </Suspense>
//         }
//       />

//       <Route
//         path="company-profile"
//         element={
//           <Suspense fallback={<CompanyProfileSkelection />}>
//             <CompanyProfilePage />
//           </Suspense>
//         }
//       />
//       <Route
//         path="profile"
//         element={
//           <Suspense fallback={<RecruiterProfileSkelection />}>
//             <RecruiterProfilePage />
//           </Suspense>
//         }
//       ></Route>
//       <Route
//         path="profile/edit"
//         element={
//           <Suspense fallback={<CompanyProfileSkelection />}>
//             <ProfileEditLayout />
//           </Suspense>
//         }
//       >
//         <Route
//           path="personal"
//           element={
//             <Suspense fallback={<CompanyProfileSkelection />}>
//               <ProfileInformationForm />
//             </Suspense>
//           }
//         />
//         <Route
//           path="company"
//           element={
//             <Suspense fallback={<CompanyProfileSkelection />}>
//               <CompanyProfileEditForm />
//             </Suspense>
//           }
//         />
//       </Route>
//       <Route
//         path="login"
//         element={
//           <Suspense>
//             <RecruiterLoginDarkModern />
//           </Suspense>
//         }
//       />

//       {/* settings pages */}

// <Route path="account-settings" element={<AccountSettingLayout />}>
//   <Route path="account-info" element={<AccountInfoTab />} />
//   <Route path="change-password" element={<ChangePasswordTab />} />
//   <Route path="security" element={<SecuityTab />} />
// </Route>

//       <Route path="onboarding">
//         <Route path="register" element={<Register />} />
//         <Route path="email-verification" element={<EmailVerification />} />
//         <Route path="create-company" element={<CreateCompany />} />
//         <Route path="start-recruiting" element={<StartRecruiting />} />
//       </Route>
//     </Route>
//   </Routes>
