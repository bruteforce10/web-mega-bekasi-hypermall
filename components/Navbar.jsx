"use client";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { IoIosArrowForward } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, spring } from "framer-motion";
import { menuItems } from "@/lib/data";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const { item_one, item_two, item_three, item_four, item_five } = menuItems;
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (pathname.startsWith("/dashboard/")) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-primary h-12">
        <div className="container flex items-center justify-between h-full">
          <p className="font-secondary text-white tracking-wide">
            MEGA BEKASI HYPERMALL
          </p>
          <div className="flex gap-4 items-center">
            <Link href="#">
              <FaInstagram className="text-white hover:text-white/70 text-2xl " />
            </Link>
            <Link href="#">
              <FaTiktok className="text-white hover:text-white/70 text-2xl " />
            </Link>
            <div className="w-full max-sm:hidden">
              <SearchIcon className="text-black/40 absolute mt-2 ml-2  w-4 h-4 " />
              <Input
                className="w-48 focus:w-60 transition-all  h-8 pl-8 rounded-full bg-white"
                placeholder="Search..."
              />
            </div>

            <Drawer>
              <DrawerTrigger>
                <SearchIcon className="text-white text-2xl sm:hidden " />
              </DrawerTrigger>
              <DrawerContent className="h-80">
                <DrawerHeader className={"space-y-4"}>
                  <DrawerTitle>Search Everything</DrawerTitle>
                  <Input
                    className="rounded-md bg-white"
                    placeholder="Search..."
                  />
                  <Button>Search</Button>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>

      <motion.div
        layout
        transition={spring}
        className={clsx(
          "py-4 w-full    top-0  ",
          isScrolled && "bg-white shadow-md z-[99] sticky"
        )}
      >
        <div className="container flex justify-between  ">
          <Link href="/" legacyBehavior passHref>
            <Image
              src="/logo.svg"
              alt="logo"
              width={80}
              height={80}
              className="cursor-pointer"
            />
          </Link>
          {/* Web Version Navbar */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={item_one.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item_one.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{item_two.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid  md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <Image
                        src={item_two.image}
                        alt={item_two.title + "mega bekasi hypermall"}
                        width={900}
                        height={900}
                        className="h-full object-cover"
                      />
                    </li>
                    {item_two.lists.map((item, index) => (
                      <ListItem key={index} href={item.href} title={item.title}>
                        {item.desc}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {item_three.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="grid  md:w-[400px] lg:w-[420px] lg:grid-cols-[.75fr_1fr]">
                  <Image
                    src="/directory-menu.webp"
                    alt="directory-menu"
                    width={900}
                    height={900}
                    className="h-full object-cover"
                  />
                  <div>
                    <h3 className="px-8 pt-4 pb-2 font-bold">
                      Highlighted Categories
                    </h3>
                    <ul>
                      {item_three.lists.map((item, index) => (
                        <ListItem
                          className="py-2 text-muted-foreground"
                          key={index}
                          href={item.href}
                          title={item.title}
                        />
                      ))}
                    </ul>
                    <Link
                      href={item_three.href}
                      className="flex px-8 pt-4 pb-6 group items-center gap-2"
                    >
                      <p className="font-bold text-sm">Discover this Section</p>
                      <IoIosArrowForward className=" h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={item_four.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item_four.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={item_five.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item_five.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* Mobile Version Navbar */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <IoMenu className="text-3xl" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <Link
                    href={item_one.href}
                    className="font-bold active:text-primary"
                  >
                    {item_one.title}
                  </Link>
                  <Separator orientation="horizontal" />
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="font-bold">
                        {item_two.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-4">
                          {item_two.lists.map((item, index) => (
                            <li key={index}>
                              <Link href={item.href}>{item.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="font-bold ">
                        {item_three.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-4">
                          {item_three.lists.map((item, index) => (
                            <li key={index}>
                              <Link href={item.href}>{item.title}</Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={item_three.href}
                          className="flex pt-8 group items-center gap-2"
                        >
                          <p className="font-medium text-sm">
                            Discover this Section
                          </p>
                          <IoIosArrowForward className=" h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Link
                    href={item_four.href}
                    className="font-bold active:text-primary"
                  >
                    {item_four.title}
                  </Link>
                  <Separator orientation="horizontal" />
                  <Link
                    href={item_five.href}
                    className="font-bold active:text-primary"
                  >
                    {item_five.title}
                  </Link>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block py-4 select-none space-y-1 rounded-md px-8 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default Navbar;
