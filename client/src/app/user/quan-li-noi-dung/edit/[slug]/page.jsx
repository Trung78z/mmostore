"use client";

import React, { useEffect, useState } from "react";

import axios from "@/configs/api";
import { toast } from "react-toastify";
import { selectPostsByUser } from "@/lib/features/posts/postUserSlice";
import { useAppSelector } from "@/lib/reducer/hooks";
import { useParams } from "next/navigation";
import FormPostEdit from "@/components/posts/FormPostEdit";
import LoadingPage from "@/components/Loading";

export default function EditBaiViet() {
  const { slug } = useParams();
  const posts = useAppSelector(selectPostsByUser);
  // useEffect(() => {
  //   const data = posts.find((item) => item.id === parseInt(slug));

  // }, [posts, slug]);

  if (!posts.length) {
    return (
      <div>
        <LoadingPage />
      </div>
    ); // Add loading state if posts are not yet fetched
  }

  const post = posts.find((item) => item.id === parseInt(slug));
  if (!post) {
    return <div>Post not found</div>;
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("content", content);
  //  formData.append("post", image);
  //   try {
  //     const msg = await axios.put("/post"+postId, formData, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token"),
  //       },
  //     });
  //     if (msg.data.success === false) {
  //       return toast("Lỗi thông tin vui lòng thử lại!");
  //     }
  //     setImage("");
  //     setImageUrl("");
  //     setCategory(subCategory);
  //     setContent("");
  //     setTitle("");
  //     toast("Bạn đã tạo bài viết thành công!");
  //   } catch (error) {
  //     toast.error("Đã xảy ra lỗi vui lòng thử lại!");
  //   }
  // };

  return (
    <div className="card p-2 md:p-10">
      <h4>Thêm bài viết</h4>
      <FormPostEdit post={post} />
      <hr />
      <p className="text-red-500">Lưu ý khi viết bài:</p>
      <ul className="ml-2 sm:ml-10">
        <li className="text-green-500">
          <p>
            Lưu ý khi viết bài: Những nội dung được duyệt chỉ gói gọn trong các
            chia sẻ về {"nghề"} MMO, kiến thức, kinh nghiệm, trải nghiệm về mọi
            mảng trong cách kiếm tiền online! Các nội dung về chính trị, tôn
            giáo, kích động... sẽ không được duyệt! Không đăng các bài viết
            quảng cáo, tuyển ref, giới thiệu dự án, lùa gà... (không cần biết dự
            án có lừa đảo hay không) Không đăng nội dung vi phạm quyền sở hữu
            trí tuệ của người khác, bao gồm vi phạm nhãn hiệu hàng hóa và bản
            quyền. Những bài viết chất lượng sẽ được lựa chọn để làm điểm tuần
            và nhận thưởng từ sàn. Tiền donate sẽ được nhận sau 3 ngày.
          </p>
        </li>
        <li className="text-green-500">
          <p>
            Không đăng các bài viết quảng cáo, tuyển ref, giới thiệu dự án, lùa
            gà... (không cần biết dự án có lừa đảo hay không)
          </p>
        </li>
        <li className="text-green-500">
          <p>
            Không đăng nội dung vi phạm quyền sở hữu trí tuệ của người khác, bao
            gồm vi phạm nhãn hiệu hàng hóa và bản quyền.
          </p>
        </li>
        <li className="text-green-500">
          <p>
            Những bài viết chất lượng sẽ được lựa chọn để làm điểm tuần và nhận
            thưởng từ sàn.
          </p>
        </li>
        {/* <li className="text-green-500">
          <p>Tiền donate sẽ được nhận sau 3 ngày.</p>
        </li> */}
      </ul>
    </div>
  );
}
