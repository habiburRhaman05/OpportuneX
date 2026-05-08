import React from "react";
import { useSearchParams } from "react-router-dom";

const useParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const setParams = <T>(key: string, value: T) => {
    params.set(key, value as any);
    setSearchParams(params);
  };
  const getParams = <T>(key: string) => {
    return params.get(key);
  };
  const deleteParams = (key: string) => {
    params.delete(key);
    setSearchParams(params);
  };
  const delereAllParams = () => {
    // setSearchParams();
  };
  return { setParams, getParams, deleteParams, delereAllParams };
};

export default useParams;
