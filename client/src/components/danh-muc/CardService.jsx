import {
  convertToSlug,
  renderContentWithLineBreaks,
  formatContent,
  formatContentVietNamese,
  getMinMaxPrice,
} from "@/lib/utils";
import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

export default function CardService({ props, id }) {
  return (
    <>
      <div
        className="relative col-span-1 flex min-h-[250px] flex-col gap-4 rounded-md border px-6 py-4 shadow-md md:flex-row"
        id="sss"
      >
        <Button className="absolute left-2 top-1 z-10 flex-shrink-0 items-center rounded-md bg-primary px-1 text-background hover:bg-primary/80">
          Dịch vụ
        </Button>
        <div className="flex flex-col items-center justify-center">
          <div className="4 relative h-48 w-44">
            {props.image && (
              <Image
                src={props.image}
                alt=""
                fill="true"
                className="h-full w-full rounded-md object-cover"
              />
            )}
          </div>
          <div>
            {props.serviceSales.length > 0 && (
              <h6 className="w-full text-center">
                {props.serviceSales.length > 1
                  ? getMinMaxPrice(props.serviceSales)
                  : props.serviceSales[0].price}
                đ
              </h6>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="">
            <Link href={`/danh-muc/dich-vu/${id}/${props.slug}`}>
              <h6 className="inline-flex items-center">
                {formatContent(formatContentVietNamese(props.title), 40)}
              </h6>
            </Link>
          </div>
          <div className="flex items-center gap-x-1">
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaRegStarHalfStroke className="h-4 w-4 text-yellow-500" />
            <p className="inline-block text-[14px]">
              {props.serviceReviews.length} Reviews | Đã bán:{" "}
              {props._count.orders} | Khiếu nại: 0.0%
            </p>
          </div>
          <div>
            <p>
              Người bán:
              <Link href={`/trang-ca-nhan/${props.userId}`}>
                <span className="text-primary"> {props.user.username}</span>
              </Link>
            </p>
          </div>
          <div>
            Sản phẩm: <span className="text-primary">Gmail</span>
          </div>
          {renderContentWithLineBreaks(props.content)}
        </div>
      </div>
    </>
  );
}