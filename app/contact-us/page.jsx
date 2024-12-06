"use client";
import { contactUs } from "@/lib/data";
import Image from "next/image";
import CardContact from "./_components/Card";
import { HiOfficeBuilding } from "react-icons/hi";
import { RiContactsBook3Fill } from "react-icons/ri";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullname: z.string().min(5, {
    message: "Fullname must be at least 5 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  phone: z.string().min(8, {
    message: "Phone number must be at least 8 characters",
  }),
  specific_inquiry: z.string().min(5, {
    message: "Specific inquiry is required",
  }),
  subject: z.string().min(5, {
    message: "Fullname must be at least 5 characters",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters",
  }),
});

export default function VisitGettingHerePage() {
  const { title, desc, dataManagementOffice, dataContact } = contactUs;
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      specific_inquiry: "",
      subject: "",
      message: "",
    },
    reValidateMode: "onSubmit",
  });
  const { toast } = useToast();

  async function onSubmit(values) {
    setLoading(true);
    try {
      const sendEmail = await fetch(
        "http://localhost:3001/api/v1/cms/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: values.subject,
            text: `
            Fullname: ${values.fullname},
            Email: ${values.email},
            Spesific Inquiry: ${values.specific_inquiry},
            Phone: ${values.phone},
            Message: ${values.message}`,
          }),
        }
      );

      if (!sendEmail.ok) {
        throw new Error("Failed to send email");
      }

      toast({
        title: "Successfully",
        description: "Hey, your email has been sent successfully",
      });
      form.reset();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <main>
      <section>
        <div className="relative">
          <div className="text-white w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h3 className="h2 tracking-wider max-md:mb-2">{title}</h3>
            <p className="tracking-wider leading-tight">{desc}</p>
          </div>
          <Image
            src="/cover/about-us.webp"
            alt="promo-menu-mall-bekasi-hypermall"
            width={1920}
            height={1080}
            quality={100}
            className="h-full min-h-[120px] object-cover w-full"
          />
        </div>
      </section>
      <section className="container mx-auto mt-16 max-sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 ">
          <div className="space-y-12">
            <CardContact
              Icon={<HiOfficeBuilding className="text-2xl text-white" />}
              title={dataManagementOffice.title}
              desc={dataManagementOffice.address}
              Data={
                <ul>
                  {dataManagementOffice.data.map((item, index) => (
                    <li key={index} className="font-bold">
                      {item}
                    </li>
                  ))}
                </ul>
              }
            />
            <CardContact
              Icon={<RiContactsBook3Fill className="text-2xl text-white" />}
              title={dataContact.title}
              Data={
                <ul>
                  {dataContact.data.map((item, index) => (
                    <li key={index} className="-space-y-2 py-1">
                      <h5 className="text-[#C82435] font-bold">{item.title}</h5>
                      <p>{item.email}</p>
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
          <div className="space-y-4 w-full">
            <h2 className="text-3xl font-medium">
              Hello there, Got something to Discuss?
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
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
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specific_inquiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specific Inquiry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your inquiry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Customer Service">
                            Customer Service
                          </SelectItem>
                          <SelectItem value="Leasing">Leasing</SelectItem>
                          <SelectItem value="Casual Leasing">
                            Casual Leasing
                          </SelectItem>
                          <SelectItem value="Marketing Communications">
                            Marketing Communications
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about it" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loading ? (
                  <Button
                    disabled
                    className="rounded-lg w-full flex gap-1  md:w-[200px]"
                  >
                    <Loader2 className="animate-spin  w-4 h-4" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="rounded-lg w-full md:w-[200px]"
                  >
                    Submit
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
