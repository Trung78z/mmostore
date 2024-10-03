"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LeftDoanhMuc from "@/components/danh-muc/LeftDoanhMuc";

import { fetchService } from "@/lib/features/services/actions/serviceActions";
import { useAppDispatch, useAppSelector } from "@/lib/reducer/hooks";
import CardService from "@/components/danh-muc/CardService";
import CardServiceVip from "@/components/danh-muc/CardServiceVip";
import { useParams } from "next/navigation";
import { slugService } from "@/lib/data/slug";
import {
  selectService,
  selectServiceStatus,
} from "@/lib/features/services/serviceSlice";

export default function DoanhMucDichVu() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectService);
  const status = useAppSelector(selectServiceStatus);
  const [data, setData] = useState([]);
  const [dataV, setDataV] = useState({});

  useEffect(() => {
    dispatch(fetchService(id));
  }, [dispatch, id]);
  useEffect(() => {
    const filter = products.filter((item) => item.sponsor !== true);
    const filterV = products.find((item) => item.sponsor === true);

    setData(filter);
    setDataV(filterV);
  }, [products]);
  const handleChangeService = (e) => {
    const getHighestPrice = (product) => {
      if (product.serviceSales.length === 0) return 0;
      return Math.max(...product.serviceSales.map((sale) => sale.price));
    };

    if (e === "decrease") {
      // Sắp xếp theo giá cao nhất giảm dần
      const sortedProducts = data
        .slice()
        .sort((a, b) => getHighestPrice(b) - getHighestPrice(a));

      setData(sortedProducts);
    } else if (e === "increase") {
      // Sắp xếp theo giá cao nhất tăng dần
      const sortedProducts = data
        .slice()
        .sort((a, b) => getHighestPrice(a) - getHighestPrice(b));

      setData(sortedProducts);
    } else {
      // Lọc sản phẩm không phải là sponsor
      const filter = products.filter((item) => item.sponsor !== true);
      setData(filter);
    }
  };
  return (
    <div className="flex gap-x-1 py-4">
      <div className="hidden w-[220px] md:block" id="ssssssss">
        <LeftDoanhMuc
          id={id}
          setData={setData}
          products={products}
          services="services"
        />
      </div>
      <div className="mr-0 flex-1 xl:mr-5 2xl:mr-10">
        <div className="space-y-6 px-2 md:px-4 lg:pr-10">
          <div className="flex items-center gap-x-4">
            <h3>
              Gian hàng{" "}
              {id === "tang-tuong-tac"
                ? "tăng tương tác"
                : id === "dich-vu-phan-mem"
                  ? "dịch vụ phần mềm"
                  : id === "blockchain"
                    ? "Blockchain"
                    : "dịch vụ khác"}
            </h3>
            <p>Tổng {products.length} gian hàng</p>
          </div>

          <Tabs
            defaultValue="popular"
            className="w-full"
            onValueChange={handleChangeService}
          >
            <TabsList>
              <TabsTrigger value="popular">Phổ biến</TabsTrigger>
              <TabsTrigger value="increase">Giá tăng dần</TabsTrigger>
              <TabsTrigger value="decrease">Giá giảm dần</TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="w-full space-y-2">
              <div className="grid w-full grid-cols-1">
                {dataV ? (
                  <CardServiceVip props={dataV} id={id} product="Dịch vụ" />
                ) : (
                  <>Liên hệ với chúng tôi để đặt quảng cáo!</>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {data.map((row, index) => (
                  <div key={index}>
                    <CardService props={row} id={id} product="Dịch vụ" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="increase" className="w-full space-y-2">
              <div className="grid w-full grid-cols-1">
                {dataV ? (
                  <CardServiceVip props={dataV} id={id} product="Dịch vụ" />
                ) : (
                  <>Liên hệ với chúng tôi để đặt quảng cáo!</>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {data.map((row, index) => (
                  <div key={index}>
                    <CardService props={row} id={id} product="Dịch vụ" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="decrease" className="w-full space-y-2">
              <div className="grid w-full grid-cols-1">
                {dataV ? (
                  <CardServiceVip props={dataV} id={id} product="Dịch vụ" />
                ) : (
                  <>Liên hệ với chúng tôi để đặt quảng cáo!</>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {data.map((row, index) => (
                  <div key={index}>
                    <CardService props={row} id={id} product="Dịch vụ" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
