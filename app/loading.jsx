import LoadingComponent from "@/components/LoadingComponent";

export default function Loading() {
  return (
    <div className="flex justify-center bg-white  absolute top-0 left-0 right-0 bottom-0 z-[999] items-center ">
      <LoadingComponent />
    </div>
  );
}
