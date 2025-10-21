import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import useDebounceValue from "@/hooks/useDebounce";
import { useApiQuery } from "@/hooks/useApi";
import { useSearchParams } from "react-router-dom";

const AutoCompleteSearchBar = ({
  url,
  value,
  className,
  handleSelect,
  key,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isMount, setIsMount] = useState(false);
  const handleInputChange = (value) => {
    setIsMount(true);
    setInputValue(value);
  };

  const debounceValue = useDebounceValue(inputValue, 500);
  const [isOpenModal, setIsOpenModal] = useState(debounceValue.length > 0);
  const { data, isLoading, error } = useApiQuery({
    url: url,
    queryKey: [key, debounceValue],
    enabled: debounceValue.length > 0,
  });

  useEffect(() => {
    setIsOpenModal(debounceValue.length > 0 ? true : false);
  }, [debounceValue]);
  useEffect(() => {
    setIsMount(false);
  }, []);

  return (
    <div className={className}>
      <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search jobs..."
        className="pl-9  "
      />
      {isOpenModal && isMount && (
        <div className=" absolute top-[100%] w-full bg-zinc-800 p-4 z-20 rounded-sm mt-2">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : data?.data?.length > 0 ? (
            <div className="flex flex-col  gap-y-2 w-full   z-20 rounded-sm mt-2 list-none">
              {isLoading ? "Loding..." : ""}
              {data?.data?.map((job, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      handleSelect(job);
                      setInputValue(job);
                      setIsMount(false);
                    }}
                    className="bg-zinc-700/50 p-2 rounded-md cursor-pointer hover:bg-blue-800"
                  >
                    {job}
                  </li>
                );
              })}
            </div>
          ) : (
            <p>no job found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteSearchBar;
