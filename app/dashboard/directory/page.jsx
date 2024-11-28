"use client";

import { useDispatch, useSelector } from "react-redux";
import { columns } from "./columns";
import { DataTable } from "../_component/data-table";
import { useEffect } from "react";
import { fetchDirectories } from "@/app/redux/directory/directorySlicer";

export default function DirectoryPage() {
  const { directories } = useSelector((state) => state.directory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDirectories());
    console.log(directories);
  }, []);

  return (
    <div className="ml-12  mt-12 pb-24 space-y-8">
      <h3 className="text-md tracking-widest uppercase">Dashboard Directory</h3>
      <DataTable
        hrefAddData="/dashboard/directory/add"
        columns={columns}
        data={directories}
      />
    </div>
  );
}
