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
import axios from "@/configs/api";
import { useAppDispatch, useAppSelector } from "@/lib/reducer/hooks";
import { selectPosts, selectStatus } from "@/lib/features/posts/postSlice";
import CardDoanhMucPost from "./CardDoanhMucPost";
import { fetchPosts } from "@/lib/features/posts/actions/postActions";

const FormSchema = z.object({
  items: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "Vui lòng chọn ít nhất 1 bộ lọc",
  }),
});
export default function LeftDoanhMuc({ id, products, setData, services }) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const [items, setItems] = useState([]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  useEffect(() => {
    const fetchCate = async () => {
      try {
        const response = await axios.get(`/categories/${services}/` + id);

        services === "services"
          ? setItems(response.data.msg.subCategory)
          : setItems(response.data.msg.subCategory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCate();
  }, [services, id]);

  function onSubmit(item) {
    const filteredListings = products.filter((listing) => {
      if (services === "services") {
        return item.items.includes(listing.subCategoryId);
      } else {
        return item.items.includes(listing.subCategoryId);
      }
    });
    setData(filteredListings);
  }
  return (
    <div className="space-y-2 px-2 transition-transform duration-200">
      <div className="flex flex-col rounded-md border bg-background px-2 py-2">
        <h2 className="text-lg font-medium">Bộ lọc</h2>
        <ul className="list-none">
          <hr />
          <h3 className="mb-2 mt-2 text-[16px] font-medium leading-tight">
            Chọn 1 hoặc nhiều sản phẩm
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                          field.value.filter(
                                            (value) => value !== item.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.subCategory}
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
