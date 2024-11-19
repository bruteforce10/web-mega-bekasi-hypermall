"use client";

import { useDispatch, useSelector } from "react-redux";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect } from "react";
import { fetchDirectories } from "@/app/redux/directory/directorySlicer";

export default function DirectoryPage() {
  const { directories } = useSelector((state) => state.directory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDirectories());
  }, []);

  return (
    <div className="ml-12  mt-12 pb-24 space-y-8">
      <DataTable columns={columns} data={directories} />
    </div>
  );
}
