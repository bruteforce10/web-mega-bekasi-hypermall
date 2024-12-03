"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchSharp } from "react-icons/io5";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import SectionList from "./_component/SectionList";
import CardDirectory from "../directory/_component/Card";
import CardPromos from "../promo/_component/Card";
import CardEvent from "../event/_component/Card";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPage() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const params = useSearchParams();
  const router = useRouter();

  const fetchSearchAll = async (query) => {
    setLoading(true);
    try {
      if (query) {
        const response = await axios.get(
          `http://localhost:3001/api/v1/cms/search?q=${query}`
        );

        setLoading(false);
        return await response.data.data;
      } else {
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const query = params.get("q") || "";
    setSearchValue(query);
    fetchSearchAll(query).then((data) => {
      console.log(data);
      setData(data);
    });
  }, [params]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`?q=${searchValue}`);
  };

  return (
    <main>
      <section className="py-4 bg-[#F1F5F9] ">
        <form
          onSubmit={handleSearch}
          className="container mx-auto flex items-center gap-2"
        >
          <Input
            name="query"
            placeholder="Type your Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
            className="border-0 placeholder:text-2xl bg-transparent text-2xl focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button type="submit" variant="ghost" size="icon">
            <IoSearchSharp className="text-3xl" />
          </Button>
        </form>
      </section>
      <section className="mt-4">
        {loading && (
          <section className="container mx-auto mt-12  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </section>
        )}
        {data && !loading && (
          <>
            <SectionList
              result={data?.directorys?.length}
              title={"Directories"}
              Card={data?.directorys?.map((item, index) => (
                <CardDirectory
                  key={index}
                  image={item?.images?.images[0]?.name}
                  floor={item?.location}
                  title={item?.title}
                  link={`/directory/${item?.slug}`}
                />
              ))}
            />
            <Separator className="my-4" />
            <SectionList
              result={data?.promos?.length}
              title={"Promos"}
              Card={data?.promos?.map((item, index) => (
                <CardPromos
                  key={index}
                  image={item?.image?.name}
                  floor={item?.location}
                  title={item?.title}
                  link={`/promo/${item?.slug}`}
                  directory={item?.directory?.title}
                />
              ))}
            />
            <Separator className="my-4" />
            <SectionList
              result={data?.events?.length}
              title={"Events"}
              Card={data?.events?.map((item, index) => (
                <CardEvent
                  key={index}
                  image={`http://localhost:3001/${item?.image?.name}`}
                  title={item?.title}
                  slug={`/event/${item?.slug}`}
                  date={moment(item?.createdAt).format("DD MMMM YYYY")}
                />
              ))}
            />
            <Separator className="my-4" />
            <SectionList
              result={data?.articles?.length}
              title={"Articles"}
              Card={data?.articles?.map((item, index) => (
                <CardEvent
                  key={index}
                  image={`http://localhost:3001/${item?.image?.name}`}
                  title={item?.title}
                  slug={`/article/${item?.slug}`}
                  date={moment(item?.createdAt).format("DD MMMM YYYY")}
                />
              ))}
            />
          </>
        )}
      </section>
    </main>
  );
}
