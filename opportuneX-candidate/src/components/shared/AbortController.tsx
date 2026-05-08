import { delay } from "@/helper/delay";
import React, { useEffect } from "react";

const AbortControllerDemo = () => {
  useEffect(() => {
    const controller = new AbortController();

    const loadFetch = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/v1/test", {
          signal: controller.signal,
        });
        //delay
        const data = await res.json();
        console.log("all-data", data);
      } catch (error) {
        console.log("error", error);
      }
    };
    loadFetch();
    return () => {
      controller.abort();
    };
  }, []);

  return <div>AbortController</div>;
};

export default AbortControllerDemo;
