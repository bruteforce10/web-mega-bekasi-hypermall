"use client";
import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchDirectories } from "@/app/redux/directory/directorySlicer";

const OtherRecomendation = () => {
  const { directories } = useSelector((state) => state.directory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDirectories());
  }, []);

  return (
    <div className="mt-[120px] space-y-12">
      <h2 className="text-2xl font-bold text-center">Other Recommendations</h2>
      <div className="w-full flex max-lg:flex-wrap justify-center gap-4">
        {[...Array(4)].map((_, index) => (
          <Card
            key={index}
            link="/directory/tenant/1"
            title="Mall Bekasi"
            floor="Ground 1, Level B2"
            alt="mall-bekasi-hypermall"
            image="/directory-dummy.webp"
          />
        ))}
      </div>
    </div>
  );
};

export default OtherRecomendation;
