import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideCard = ({ image, title, slug, createdAt }) => {
  return (
    <Link
      href={`/article/${slug}`}
      className="flex items-center gap-4 max-lg:hidden"
    >
      <Image
        src={`http://localhost:3001/${image}`}
        width={600}
        height={600}
        alt="megabekasi-hypermall"
        className="w-1/3 rounded-md "
      />
      <div className="w-full">
        <h4 className="line-clamp-2 font-medium">{title}</h4>
        <p>{moment(createdAt).format("DD MMMM YYYY")}</p>
      </div>
    </Link>
  );
};

export default SideCard;
