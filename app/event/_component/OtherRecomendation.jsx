"use client";
import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "@/app/redux/directory/directorySlicer";
import moment from "moment";

const OtherRecomendation = ({ slug }) => {
  const { events } = useSelector((state) => state.directory);
  const dispatch = useDispatch();
  const randomData = events.filter((item) => item?.slug !== slug).slice(0, 3);

  useEffect(() => {
    dispatch(fetchEvents());
    console.log(events);
  }, []);

  return (
    <div className="mt-[120px] space-y-8">
      <h2 className="text-2xl font-bold text-center">Other Recommendations</h2>
      <div className="flex max-lg:flex-wrap justify-center gap-8">
        {randomData.map((item, index) => (
          <Card
            key={index}
            image={`http://localhost:3001/${item?.image?.name}`}
            title={`${item?.title}`}
            date={moment(item?.createdAt).format("DD MMMM YYYY")}
            slug={`/event/${item?.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OtherRecomendation;
