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
import { format, set } from "date-fns";
import RichEditor from "@/components/RichEditor";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import titleToSlug from "@/lib/slug";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  directory: z.string(),
  location: z.string(),
  category: z.string(),
  linkInstagram: z.string().optional(),
  startPromo: z.date(),
  endPromo: z.date(),
});

export default function PromoPageEdit() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const router = useRouter();
  const editorRef = useRef(null);
  const { directories, isLoadingDirectory, promos } = useSelector(
    (state) => state.directory
  );
  const promo = promos.find((promo) => promo.slug === slug);
  const [image, setImage] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: promo?.title || "",
      directory: promo?.directory?._id || "",
      location: promo?.location || "",
      category: promo?.category || "",
      linkInstagram: promo?.linkInstagram || "",
      startPromo: new Date(promo?.startPromo) || new Date(),
      endPromo: new Date(promo?.endPromo) || new Date(),
    },
    reValidateMode: "onSubmit",
  });

  const imageSrc = image
    ? URL.createObjectURL(image)
    : promo?.image
    ? `http://localhost:3001/${promo.image.name}`
    : null;

  useEffect(() => {
    dispatch(fetchDirectories());
  }, []);

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  async function onSubmit(values) {
    dispatch(setLoadingDirectory(true));

    try {
      const imageId = await handleImageUpload(promo?.image?._id);

      const data = {
        ...values,
        image: imageId,
        description: editorRef.current?.getContent(),
        slug: titleToSlug(values.title),
      };

      await updatePromo(promo._id, data);

      alert("Promo updated successfully");
      resetForm();
      router.push("/dashboard/promo");
    } catch (error) {
      console.error("Error submitting promo:", error);
    } finally {
      dispatch(setLoadingDirectory(false));
    }
  }

  async function handleImageUpload(existingImageId) {
    if (!image) return existingImageId;

    if (image) {
      await deleteImage(existingImageId);
    }

    return await uploadImage();
  }

  // Helper function to delete an image
  async function deleteImage(imageId) {
    const response = await fetch(
      `http://localhost:3001/api/v1/cms/images/${imageId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Image deletion failed: ${response.statusText}`);
    }
  }

  // Helper function to upload a new image
  async function uploadImage() {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("http://localhost:3001/api/v1/cms/images", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data?._id;
  }

  // Helper function to update promo
  async function updatePromo(promoId, data) {
    const response = await fetch(
      `http://localhost:3001/api/v1/cms/promos/${promoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Promo update failed: ${response.statusText}`);
    }
  }

  // Helper function to reset the form
  function resetForm() {
    editorRef.current?.setContent("");
    const imageForm = document.getElementById("pictureUpload");
    imageForm.value = "";
    setImage(null);
    form.reset();
  }

  return (
    <div className="container mx-auto ml-12 space-y-8 mt-12 pb-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <div className="space-y-4 ">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="pictureUpload">Cover</Label>
                <Input
                  id="pictureUpload"
                  type="file"
                  onChange={onChangeImage}
                />
              </div>
            </div>

            {imageSrc && (
              <div className="space-y-4 mt-4">
                <h3>Preview Gambar:</h3>
                <Image src={imageSrc} alt="Preview" width={300} height={300} />
                <p className="text-muted-foreground">
                  pastikan ukuran gambarnya persegi (1080x1080)
                </p>
                <Button
                  type="button"
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
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Promo</FormLabel>
                <FormControl>
                  <Input placeholder="Promo title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="directory"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Directory</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? directories.find(
                              (directory) => directory._id === field.value
                            )?.title
                          : "Select directory"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search directory..." />
                      <CommandList>
                        <CommandEmpty>No directory found.</CommandEmpty>
                        <CommandGroup>
                          {directories.map((directory) => (
                            <CommandItem
                              value={directory.title}
                              key={directory._id}
                              onSelect={() => {
                                form.setValue("directory", directory._id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  directory.title === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {directory.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Promo</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"dinning"}>Dinning</SelectItem>
                    <SelectItem value={"shopping"}>Shopping</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkInstagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Promo (Instagram)</FormLabel>
                <FormControl>
                  <Input placeholder="link promo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startPromo"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Promo</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endPromo"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Promo</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < form.watch("startPromo")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <RichEditor reff={editorRef} value={promo?.description} />
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
