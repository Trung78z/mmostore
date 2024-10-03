export const navigation = [
  { name: "Trang chủ", href: "/" },
  {
    name: "Sản phẩm",
    href: "/danh-muc/san-pham",
    data: [
      {
        subCategory: "Tài khoản",
        href: "/danh-muc/san-pham/tai-khoan",
      },
      {
        subCategory: "Email",
        href: "/danh-muc/san-pham/email",
      },
      {
        subCategory: "Phần mềm",
        href: "/danh-muc/san-pham/phan-mem",
      },
      {
        subCategory: "Khác",
        href: "/danh-muc/san-pham/khac",
      },
    ],
  },
  {
    name: "Dịch vụ",
    href: "/danh-muc/dich-vu",
    data: [
      {
        subCategory: "Tăng tương tác",
        href: "/danh-muc/dich-vu/tang-tuong-tac",
      },
      {
        subCategory: "Dịch vụ phần mềm",
        href: "/danh-muc/dich-vu/dich-vu-phan-mem",
      },
      {
        subCategory: "BlockChain",
        href: "/danh-muc/dich-vu/blockchain",
      },
      {
        subCategory: "Dịch vụ khác",
        href: "/danh-muc/dich-vu/dich-vu-khac",
      },
    ],
  },
  { name: "Liên hệ", href: "/lien-he" },
  { name: "Chia sẻ", href: "/chia-se" },
  { name: "FAQs", href: "/faqs" },
  { name: "Nạp tiền", href: "/nap-tien" },
];
