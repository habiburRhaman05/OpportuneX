import React, { useEffect, useState } from "react";

const useDebounceValue = (input, delay) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setValue(input);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [delay, input]);

  return value;
};

export default useDebounceValue;
