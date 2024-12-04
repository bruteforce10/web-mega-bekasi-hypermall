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
    icon: <FaBus className="w-full h-full" />,
    title: "Shuttle &",
    subTitle: "Car Park",
  },
  {
    icon: (
      <Image
        src="/icon/app.svg"
        alt="app-megabekasi"
        height={160}
        width={160}
        className="w-full h-full object-cover"
      />
    ),
    title: "Get",
    subTitle: "MBH App",
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

export const visit = [
  {
    title: "PLAN YOUR VISIT",
    subTitle:
      "Keep your visit convenient and hassle-free with provided services below.",
  },
  [
    {
      title: "GETTING HERE",
      link: "/visit-getting-here",
    },
    {
      title: "SERVICES",
      link: "/",
    },
  ],
];

export const gettingHere = {
  title: "HOW TO GET TO GRAND INDONESIA?",
  data: [
    {
      title: "BY CAR",
      desc: "With a total space for 4.300 cars, we have 3 areas for you to park your car; East Mall, West Mall and Skybridge. You can access our parking area from Jalan Teluk Betung or entrances of Menara BCA, Kempinski Residence and Hotel Indonesia Kempinski Jakarta.",
      icon: (
        <Image
          src="/icon/transportation/car.svg"
          alt="visit-by-car-megabekasi-hypermall"
          width={200}
          height={200}
          className="rounded-lg"
        />
      ),
    },
    {
      title: "BY MOTORCYCLE",
      desc: "Park your motorcycle at West Mall Area. The parking lot is available and located at West Mall basement. The access to go through basement is use the access of Ramp Barat– West Mall, go through the circle lamp to the parking ramp.",
      icon: (
        <Image
          src="/icon/transportation/motorcycle.svg"
          alt="visit-by-motorcycle-megabekasi-hypermall"
          width={200}
          height={200}
          className="rounded-lg"
        />
      ),
    },
    {
      title: "BY BIKE",
      desc: "You can enter through West Mall entrance (next to Amarta Lobby) and park at Basement both East and West Mall. The access to the basement parking area is through West Ramp – West Mall.",
      icon: (
        <Image
          src="/icon/transportation/motorcycle.svg"
          alt="visit-by-motorcycle-megabekasi-hypermall"
          width={200}
          height={200}
          className="rounded-lg"
        />
      ),
    },
    {
      title: "BY MRT",
      desc: "You can stop at Dukuh Atas station, walk through the pedestrian and go through Menara BCA entrance or stop at Bundaran HI station, walk through the pedestrian and access the mall through East Mall entrance.",
      icon: (
        <Image
          src="/icon/transportation/train.svg"
          alt="visit-by-MRT-megabekasi-hypermall"
          width={200}
          height={200}
          className="rounded-lg"
        />
      ),
    },
    {
      title: "BY TRANSJAKARTA",
      desc: "Stop at Tosari bus stop, walk through the pedestrian and access the mall through Menara BCA entrance or stop at Bundaran HI bus stop and enter the mall through East Mall entrance",
      icon: (
        <Image
          src="/icon/transportation/bus.svg"
          alt="visit-by-transjakarta-megabekasi-hypermall"
          width={200}
          height={200}
          className="rounded-lg"
        />
      ),
    },
    {
      title: "BY COMMUTER LINE",
      desc: "You can stop at Sudirman station, walk through the pedestrian and go through Menara BCA entrance to enter mall",
      icon: (
        <Image
          src="/icon/transportation/commuter-line.svg"
          alt="visit-by-commuter-line-megabekasi-hypermall"
          width={200}
          height={200}
          className="rounded-lg"
        />
      ),
    },
    {
      title: "BY ONLINE TRANSPORTATION",
      desc: "Customers using 4 wheels online transportation can access all lobbies. For those who are using 2 wheels online transportation best to stop at under skybridge and enter the mall through Arjuna Lobby (West Mall) or Rama Lobby (East Mall)",
      icon: (
        <Image
          src="/icon/transportation/online-car.svg"
          alt="visit-by-online-transportation-megabekasi-hypermall"
          width={200}
          height={200}
          className="rounded-lg"
        />
      ),
    },
  ],
};

export const contactUs = {
  title: "Contact Us",
  desc: "Our Customer Is Our Priority",
  dataManagementOffice: {
    title: "Center Management Office",
    address:
      "Jl. Ahmad Yani No.1, RT.004/RW.001, Marga Jaya, Kec. Bekasi Sel., Kota Bks, Jawa Barat 17141",
    data: ["+6221 514 02828", "dummy@gmail.com"],
  },
  dataContact: {
    title: "Contact",
    data: [
      {
        title: "Customer Service",
        email: "dummy@gmail.com",
      },
      {
        title: "Leasing Inquiry",
        email: "dummy@gmail.com",
      },
      {
        title: "Casual Leasing Inquiry",
        email: "dummy@gmail.com",
      },
      {
        title: "Marketing Communications Inquiry",
        email: "dummy@gmail.com",
      },
      {
        title: "Corporate Communications Inquiry",
        email: "dummy@gmail.com",
      },
    ],
  },
};
