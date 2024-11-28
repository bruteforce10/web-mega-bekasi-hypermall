import LoadingComponent from "@/components/LoadingComponent";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center bg-white  absolute top-0 left-0 right-0 bottom-0 z-[999] items-center ">
      <div>
        <Image
          src="/logo.svg"
          alt="megabekasi-hypermall"
          width={150}
          className="animate-bounce"
          height={150}
        />
        <div className="w-[150px] mb-6 h-[150px]">
          <LoadingComponent />
        </div>
      </div>
    </div>
  );
}
