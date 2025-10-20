import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Users, ExternalLink, Star } from "lucide-react";
import { CompanyType } from "@/data/company-data";

interface CompanyCardProps {
  company: CompanyType;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-800">
      <div className="relative h-40 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
        {company.featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-yellow-500 hover:bg-yellow-600 font-semibold">
              <Star className="h-3 w-3 mr-1 fill-white" /> Featured
            </Badge>
          </div>
        )}

        {company.logo ? (
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building className="h-16 w-16 text-gray-400 dark:text-gray-600" />
          </div>
        )}
      </div>

      <CardContent className="p-5 flex-grow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold line-clamp-1">{company.name}</h3>
          <p className="text-sm text-muted-foreground">{company.industry}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground line-clamp-1">
              {company.location}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">{company.size}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto">
        <Link
          to={`/companies/${company.name.replace(" ", "-")}`}
          className="text-sm font-medium text-shimmer-primary hover:underline flex items-center"
        >
          View Company <ExternalLink className="h-3 w-3 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
