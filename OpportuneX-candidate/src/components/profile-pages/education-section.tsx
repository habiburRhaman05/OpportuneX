import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface EducationType {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  isCurrent?: boolean;
}
type EducationSectionProps = {
  educations: EducationType[];
};
const EducationSection = ({ educations }: EducationSectionProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Educational Background</h3>
      </div>
      <div className=" flex flex-col gap-y-5 text-gray-400">
        {educations?.map((edu, i) => {
          return (
            <Card
              key={i}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-md hover:shadow-lg transition rounded-2xl"
            >
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between ">
                {/* Left: Degree + Institution */}
                <div className="">
                  <h4 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-400" />
                    {edu.degree}
                  </h4>
                  <div>
                    <p className="text-sm text-zinc-400 mt-1">
                      {edu.institution}
                    </p>
                    <p>{edu.field}</p>
                    <p>GPA : {edu.gpa}</p>
                    <p>{edu.duration}</p>
                  </div>
                </div>

                {/* Right: Year */}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EducationSection;
