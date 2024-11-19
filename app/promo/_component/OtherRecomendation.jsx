import React from "react";
import Card from "../_component/Card";

const getData = async () => {
  const res = await fetch(`http://localhost:3001/api/v1/cms/promos`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function OtherRecomendation({ id }) {
  const { data } = await getData();
  const filterData = data
    .filter((item) => item._id !== id)
    .sort(() => Math.random() - 0.5);

  return (
    <div className="mt-[120px] space-y-8">
      <h2 className="text-2xl font-bold text-center">You may also like</h2>
      <div className="flex max-lg:flex-wrap justify-center gap-8">
        {filterData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            image={item.image.name}
            slug={item.slug}
            directory={item.directory.title}
            location={item.location}
          />
        ))}
      </div>
    </div>
  );
}
