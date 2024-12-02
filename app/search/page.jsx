"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchSharp } from "react-icons/io5";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import SectionList from "./_component/SectionList";
import CardDirectory from "../directory/_component/Card";
import axios from "axios";
import { useParams } from "next/navigation";

export default function SearchPage() {
  const [data, setData] = React.useState(null);
  const params = useParams();
  const fetchSearchAll = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/cms/search?q=buumi"
      );

      return await response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSearchAll().then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <main>
      <section className="py-4 bg-[#F1F5F9] ">
        <form
          onSubmit={handleSearch}
          className="container mx-auto flex items-center gap-2"
        >
          <Input
            placeholder="Type your Search..."
            className="border-0 placeholder:text-2xl bg-transparent text-2xl focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button type="submit" variant="ghost" size="icon">
            <IoSearchSharp className="text-3xl" />
          </Button>
        </form>
      </section>
      <section className="mt-4">
        {data && (
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
          </>
        )}
      </section>
    </main>
  );
}
