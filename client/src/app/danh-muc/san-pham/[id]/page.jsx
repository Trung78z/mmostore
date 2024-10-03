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
import { slugProduct } from "@/lib/data/slug";

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
  const handleChangeService = (e) => {
    const getHighestPrice = (product) => {
      if (product.productSales.length === 0) return 0;
      return Math.max(...product.productSales.map((sale) => sale.price));
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
          services="products"
        />
      </div>
      <div className="mr-0 flex-1 xl:mr-5 2xl:mr-10">
        <div className="space-y-6 px-2 md:px-4 lg:pr-10">
          <div className="flex items-center gap-x-4">
            <h3>
              Gian hàng{" "}
              {id === "tai-khoan"
                ? "Tài khoản"
                : id === "email"
                  ? "Gmail"
                  : id === "phan-mem"
                    ? "Phần mềm"
                    : "Khác"}
            </h3>
            <p>Tổng {products.length} gian hàng</p>
          </div>
          <div className="flex w-full flex-wrap rounded-md border border-primary p-2">
            <h5 className="text-sm text-green-500">
              Đối với gian hàng không trùng, chúng tôi cam kết sản phẩm được bán
              ra 1 lần duy nhất trên hệ thống, tránh trường hợp sản phẩm đó được
              bán nhiều lần.
            </h5>
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
            <TabsContent value="increase" className="w-full space-y-2">
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
            <TabsContent value="decrease" className="w-full space-y-2">
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
