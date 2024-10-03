"use client";
import React, { useState } from "react";
import { IoTimeSharp } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { Chart } from "react-google-charts";

export const data = [
  ["Day", "Sales", "Expenses"],
  ["1", 1000, 400],
  ["2", 1170, 460],
  ["3", 660, 1120],
  ["4", 1030, 540],
  ["5", 1030, 540],
  ["6", 1030, 540],
  ["7", 1030, 540],
  ["8", 1030, 540],
  ["9", 1030, 540],
  ["10", 1030, 540],
  ["11", 1030, 540],
  ["12", 1030, 540],
  ["13", 1030, 540],
  ["14", 1030, 540],
  ["15", 1030, 540],
  ["16", 1030, 540],
  ["17", 1030, 540],
  ["18", 1030, 540],
  ["19", 1030, 540],
  ["20", 1030, 540],
  ["21", 1030, 540],
  ["22", 1030, 540],
  ["23", 1030, 540],
  ["24", 1030, 540],
  ["25", 1030, 540],
  ["26", 1030, 540],
  ["27", 1030, 540],
];

export const options = {
  title: "30 Ngày gần nhất",
  curveType: "function",
  legend: { position: "bottom" },
};
export default function Sales() {
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="md:-10 grid grid-cols-2 gap-2">
        <div className="card max-w-60">
          <h2 className="text-lg font-medium">Số đơn hàng</h2>
          <div className="flex items-center gap-2">
            <IoTimeSharp className="h-6 w-6 text-primary" />
            <p>0</p>
          </div>
        </div>
        <div className="card max-w-60">
          <h2 className="text-lg font-medium">Doanh số</h2>
          <div className="flex items-center gap-2">
            <LuShoppingBag className="h-6 w-6 text-primary" />
            <p>0</p>
          </div>
        </div>
      </div>
      <div className="card">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
      <div className="flex items-center justify-center">
        <h3 className="top-1/2 before:h-1 before:w-full before:text-black before:[content:('')]">
          KINH DOANH THÁNG 06/2024
        </h3>
      </div>
      <div className="mx-auto flex w-max items-center justify-center rounded-lg bg-background px-2 py-1">
        <h5 className="top-1/2 py-1 text-gray-600 before:h-1 before:w-full before:text-black before:[content:('')]">
          O6/2024
        </h5>
      </div>
      <div className="md:-10 grid grid-cols-2 gap-2 md:flex">
        <div className="card max-w-60 md:min-w-60">
          <h2 className="text-lg font-medium">Số đơn hàng</h2>
          <div className="flex items-center gap-2">
            <IoTimeSharp className="h-6 w-6 text-primary" />
            <p>0</p>
          </div>
        </div>
        <div className="card max-w-60 md:min-w-60">
          <h2 className="text-lg font-medium">Doanh số</h2>
          <div className="flex items-center gap-2">
            <LuShoppingBag className="h-6 w-6 text-primary" />
            <p>0</p>
          </div>
        </div>
        <div className="card max-w-60 md:min-w-60">
          <h2 className="text-lg font-medium">Sàn tạm giữ</h2>
          <div className="flex items-center gap-2">
            <LuShoppingBag className="h-6 w-6 text-primary" />
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
