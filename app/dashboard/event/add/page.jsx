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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  location: z.string(),
  linkInstagram: z.string().optional(),
  startEvent: z.date(),
  endEvent: z.date(),
});

export default function EventPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { directories, isLoadingDirectory } = useSelector(
    (state) => state.directory
  );
  const [image, setImage] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      linkInstagram: "",
      startEvent: new Date(),
      endEvent: new Date(),
    },
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    dispatch(fetchDirectories());
    console.log(directories);
  }, []);

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
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
          "http://localhost:3001/api/v1/cms/events",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          alert("Event Nama sudah ada");
          throw new Error(`Event creation failed: ${response.statusText}`);
        }

        alert("Event created successfully");
        dispatch(setLoadingDirectory(false));
        editorRef.current?.setContent("");
        const imageForm = document.getElementById("pictureUpload");
        imageForm.value = "";
        setImage(null);
        form.reset();
        router.push("/dashboard/event");
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoadingDirectory(false));
    }
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
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Event</FormLabel>
                <FormControl>
                  <Input placeholder="Event title" {...field} />
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
                <FormLabel>Location Event</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkInstagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="Link Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startEvent"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Event</FormLabel>
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
            name="endEvent"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Event</FormLabel>
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
          <RichEditor reff={editorRef} />
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
