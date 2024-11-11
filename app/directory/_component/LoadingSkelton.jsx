import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto mt-12 animate-pulse">
      <div className="h-[120px] bg-gray-200 w-full rounded-lg mb-6"></div>
      <section className="flex gap-12">
        <aside className="space-y-4 w-1/3 hidden lg:block">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </aside>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-60 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </section>
    </div>
  );
}
