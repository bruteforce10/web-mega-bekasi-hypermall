import CategorySection from "@/components/CategorySection";
import CouponSection from "@/components/CouponSection";
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import OpeningTenantSection from "@/components/OpeningTenantSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Header />
      <CategorySection />
      <CouponSection />
      <OpeningTenantSection />
      <NewsSection />
    </main>
  );
}
