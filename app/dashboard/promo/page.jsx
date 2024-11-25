"use client";
import React, { useEffect } from "react";
import { DataTable } from "../_component/data-table";
import { columns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromo } from "@/app/redux/directory/directorySlicer";

export default function PromoPage() {
  const { promos } = useSelector((state) => state.directory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPromo());
    console.log(promos);
  }, []);

  return (
    <div className="ml-12  mt-12 pb-24 space-y-8">
      <DataTable
        hrefAddData="/dashboard/promo/add"
        columns={columns}
        data={promos}
      />
    </div>
  );
}
