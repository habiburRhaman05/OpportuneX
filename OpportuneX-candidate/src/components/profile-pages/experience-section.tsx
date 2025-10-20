import { s } from "node_modules/framer-motion/dist/types.d-Cjd591yU";

export type ExperienceTypes = {
  company: string;
  position: string;
  duration: string;
  description: string;
  logo?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  isCurrent?: boolean;
};
type ExperienceSectionProps = {
  experiences: ExperienceTypes[];
};
const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  console.log(experiences);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Work Experiences</h3>
      </div>

      <div className="flex flex-col gap-y-5">
        {experiences?.length > 0 ? (
          experiences?.map((exp, index) => (
            <div
              key={index}
              className="flex gap-4 border-b  bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-md hover:shadow-lg transition rounded-2xl p-4 rounded-md last:border-b-0"
            >
              <div className="flex-1">
                <h4 className="font-semibold">{exp.company}</h4>
                <p className="text-gray-400">{exp.position}</p>
                <p className="text-sm text-gray-400">{exp.duration}</p>
                {exp.isCurrent && (
                  <p className="text-sm bg-green-700 text-white w-[100px] text-center py-1 my-2 rounded-md">
                    {" "}
                    Working On
                  </p>
                )}
                {exp.description && (
                  <p className="text-sm text-gray-300 mt-2">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <span className="text-gray-400"> No work experience added yet.</span>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
