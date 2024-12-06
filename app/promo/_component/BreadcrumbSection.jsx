import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

const BreadcrumbSection = ({ className, breadTwo, breadThree }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className={cn("", className)}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${breadTwo}`} className="capitalize">
            {breadTwo}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadThree && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${breadTwo}/${breadThree}`}
                className="capitalize"
              >
                {breadThree}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbSection;
