import React from "react";
import { useParams } from "react-router-dom";

const CompanyDetailsPage = () => {
  const { name } = useParams();
  return <div>CompanyDetailsPage - {name}</div>;
};

export default CompanyDetailsPage;
