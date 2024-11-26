"use client";
import React, { useEffect } from "react";
import { DataTable } from "../_component/data-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "@/app/redux/directory/directorySlicer";
import { columns } from "./columns";

export default function PromoPage() {
  const { events } = useSelector((state) => state.directory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
    console.log(events);
  }, []);

  return (
    <div className="ml-12  mt-12 pb-24 space-y-8">
      <h3 className="text-md tracking-widest uppercase">Dashboard Event</h3>
      <DataTable
        hrefAddData="/dashboard/event/add"
        columns={columns}
        data={events}
      />
    </div>
  );
}
