import { cn } from "@/lib/utils";

const TextTitle = ({ title, subTitle, icon, className }) => {
  return (
    <div className={cn("text-center mt-20 space-y-2 relative", className)}>
      {icon}
      <p className="uppercase text-md lg:text-lg tracking-widest ">
        {subTitle}
      </p>
      <h1 className="h2 ">{title}</h1>
    </div>
  );
};

export default TextTitle;
