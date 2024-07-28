"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LeftDoanhMuc from "@/components/danh-muc/LeftDoanhMuc";

import { fetchProducts } from "@/lib/features/products/actions/productActions";
import {
  selectProducts,
  selectProductsStatus,
} from "@/lib/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reducer/hooks";
import CardProduct from "@/components/danh-muc/CardProduct";
import CardProductVip from "@/components/danh-muc/CardProductVip";
import { useParams } from "next/navigation";
import { slugService } from "@/lib/data/slug";

export default function DoanhMucDichVu() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const [data, setData] = useState([]);
  const [dataV, setDataV] = useState({});
  useEffect(() => {
    dispatch(fetchProducts(id));
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
          slugService={slugService}
        />
      </div>
      <div className="mr-0 flex-1 xl:mr-5 2xl:mr-10">
        <div className="space-y-6 px-2 md:px-4 lg:pr-10">
          <div className="flex items-center gap-x-4">
            <h3>Gian hàng email</h3>
            <p>Tổng {products.length} gian hàng</p>
          </div>
          <div className="flex w-full flex-wrap rounded-md border border-primary p-2">
            <h5>
              Đối với gian hàng không trùng, chúng tôi cam kết sản phẩm được bán
              ra 1 lần duy nhất trên hệ thống, tránh trường hợp sản phẩm đó được
              bán nhiều lần.
            </h5>
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
                  <CardProductVip props={dataV} id={id} product="Dịch vụ" />
                ) : (
                  <>Liên hệ với chúng tôi để đặt quảng cáo!</>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {data.map((row, index) => (
                  <div key={index}>
                    <CardProduct props={row} id={id} product="Dịch vụ" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="2" className="w-full space-y-2">
              <div className="grid w-full grid-cols-1">
                {dataV ? (
                  <CardProductVip props={dataV} id={id} product="Dịch vụ" />
                ) : (
                  <>Liên hệ với chúng tôi để đặt quảng cáo!</>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {data.map((row, index) => (
                  <div key={index}>
                    <CardProduct props={row} id={id} product="Dịch vụ" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="3" className="w-full space-y-2">
              <div className="grid w-full grid-cols-1">
                {dataV ? (
                  <CardProductVip props={dataV} id={id} product="Dịch vụ" />
                ) : (
                  <>Liên hệ với chúng tôi để đặt quảng cáo!</>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {data.map((row, index) => (
                  <div key={index}>
                    <CardProduct props={row} id={id} product="Dịch vụ" />
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
