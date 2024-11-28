"use client";
import React, { useEffect } from "react";
import { DataTable } from "../_component/data-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "@/app/redux/directory/directorySlicer";
import { columns } from "./columns";

export default function ArticlePage() {
  const { articles } = useSelector((state) => state.directory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <div className="ml-12  mt-12 pb-24 space-y-8">
      <h3 className="text-md tracking-widest uppercase">Dashboard Article</h3>
      <DataTable
        hrefAddData="/dashboard/article/add"
        columns={columns}
        data={articles}
      />
    </div>
  );
}
