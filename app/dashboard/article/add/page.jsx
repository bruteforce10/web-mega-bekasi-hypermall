"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  fetchDirectories,
  setLoadingDirectory,
} from "@/app/redux/directory/directorySlicer";
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import RichEditor from "@/components/RichEditor";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import titleToSlug from "@/lib/slug";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2).max(50, {
    message: "Title must be between 2 and 50 characters",
  }),
  description: z.string(),
  newsOpening: z.boolean().default(false).optional(),
  metaTitle: z.string().max(60, {
    message: "Meta title must be less than 60 characters",
  }),
  metaDescription: z.string().max(155, {
    message: "Meta description must be less than 155 characters",
  }),
});

export default function AddArticle() {
  const dispatch = useDispatch();
  const { isLoadingDirectory } = useSelector((state) => state.directory);
  const editorRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageArticle, setImageArticle] = useState(null);
  const [linkImage, setLinkImage] = useState(null);

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const onChangeImageArticle = (event) => {
    const file = event.target.files[0];
    setImageArticle(file);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      newsOpening: false,
      description: "",
      metaTitle: "",
      metaDescription: "",
    },
    reValidateMode: "onSubmit",
  });

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(linkImage);
  };

  const handleUploadImageNews = async (e) => {
    e.preventDefault();

    if (!imageArticle) return alert("Please select an image to upload.");
    dispatch(setLoadingDirectory(true));
    try {
      const formData = new FormData();
      formData.append("image", imageArticle);
      formData.append("type", "news");

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
      setLinkImage("http://localhost:3001/" + uploadedImageData?.data?.name);
      dispatch(setLoadingDirectory(false));
    } catch (error) {
      console.error("Error uploading image:", error);
      dispatch(setLoadingDirectory(false));
    }
  };

  async function onSubmit(values) {
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
        const data = {
          ...values,
          image: uploadedImageData?.data?._id,
          description: editorRef.current.getContent(),
          slug: titleToSlug(values.title),
        };

        const response = await fetch(
          "http://localhost:3001/api/v1/cms/articles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error(`Article creation failed: ${response.statusText}`);
        }

        alert("Article created successfully");
        dispatch(setLoadingDirectory(false));
        editorRef.current?.setContent("");
        const imageForm = document.getElementById("pictureUpload");
        imageForm.value = "";
        setImage(null);
        form.reset();
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoadingDirectory(false));
    }
  }

  return (
    <div className="container mx-auto ml-12 space-y-8 mt-12 pb-24">
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
            <Image
              src={URL.createObjectURL(image)}
              alt="Selected"
              width={300}
              height={300}
            />
            <p className="text-muted-foreground">
              pastikan ukuran gambarnya persegi (1080x1080)
            </p>
            <Button
              variant="destructive"
              onClick={() => {
                setImage(null);
                const input = document.getElementById("pictureUpload");
                input.value = "";
              }}
            >
              Reset
            </Button>
          </div>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Article</FormLabel>
                <FormControl>
                  <Input placeholder="Article title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input placeholder="Meta Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Meta Description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newsOpening"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    id="terms2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label
                  htmlFor="terms2"
                  className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Grand Opening News
                </label>
              </FormItem>
            )}
          />

          <div className="pt-12 space-y-6">
            <h3 className="text-lg  font-medium">Add Article</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input
                  id="pictureUpload"
                  value={imageArticle?.filename}
                  type="file"
                  onChange={onChangeImageArticle}
                />
                <Button variant="secondary" onClick={handleUploadImageNews}>
                  {isLoadingDirectory ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    " Upload Image News"
                  )}
                </Button>
              </div>
              {linkImage && (
                <div className="flex gap-4 items-center">
                  <div className="px-12  py-1 border-2 w-fit border-dashed ">
                    <span>{linkImage}</span>
                    <Button
                      onClick={handleCopy}
                      variant="link"
                      className="text-black"
                    >
                      Copy
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setLinkImage(null);
                      setImageArticle(null);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
            <RichEditor reff={editorRef} />
          </div>
          <Button type="submit">
            {isLoadingDirectory ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
