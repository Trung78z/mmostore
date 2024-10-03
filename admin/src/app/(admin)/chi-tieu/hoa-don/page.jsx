"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MdDelete } from "react-icons/md";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { Button, Input } from "@headlessui/react";
import ViewBaiviet from "@/components/kiemduyet/ViewBaiviet";
import ViewPricing from "@/components/thanhtoan/ViewPricing";
import axios from "@/configs/api";
import ViewImage from "@/components/thanhtoan/ViewImage";
import { formatDatePost } from "@/lib/utils";
import { toast } from "react-toastify";
export default function DonHangSanPham() {
  return (

    <>
    
      <iframe
        src="https://public.casso.vn/96d2ab10-68db-11ef-9eef-9daee9cc4b4e"
        allowfullscreen="allowfullscreen"
        style={{ width: 100 + "%", height: "100vh" }}
      ></iframe>
    </>
  );
}
