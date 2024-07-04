import React from "react";

import Link from "next/link";
export default function DonHangSanPham() {
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">Gian hàng top 1</h1>
        </div>
      </div>
      <div className="card space-y-6">
        <p className="text-lg font-medium text-red-500">Xin lưu ý:</p>
        <ul className="px-4">
          <li className="text-sm font-normal text-red-500">
            Nếu bạn chiến thắng trong cuộc đấu giá gian hàng xếp đầu danh mục,
            bạn có thể lựa chọn gian hàng đứng đầu
          </li>
          <li className="text-sm font-normal text-green-500">
            Buổi đấu giá sẽ diễn ra 20h Chủ Nhật hàng tuần
            <Link
              href="/dau-gia"
              className="text-blue-500 hover:text-blue-500/90"
            >
              tại đây
            </Link>
            .
          </li>
          <li className="text-sm font-normal text-green-500">
            Gian hàng của bạn sẽ luôn đứng vị trí đầu tiên dù còn hàng hay không
          </li>
        </ul>
        <hr />
        <h4> Bạn không chiến thắng trong cuộc đấu giá nào!</h4>
      </div>
    </div>
  );
}
