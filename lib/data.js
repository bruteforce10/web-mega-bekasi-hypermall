import { MdOutlineRestaurant } from "react-icons/md";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { FaBus } from "react-icons/fa";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

export const menuItems = {
  item_one: {
    title: "What’s New",
    href: "/article ",
  },
  item_two: {
    title: "Plan Your Visit",
    image: "/shopping-menu.webp",
    lists: [
      {
        title: "Services",
        href: "/",
        desc: "cari tahu lebih lanjut tentang semua layanan yang kami sediakan",
      },
      {
        title: "Opening Hours",
        href: "/",
        desc: "cari tahu jadwal operasional kami",
      },
      {
        title: "Getting Here",
        href: "/",
        desc: "cara menuju ke sana dengan transportasi umum",
      },
    ],
  },
  item_three: {
    title: "Directory",
    href: "/directory",
    lists: [
      {
        title: "Food",
        href: `/directory?category=Food+and+Beverages`,
      },
      {
        title: "Electronic",
        href: `/directory?category=Electronics`,
      },
      {
        title: "Fashion",
        href: `/directory?category=Fashion`,
      },
    ],
  },
  item_four: {
    title: "Events",
    href: "/event",
  },
  item_five: {
    title: "Promo",
    href: "/promo",
  },
};

export const categorys = [
  {
    image: "/category/1.webp",
    title: "Electronics",
    href: "/",
  },
  {
    image: "/category/2.webp",
    title: "Food & Beverages",
    href: "/",
  },
  {
    image: "/category/3.webp",
    title: "Lifestyle & Hobbies",
    href: "/",
  },
  {
    image: "/category/4.webp",
    title: "Fashion",
    href: "/",
  },
  {
    image: "/category/5.webp",
    title: "Kids",
    href: "/",
  },
  {
    image: "/category/6.webp",
    title: "Services",
    href: "/",
  },
];

export const facilities = [
  {
    icon: <MdOutlineRestaurant className="w-full h-full" />,
    title: "248",
    subTitle: "Restaurants",
  },
  {
    icon: (
      <Image
        src="/icon/toilet.svg"
        alt="megabekasi-hypermall"
        height={24}
        width={24}
      />
    ),
    title: "Facilities",
    subTitle: "Explore",
  },
  {
    icon: <RiShoppingCart2Fill className="w-full h-full" />,
    title: "inquiry",
    subTitle: "Leasing",
  },
  {
    icon: <FaBus className="w-full h-full" />,
    title: "Shuttle &",
    subTitle: "Car Park",
  },
];

export const footerData = {
  address:
    "Jl. Ahmad Yani No.1, RT.004/RW.001, Marga Jaya, Kec. Bekasi Sel., Kota Bks, Jawa Barat 17141",
  socialMedia: [
    {
      icon: <FaInstagram className="w-6 h-6 text-gray-700" />,
      link: "https://www.instagram.com/megabekasi/",
    },
    {
      icon: <FaTiktok className="w-6 h-6 text-gray-700" />,
      link: "https://www.tiktok.com/@megabekasi",
    },
    {
      icon: <FaFacebookF className="w-6 h-6 text-gray-700" />,
      link: "https://www.facebook.com/megabekasi",
    },
  ],
  visitInformation: {
    title: "Visit Information",
    items: [
      {
        title: "Services",
        link: "#",
      },
      {
        title: "Map",
        link: "#",
      },
      {
        title: "Facilities",
        link: "#",
      },
    ],
  },
  mbhConnect: {
    title: "MBH Connect",
    items: [
      {
        title: "News & Update",
        link: "#",
      },
      {
        title: "About Us",
        link: "#",
      },
      {
        title: "Career",
        link: "#",
      },
    ],
  },
  contactUs: {
    title: "Contact Us",
    items: [
      {
        title: "62 888 6314 218",
        link: "#",
      },
      {
        title: "megabekasi@gmail.com",
        link: "#",
      },
    ],
  },
};

export const DirectoryOps = {
  floor: ["1", "2", "3", "4"],
  categories: [
    "Electronics",
    "Food and Beverages",
    "Lifestyle and Hobbies",
    "Fashion",
    "Kids",
    "Services",
  ],
};

export const categoriesPromo = ["All", "Dinning", "Shopping"];
