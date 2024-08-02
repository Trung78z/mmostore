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
            <h3>Gian hàng email</h3>
            <p>Tổng {products.length} gian hàng</p>
          </div>

          <Tabs defaultValue="1" className="w-full">
            <TabsList>
              <TabsTrigger value="1">Phổ biến</TabsTrigger>
              <TabsTrigger value="2">Giá tăng dần</TabsTrigger>
              <TabsTrigger value="3">Giá giảm dần</TabsTrigger>
            </TabsList>

            <TabsContent value="1" className="w-full space-y-2">
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
            <TabsContent value="2" className="w-full space-y-2">
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
            <TabsContent value="3" className="w-full space-y-2">
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
