import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
import { Fragment } from "react";
import { differenceInMinutes } from "date-fns";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatTimeChat(offlineTime) {
  const now = new Date();

  // Tính số phút đã offline
  const minutesOffline = differenceInMinutes(now, offlineTime);

  // Định dạng kết quả
  let formattedOffline;
  if (minutesOffline >= 24 * 60) {
    const days = Math.floor(minutesOffline / (24 * 60));
    const hours = Math.floor((minutesOffline % (24 * 60)) / 60);
    const minutes = minutesOffline % 60;
    formattedOffline = `${days}d${hours > 0 ? ` ${hours}h` : ""}${minutes > 0 ? ` ${minutes} phút${minutes > 1 ? "s" : ""}` : ""}`;
  } else if (minutesOffline >= 60) {
    // Nếu offline nhiều hơn 1 giờ nhưng ít hơn 24 giờ
    const hours = Math.floor(minutesOffline / 60);
    const minutes = minutesOffline % 60;
    formattedOffline = `${hours}h${hours > 1 ? "" : ""}${minutes > 0 ? ` ${minutes} phút${minutes > 1 ? "" : ""}` : ""}`;
  } else {
    // Nếu offline ít hơn 1 giờ
    formattedOffline = `${minutesOffline} phút`;
  }
  return formattedOffline;
}

export function getMinMaxPrice(row) {
  let min = Infinity;
  let max = -Infinity;

  row.forEach((rows) => {
    if (rows.price < min) {
      min = rows.price;
    }
    if (rows.price > max) {
      max = rows.price;
    }
  });
  return `${min} - ${max}`;
}

export function convertToSlug(title) {
  const a =
    "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
  const b =
    "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");
  return _.deburr(title) // Loại bỏ các dấu
    .toLowerCase()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
    .replace(/đ/gi, "d")
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
export const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  return str;
};

export function formatContent(data, length) {
  if (data.length > length) {
    return data.substring(0, length) + "...";
  }
  return data;
}

export function formatContentVietNamese(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function formatDate(date) {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
}
export function formatTime(date) {
  const dateObj = new Date(date);
  const hour = dateObj.getHours().toString().padStart(2, "0"); // Get hours and pad with leading zero if necessary
  const minutes = dateObj.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if necessary

  return `${minutes}-${hour}`;
}
export function formatDatePost(date) {
  return (
    <>
      {new Date(date).toLocaleDateString("vi-VN")} -<> </>
      {new Date(date).toLocaleTimeString("vi-VN")}
    </>
  );
}

export const renderContentWithLineBreaks = (contents, length = 70) => {
  return (
    <ul className="mb-0">
      {contents &&
        contents.split("\n").map((line, index) => {
          return (
            <Fragment key={index}>
              <li className="ml-2 list-disc"> {formatContent(line, length)}</li>
            </Fragment>
          );
        })}
    </ul>
  );
};
