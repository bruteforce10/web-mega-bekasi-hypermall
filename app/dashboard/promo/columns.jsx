"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

const deleteDirectory = async (id) => {
  const res = await fetch(`http://localhost:3001/api/v1/cms/promos/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    alert("Directory deleted successfully");
    window.location.reload();
  } else {
    alert("Failed to delete directory");
  }
};

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
    accessorKey: "image",
    header: () => <div className="text-right">Images</div>,
    cell: ({ row }) => {
      return (
        <Image
          src={`http://localhost:3001/${row?.original?.image?.name}`}
          alt=""
          width={150}
          height={150}
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "directory",
    header: "Directory",
    cell: ({ row }) => {
      return (
        <div className="max-w-[150px]">{row.original.directory.title}</div>
      );
    },
  },
  {
    accessorKey: "startPromo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Promo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {moment(row.original.createdAt).format("DD MMM YYYY")}
        </div>
      );
    },
  },
  {
    accessorKey: "endPromo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Promo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {moment(row.original.createdAt).format("DD MMM YYYY")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <Link href={`/dashboard/promo/${row.original.slug}`}>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger className="font-medium bg-red-500 text-white px-4 rounded">
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteDirectory(row.original._id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
