"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import moment from "moment";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "images",
    header: () => <div className="text-right">Images</div>,
    cell: ({ row }) => {
      return (
        <Image
          src={`http://localhost:3001/${row.original.images[0].name}`}
          alt=""
          width={150}
          height={150}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {moment(row.original.createdAt).format("DD MMM YYYY")}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "categories",
    header: "Category",
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.categories.name}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      );
    },
  },
];
