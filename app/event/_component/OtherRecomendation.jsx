import React from "react";
import Card from "./Card";

const OtherRecomendation = () => {
  return (
    <div className="mt-[120px] space-y-8">
      <h2 className="text-2xl font-bold text-center">Other Recommendations</h2>
      <div className="flex max-lg:flex-wrap justify-center gap-8">
        {[...Array(2)].map((_, index) => (
          <Card
            key={index}
            image={"/dummy-opening-tenant.webp"}
            title={"Sawadikap – Thailand Culinary Festival"}
            date={"03 Oct 2024"}
          />
        ))}
      </div>
    </div>
  );
};

export default OtherRecomendation;
