"use client";
import React, { useEffect } from "react";
import Card from "@/app/event/_component/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "@/app/redux/directory/directorySlicer";
import moment from "moment";

const OtherRecommendation = ({ slug }) => {
  const { articles } = useSelector((state) => state.directory);
  const dispatch = useDispatch();
  const randomData = articles?.data
    ?.filter((item) => item?.slug !== slug)
    .slice(0, 3);

  useEffect(() => {
    dispatch(fetchArticles());
    console.log(articles);
  }, []);

  return (
    <div className="mt-[120px] space-y-8">
      <h2 className="text-2xl font-bold text-center">Other Recommendations</h2>
      <div className="flex max-lg:flex-wrap justify-center gap-8">
        {randomData.map((item, index) => (
          <Card
            key={index}
            image={`http://localhost:3001/${item?.image?.name}`}
            title={item?.title}
            date={moment(item?.createdAt).format("DD MMMM YYYY")}
            slug={`/article/${item?.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OtherRecommendation;
