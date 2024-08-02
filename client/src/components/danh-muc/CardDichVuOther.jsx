import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "@/configs/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { convertToSlug, getMinMaxPrice } from "@/lib/utils";
import Link from "next/link";

export default function CardDichVuOther() {
  const [row, setRow] = useState([]);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const response = await axios.get("/services/fetch/service");

      setRow(response.data.msg);
    } catch (error) {}
  };
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          480: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          976: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1080: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {row.slice(0, 8).map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Card data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

function Card({ data, service = "Dịch vụ" }) {
  return (
    <div className="min-h-80 space-y-2 rounded-md bg-background p-0 hover:shadow-xl">
      <Link
        href={
          service === "Sản phẩm"
            ? `/danh-muc/san-pham/${data.category.categoryCover}/${data.slug}`
            : `/danh-muc/dich-vu/${data.category.categoryCover}/${data.slug}`
        }
      >
        <div className="relative h-40 w-full">
          <Image src={data.image} alt="" fill="true" className="rounded-md" />
        </div>
      </Link>
      <div className="px-2">
        {" "}
        <Link
          href={
            service === "Sản phẩm"
              ? `/danh-muc/san-pham/${data.category.categoryCover}/${data.slug}`
              : `/danh-muc/dich-vu/${data.category.categoryCover}/${data.slug}`
          }
        >
          <h5 className="text-sm">{data.title}</h5>
        </Link>
        <div className="inline-flex items-center">
          <FaStar className="h-4 w-4 text-yellow-500" />
          <FaStar className="h-4 w-4 text-yellow-500" />
          <FaStar className="h-4 w-4 text-yellow-500" />
          <FaStar className="h-4 w-4 text-yellow-500" />

          <FaRegStarHalfStroke className="h-4 w-4 text-yellow-500" />
          <p className="flex text-[14px]">
            {data.serviceReviews.length} Reviews
          </p>
        </div>
        <h6 className="space-x-2">
          <span>{service === "Sản phẩm" ? "Sản phẩm" : "Dịch vụ"}</span>

          <span className="text-blue-500">{data.subCategory.subCategory}</span>
        </h6>
        <h5 className="pt-2 text-center">
          {getMinMaxPrice(data.serviceSales)}
        </h5>
      </div>
    </div>
  );
}
