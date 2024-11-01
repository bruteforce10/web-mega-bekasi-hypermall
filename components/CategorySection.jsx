"use client";
import Image from "next/image";
import TextTitle from "./TextTitle";
import { categorys } from "@/lib/data";
import Link from "next/link";
import { useSelector } from "react-redux";
import titleToSlug from "@/lib/slug";

const CategorySection = () => {
  const { categories } = useSelector((state) => state.directory);

  return (
    <section className="px-2">
      <TextTitle
        title={"Discover our shops and dining options"}
        subTitle={"Directory"}
        className={"max-md:mt-12"}
        icon={
          <>
            <Image
              src={"/element-1.svg"}
              alt="megabekasi-hypermall"
              className="absolute xl:ml-[140px] ml-[450px] xl:top-5 -top-4 max-xl:scale-[.4] max-xl:hidden"
              width={60}
              height={60}
            />
            <Image
              src={"/element-1.svg"}
              alt="megabekasi-hypermall"
              className="absolute right-0 xl:mr-[140px] mr-[450px] xl:top-2 -top-6 max-xl:scale-[.4] max-xl:hidden"
              width={60}
              height={60}
            />
          </>
        }
      />
      <div className="container mx-auto  gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  mt-12">
        {categories.map((category, index) => (
          <Link
            href={"#"}
            key={index}
            className="relative mx-auto group overflow-hidden  rounded-2xl w-fit"
          >
            <Image
              src={"/category/" + titleToSlug(category.name) + ".webp"}
              alt={"megabekasi-hypermall-kategori" + "-" + category.title}
              height={300}
              width={300}
              className="group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute bottom-0 text-center left-0 right-0">
              <h3 className="text-white relative top-20 text-xl font-medium group-hover:scale-90 transition-all duration-500">
                {category.name}
              </h3>
              <div className=" bg-gradient-to-b h-24 from-transparent to-black/70" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
