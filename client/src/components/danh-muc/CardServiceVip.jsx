import Image from "next/image";
import { Button } from "@headlessui/react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Link from "next/link";
import {
  convertToSlug,
  formatContent,
  formatContentVietNamese,
  renderContentWithLineBreaks,
} from "@/lib/utils";
export default function CardServiceVip({ props, id }) {
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  return (
    <>
      {!isEmpty(props) && (
        <div className="relative col-span-1 flex flex-col gap-4 rounded-md border px-6 py-1 shadow-md md:flex-row">
          <Button className="absolute left-2 top-1 z-10 max-h-fit flex-shrink-0 items-center rounded-md bg-primary px-1 text-background hover:bg-primary/80">
            Dịch vụ
          </Button>
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-40 w-40">
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
              <h6 className="w-full text-center">3.000 đ - 4.800 đ</h6>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex">
              <Link href={`/danh-muc/dich-vu/${id}/${props.slug}`}>
                <h6 className="inline-flex items-center">
                  {props.title &&
                    formatContent(formatContentVietNamese(props.title), 40)}
                </h6>
              </Link>
            </div>
            <div className="inline-flex items-center">
              <FaStar className="h-4 w-4 text-yellow-500" />
              <FaStar className="h-4 w-4 text-yellow-500" />
              <FaStar className="h-4 w-4 text-yellow-500" />
              <FaStar className="h-4 w-4 text-yellow-500" />
              <FaRegStarHalfStroke className="h-4 w-4 text-yellow-500" />
              <p className="inline-block text-[14px]">
                {props.serviceReviews.length} Reviews | Đã bán:{" "}
                {props._count?.orders} | Khiếu nại: 0.0%
              </p>
            </div>
            <div>
              <p>
                Người bán:
                <Link href={`/trang-ca-nhan/${props.userId}`}>
                  <span className="text-primary"> {props.user?.username}</span>
                </Link>
              </p>
            </div>
            <div>
              Sản phẩm: <span className="text-primary">Gmail</span>
            </div>
            {renderContentWithLineBreaks(props.content)}
          </div>
        </div>
      )}
    </>
  );
}
