"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto  flex flex-col  sm:justify-center mt-12">
      <h2 className="h2 text-center leading-relaxed">
        Whoops, looks like something went wrong.
      </h2>
    </div>
  );
}
