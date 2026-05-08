import AppliedJobsPage from "@/components/profile-pages/appliedJob";
import { ProfileHeader } from "@/components/profile-pages/profile-page-header";
import AchievementsCard from "@/components/profile-pages/achievements-card";
import EducationSection from "@/components/profile-pages/education-section";
import ExperienceSection from "@/components/profile-pages/experience-section";
import ProfileComplectionAlert from "@/components/profile-pages/ProfileComplectionAlert";
import SavedJobsList from "@/components/profile-pages/savedJoblists";
import { RecommendedJobs } from "@/components/profile-pages/RecommendedJobs";
import { SkillsSection } from "@/components/skills-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import ProfileSkeleton from "../../components/skelections/ProfilePageSkelection";

const CandidateProfilePage = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Profile Completion */}
      <ProfileComplectionAlert
        profileComplection={user?.data?.profileCompletion}
      />

      <div className="container mx-auto px-4 py-8 ">
        {/* Profile Header */}
        <div className="animate-fade-in-up">
          <ProfileHeader profile={user?.data} />
        </div>
        <div className="w-full grid md:grid-cols-12 grid-cols-1 gap-6 mt-8 ">
          <div className="md:col-span-8 col-span-12">
            <Tabs
              defaultValue="experience"
              className="max-h-min bg-zinc-900/50 p-4 border-zinc-800 border rounded-xl "
            >
              <TabsList className="bg-zinc-800  h-auto py-2 flex items-start justify-start flex-wrap gap-4 p-2 min-w-fit ">
                {/* <TabsTrigger
                  className="bg-zinc-700/50 flex-1 data-[state=active]:bg-blue-700"
                  value="recommendedJobs"
                >
                  RecommendedJobs
                </TabsTrigger> */}
                <TabsTrigger
                  className="bg-zinc-700/50 flex-1 data-[state=active]:bg-blue-700"
                  value="experience"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  className="bg-zinc-700/50 flex-1 data-[state=active]:bg-blue-700"
                  value="education"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  className="bg-zinc-700/50 flex-1 data-[state=active]:bg-blue-700"
                  value="applied"
                >
                  Applied Jobs
                </TabsTrigger>
                <TabsTrigger
                  className="bg-zinc-700/50 flex-1 data-[state=active]:bg-blue-700"
                  value="savedJobs"
                >
                  SavedJobs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommendedJobs" className="mt-6">
                <RecommendedJobs />
              </TabsContent>
              <TabsContent value="experience" className="mt-6 space-y-6">
                <ExperienceSection experiences={user?.data?.workExperience} />
              </TabsContent>
              <TabsContent value="education" className="mt-6">
                <EducationSection educations={user?.data?.education} />
              </TabsContent>
              <TabsContent value="applied">
                <AppliedJobsPage />
              </TabsContent>
              <TabsContent value="savedJobs">
                <SavedJobsList savedJobs={user?.data?.savedJobs} />
              </TabsContent>
            </Tabs>
          </div>
          {/* Right Column */}
          <div className="space-y-8 md:col-span-4 col-span-12  min-w-full">
            <div
              id="skills"
              className="animate-fade-in-up animation-delay-500  min-w-full scroll-mt-20"
            >
              <SkillsSection skills={user?.data?.skills} />
            </div>

            <div
              id=""
              className="animate-fade-in-up animation-delay-600 scroll-mt-20"
            >
              <AchievementsCard achivements={user?.data?.achievements} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
