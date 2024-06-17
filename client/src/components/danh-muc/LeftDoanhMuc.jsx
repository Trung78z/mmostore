"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BiSolidLike } from "react-icons/bi";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
const LinksComponent = () => {
  return (
    <ul className="list-none">
      <li className="relative min-h-40">
        <Image
          src="https://taphoammo.net/img/post/mo-xe-thuat-toan-cua-twitter-x_693559.png"
          alt=""
          fill="true"
          className="rounded-md"
        />
      </li>
      <li>
        <h4 className="text-sm font-medium">
          MỔ XẺ THUẬT TOÁN CỦA TWITTER (X)
        </h4>
      </li>
      <li>
        <ul className="flex list-none gap-2">
          <li className="flex items-center gap-x-1 text-sm text-gray-600">
            <FaEye /> <span>2k</span>
          </li>
          <li className="flex items-center gap-x-1 text-sm text-gray-600">
            <BiSolidLike />0
          </li>
          <li className="flex items-center gap-x-1 text-sm text-gray-600">
            <IoIosChatbubbles />0
          </li>
        </ul>
      </li>
      <li className="font-medium text-primary">gianhangzalo</li>
    </ul>
  );
};

const items = [
  {
    id: "Email",
    label: "Email",
  },
  {
    id: "Outlook",
    label: "Outlook",
  },
  {
    id: "Yahoo",
    label: "Yahoo",
  },
];
const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
export default function LeftDoanhMuc() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className="space-y-2 px-2">
      <div className="flex flex-col rounded-md border bg-background px-2 py-2">
        <h2 className="text-lg font-medium">Bộ lọc</h2>
        <ul className="list-none">
          <hr />
          <h3 className="mb-2 text-[16px] font-medium">
            Chọn 1 hoặc nhiều sản phẩm
          </h3>
          <li>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="items"
                  render={() => (
                    <FormItem>
                      {items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="items"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="sm">
                  Tìm kiếm
                </Button>
              </form>
            </Form>
          </li>
        </ul>
      </div>
      <div className="flex flex-col rounded-md border bg-background px-2 py-2">
        <h2 className="text-lg font-medium">Bài viết tham khảo</h2>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <LinksComponent />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
