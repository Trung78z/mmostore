import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="min-h-full min-w-full">
      <Image
        src="/icons/zaloapp.svg"
        className="rounded-full"
        alt=""
        fill={true}
      />
    </div>
  );
}
