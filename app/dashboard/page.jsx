"use client";
import BundledEditor from "@/components/BundledEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import titleToSlug from "@/lib/slug";
import ImageViewList from "./_component/ImageViewList";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(50),
  phone: z
    .string()
    .regex(/^(\+62|62|0)[0-9]{9,15}$/, "Nomor telepon harus dalam format 62"),
  instagram: z
    .string()
    .regex(/^@([a-zA-Z0-9_]{1,30})$/, "Instagram harus dalam format @username"),
  location: z.string().min(2).max(25),
  categories: z.string(),
});

const DirectoryPage = () => {
  const editorRef = useRef(null);
  const [image, setImage] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [coverId, setCoverId] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      phone: "",
      instagram: "",
      location: "",
      categories: "",
    },
    reValidateMode: "onSubmit",
  });

  const getDataImage = async (id) => {
    const res = await axios.get(
      `http://localhost:3001/api/v1/cms/cover-directorys/${id}`
    );
    setImageData(res?.data?.data);
  };

  const getDataCategories = async () => {
    const res = await axios.get("http://localhost:3001/api/v1/cms/categories");
    setCategoriesData(res?.data?.data);
  };

  async function onSubmit(values) {
    if (!imageData) {
      alert("Please add an image");
      return;
    }

    // if (editorRef.current) {
    //   console.log(editorRef.current.getContent());
    // }

    const imagesMap = imageData?.images?.map((image) => image._id);
    const data = {
      ...values,
      description: editorRef.current.getContent(),
      images: imagesMap,
      slug: titleToSlug(values.title),
    };

    const response = await fetch("http://localhost:3001/api/v1/cms/directory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert("Failed to create cover directory");
      return;
    }

    alert("Cover directory created successfully");
  }

  useEffect(() => {
    const coverIdFromLocalStorage = window.localStorage.getItem("coverId");
    if (coverIdFromLocalStorage) {
      setCoverId(coverIdFromLocalStorage);
      getDataImage(coverIdFromLocalStorage);
    }

    getDataCategories();
  }, [image]);

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmitImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const uploadResponse = await fetch(
        "http://localhost:3001/api/v1/cms/images",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Image upload failed: ${uploadResponse.statusText}`);
      }

      const uploadedImageData = await uploadResponse.json();

      if (uploadedImageData) {
        const coverResponse = await fetch(
          "http://localhost:3001/api/v1/cms/cover-directorys",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: descriptionText || imageData?.title,
              images: uploadedImageData?.data?._id,
            }),
          }
        );

        if (!coverResponse.ok) {
          throw new Error(
            `Cover directory submission failed: ${coverResponse.statusText}`
          );
        }

        const coverData = await coverResponse.json();

        if (coverData) {
          setImage("");
          const inputUpload = document.getElementById("pictureUpload");
          window.localStorage.setItem("coverId", coverData?.data._id);
          setCoverId(coverData?.data._id);

          inputUpload.value = "";
        }
      }
    } catch (error) {
      console.error("Error during image submission:", error);
    }
  };

  return (
    <div className="container mx-auto ml-12 space-y-8 mt-12">
      <div className="flex justify-between gap-12">
        <div>
          <div className="space-y-4 ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="pictureUpload">Cover</Label>
              <Input id="pictureUpload" type="file" onChange={onChangeImage} />
            </div>
          </div>

          {image && (
            <div className="space-y-4 mt-4">
              <h3>Preview Gambar:</h3>
              <Input
                type="text"
                placeholder="deskripsi gambar"
                value={descriptionText || imageData?.title}
                onChange={(e) => setDescriptionText(e.target.value)}
                disabled={coverId}
              />
              <Image
                src={URL.createObjectURL(image)}
                alt="Selected"
                width={300}
                height={300}
              />
              <Button
                variant="secondary"
                onClick={handleSubmitImage}
                className="py-0"
              >
                Submit Gambar
              </Button>
            </div>
          )}
        </div>

        {coverId && <ImageViewList image={imageData} />}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title Directory" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. +628123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram Username</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. @tenant" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Gedung East Lt.3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoriesData?.map((item) => (
                      <SelectItem key={item?._id} value={item?._id}>
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <BundledEditor
            onInit={(_evt, editor) => (editorRef.current = editor)}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "help",
                "image",
                "link",
                "lists",
                "searchreplace",
                "table",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | image | link | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default DirectoryPage;
