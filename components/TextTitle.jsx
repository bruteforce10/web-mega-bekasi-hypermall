import { cn } from "@/lib/utils";

const TextTitle = ({
  title,
  subTitle,
  icon,
  className,
  classNameTitle,
  classNameSubTitle,
}) => {
  return (
    <div className={cn("text-center mt-20 space-y-2 relative", className)}>
      {icon}
      <p
        className={cn(
          "uppercase text-md lg:text-lg tracking-widest ",
          classNameSubTitle
        )}
      >
        {subTitle}
      </p>
      <h1 className={cn("h2", classNameTitle)}>{title}</h1>
    </div>
  );
};

export default TextTitle;
