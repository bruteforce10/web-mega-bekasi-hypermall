"use client";
import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchDirectories } from "@/app/redux/directory/directorySlicer";

const OtherRecomendation = ({ categories, id }) => {
  const { directories } = useSelector((state) => state.directory);
  const dispatch = useDispatch();
  const [dataDirectory, setDataDirectory] = React.useState([]);

  useEffect(() => {
    dispatch(fetchDirectories());
    const filterDirectory = directories
      .filter((item) => item._id !== id && item.categories === categories)
      .sort(() => Math.random() - 0.5);
    setDataDirectory(filterDirectory);
  }, []);

  return (
    <div className="mt-[120px] space-y-12">
      <h2 className="text-2xl font-bold text-center">Other Recommendations</h2>
      <div className="w-full flex max-lg:flex-wrap justify-center gap-4">
        {dataDirectory.slice(0, 4).map((item, index) => (
          <Card
            key={index}
            link={`/directory/${item.slug}`}
            title={item.title}
            floor={item.location}
            alt={item.title}
            image={item.images[0].name}
          />
        ))}
      </div>
    </div>
  );
};

export default OtherRecomendation;
