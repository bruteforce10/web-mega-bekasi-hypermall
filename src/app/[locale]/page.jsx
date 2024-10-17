import CategorySection from "@/components/CategorySection";
import CouponSection from "@/components/CouponSection";
import FacilitySection from "@/components/FacilitySection";
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import OpeningTenantSection from "@/components/OpeningTenantSection";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  console.log(t("title"));

  return (
    <main>
      <Header />
      <CategorySection />
      <CouponSection />
      <OpeningTenantSection />
      <NewsSection />
      <FacilitySection />
    </main>
  );
}
