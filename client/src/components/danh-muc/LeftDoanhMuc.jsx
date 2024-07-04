"use client";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { useAppDispatch, useAppSelector } from "@/lib/reducer/hooks";
import { selectPosts, selectStatus } from "@/lib/features/post/postSlice";
import CardDoanhMucPost from "./CardDoanhMucPost";
import { fetchPosts } from "@/lib/features/post/actions/postActions";

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
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
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
          <h3 className="mb-2 text-[16px] font-medium leading-tight">
            Chọn 1 hoặc nhiều sản phẩm
          </h3>
          <li className="ml-0">
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
          {posts.slice(0, 4).map((_, index) => (
            <div key={index}>
              <CardDoanhMucPost data={_} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
