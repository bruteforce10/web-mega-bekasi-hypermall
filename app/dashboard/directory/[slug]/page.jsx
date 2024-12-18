"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ImageViewList from "../../_component/ImageViewList";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchDirectories,
  setLoadingDirectory,
} from "@/app/redux/directory/directorySlicer";
import RichEditor from "@/components/RichEditor";
import { Loader2 } from "lucide-react";
import { DirectoryOps } from "@/lib/data";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(50),
  phone: z
    .string()
    .regex(/^(\+62|62|0)[0-9]{9,15}$/, "Nomor telepon harus dalam format 62"),
  instagram: z.string(),
  location: z.string().min(2).max(25),
  categories: z.string(),
  floor: z.string(),
});

export default function EditDirectory() {
  const { slug } = useParams();
  const router = useRouter();
  const editorRef = useRef(null);
  const [image, setImage] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [coverId, setCoverId] = useState("");
  const [imageData, setImageData] = useState(null);
  const { categories, isLoadingDirectory, directories } = useSelector(
    (state) => state.directory
  );
  const dispatch = useDispatch();
  const directory = directories.find((directory) => directory.slug === slug);

  useEffect(() => {
    dispatch(fetchDirectories());
    if (directory) {
      getDataImage(directory?._id);
    }
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: directory?.title || "",
      phone: directory?.phone || "",
      instagram: directory?.instagram || "",
      location: directory?.location || "",
      categories: directory?.categories._id || "",
      floor: directory?.floor || "",
    },
    reValidateMode: "onSubmit",
  });

  const getDataImage = async (id) => {
    const res = await axios.get(
      `http://localhost:3001/api/v1/cms/cover-directorys/${id}`
    );
    setImageData(res?.data?.data);
    setCoverId(res?.data?.data?._id);
  };

  async function onSubmit(values) {
    dispatch(setLoadingDirectory(true));
    if (!imageData) {
      alert("Please add an image");
      dispatch(setLoadingDirectory(false));
      return;
    }

    const data = {
      ...values,
      description: editorRef.current.getContent(),
      images: coverId,
      slug: titleToSlug(values.title),
    };

    const response = await fetch(
      `http://localhost:3001/api/v1/cms/directory/${directory?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      alert("Failed to create cover directory");
      dispatch(setLoadingDirectory(false));
      return;
    }

    form.reset();
    dispatch(setLoadingDirectory(false));
    dispatch(fetchDirectories());
    router.push("/dashboard/directory");
  }

  useEffect(() => {
    getDataImage(directory?.images?._id);

    dispatch(fetchCategories());
  }, [image]);

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmitImage = async () => {
    dispatch(setLoadingDirectory(true));
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
          setCoverId(coverData?.data._id);

          inputUpload.value = "";
          dispatch(setLoadingDirectory(false));
        }
      }
    } catch (error) {
      console.error("Error during image submission:", error);
      dispatch(setLoadingDirectory(false));
    }
  };

  return (
    <div className="container mx-auto ml-12 space-y-8 mt-12 pb-24">
      <div className="flex justify-between gap-12">
        <div>
          <div className="space-y-4 ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="pictureUpload">Cover</Label>
              <Input id="pictureUpload" type="file" onChange={onChangeImage} />
              <p className="text-sm text-muted-foreground">
                ukuran gambar harus 16:9 rasionya atau persegi panjang
              </p>
            </div>
          </div>

          {image && (
            <div className="space-y-4 mt-4">
              <h3>Preview Gambar:</h3>
              <Input
                type="text"
                placeholder="deskripsi gambar"
                value={imageData?.title ? imageData?.title : descriptionText}
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
                onClick={handleSubmitImage}
                disabled={isLoadingDirectory}
                className="py-0"
              >
                {isLoadingDirectory ? (
                  <>
                    <Loader2 className=" h-4 w-4 animate-spin" />
                    <span className="ml-2">Loading</span>
                  </>
                ) : (
                  "Submit"
                )}
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
                  <Input placeholder="e.g. tenant" {...field} />
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
                    {categories?.map((item) => (
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
          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a floor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DirectoryOps?.floor.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <RichEditor reff={editorRef} value={directory?.description} />
          <Button type="submit" disabled={isLoadingDirectory}>
            {isLoadingDirectory ? (
              <>
                <Loader2 className=" h-4 w-4 animate-spin" />
                <span className="ml-2">Loading</span>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
