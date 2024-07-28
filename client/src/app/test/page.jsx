"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useState } from "react";

// const items = [
//   { id: "Dịch vụ Facebook", label: "Dịch vụ Facebook" },
//   { id: "Dịch vụ Tiktok", label: "Dịch vụ Tiktok" },
//   { id: "Dịch vụ Google", label: "Dịch vụ Google" },
//   { id: "Dịch vụ Telegram", label: "Dịch vụ Telegram" },
//   { id: "Dịch vụ Shopee", label: "Dịch vụ Shopee" },
//   { id: "Dịch vụ Discord", label: "Dịch vụ Discord" },
//   { id: "Dịch vụ Twitter", label: "Dịch vụ Twitter" },
//   { id: "Dịch vụ Youtube", label: "Dịch vụ Youtube" },
//   { id: "Dịch vụ Zalo", label: "Dịch vụ Zalo" },
//   { id: "Dịch vụ Instagram", label: "Dịch vụ Instagram" },
//   { id: "Tương tác khác", label: "Tương tác khác" },
// ];

export default function CheckboxReactHookFormMultiple() {
  const [items, setItems] = useState([
    { id: "Dịch vụ Facebook", label: "Dịch vụ Facebook" },
    { id: "Dịch vụ Tiktok", label: "Dịch vụ Tiktok" },
    { id: "Dịch vụ Google", label: "Dịch vụ Google" },
    { id: "Dịch vụ Telegram", label: "Dịch vụ Telegram" },
    { id: "Dịch vụ Shopee", label: "Dịch vụ Shopee" },
    { id: "Dịch vụ Discord", label: "Dịch vụ Discord" },
    { id: "Dịch vụ Twitter", label: "Dịch vụ Twitter" },
    { id: "Dịch vụ Youtube", label: "Dịch vụ Youtube" },
    { id: "Dịch vụ Zalo", label: "Dịch vụ Zalo" },
    { id: "Dịch vụ Instagram", label: "Dịch vụ Instagram" },
    { id: "Tương tác khác", label: "Tương tác khác" },
  ]);
  const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
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
                                ? field.onChange([...field.value, item.id])
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
