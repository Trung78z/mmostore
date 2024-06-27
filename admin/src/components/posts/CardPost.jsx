"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { convertToSlug } from "@/lib/utils";
import { FaEye } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { IoIosChatbubbles } from "react-icons/io";
import Link from "next/link";
const truncateDescription = (description, maxLength) => {
  return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
};

export default function CardPost(props) {
  const { product } = props;

  const [formattedDescription, setFormattedDescription] = useState("");

  useEffect(() => {
    // Create a temporary element to parse the HTML string
    const tempElement = document.createElement("div");
    const truncatedDescription = truncateDescription(product.description, 700);
    tempElement.innerHTML = truncatedDescription;

    // Find all <a> tags and replace them with <span> tags
    const links = tempElement.getElementsByTagName("a");

    for (let i = links.length - 1; i >= 0; i--) {
      const link = links[i];
      const span = document.createElement("span");
      span.innerHTML = link.innerHTML;
      link.parentNode.replaceChild(span, link);
    }

    // Set the modified HTML as a string to state
    setFormattedDescription(tempElement.innerHTML);
  }, [product.description]);

  return (
    <>
      <div className="rounded-lg bg-white">
        <Link
          href={`/chia-se/` + convertToSlug(product.name)}
          className="group"
        >
          <div className="aspect-h-1 aspect-w-1 relative w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-5 xl:aspect-w-7">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              fill={true}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="mt-2 px-2">
            <h3 className="text-sm text-gray-700">
              <span className="text-primary hover:text-primary/80">
                {product.user} <> </>
              </span>
              - {product.dateUpdate}
            </h3>
            <h2 className="text-[16px] font-medium leading-6 text-gray-900">
              {product.name}
            </h2>
          </div>
        </Link>
        <div className="mt-2 px-2">
          {/* {formatContent(product.description, 160)} */}
          <div
            dangerouslySetInnerHTML={{
              __html: formattedDescription,
            }}
          />
          <ul className="flex list-none gap-2">
            <li className="flex cursor-pointer items-center gap-x-1 text-sm text-gray-600 hover:text-primary">
              <FaEye /> <span>{product.viewer}</span>
            </li>
            <li className="flex cursor-pointer items-center gap-x-1 text-sm text-gray-600 hover:text-primary">
              <BiSolidLike />
              {product.like}
            </li>
            <li className="flex cursor-pointer items-center gap-x-1 text-sm text-gray-600 hover:text-primary">
              <IoIosChatbubbles />
              {product.chat}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
