import { CheckCircle2, MapPin, Globe, Mail, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

interface Company {
  _id: string;
  name: string;
  verified: boolean;
  officialEmail: string;
  logo?: string;
  website?: string;
  industry: string;
  size?: string;
  location?: string;
  description?: string;
}

export default function CompanyHeader({ company }: { company: Company }) {
  return (
    <div className="mb-12">
      {!company.verified && (
        <div className="bg-red-600/80 backdrop-blur-md border-l-8 border-red-800 p-6 rounded-lg mb-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Company Not Verified!</h2>
            <p className="mt-2 text-gray-200">
              This company profile is not verified yet. Please complete the
              verification process.
            </p>
          </div>
          <Link
            to={"/recruiter/dashboard/company-profile/verify"}
            // onClick={() => navigate("/verify")}
            className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors"
          >
            Verify Now
          </Link>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center overflow-hidden shadow-lg">
            <img
              src={
                company.logo ||
                "/placeholder.svg?height=96&width=96&query=company-logo"
              }
              alt={company.name}
              className="w-full h-full object-cover"
            />
          </div>
          {company.verified ? (
            <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5 border-2 border-zinc-950 shadow-lg">
              <Check className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="absolute -bottom-2 -right-2 bg-red-500 rounded-full p-1.5 border-2 border-zinc-950 shadow-lg">
              <X className="w-2 h-2 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-white">{company.name}</h1>
            {company.verified ? (
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-medium">
                Verified
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-medium">
                Not Verified
              </span>
            )}
          </div>

          <p className="text-zinc-400 mb-4">{company.industry}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-zinc-300">
              <MapPin className="w-4 h-4 text-blue-400" />
              {company.location}
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Mail className="w-4 h-4 text-blue-400" />
              {company.officialEmail}
            </div>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
