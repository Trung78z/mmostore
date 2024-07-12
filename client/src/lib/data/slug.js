import { convertToSlug } from "../utils";

export const slugService = [
  {
    sub: convertToSlug("Tăng tương tác"),
    child: [
      { id: "Dịch vụ Facebook", label: "Dịch vụ Facebook" },
      { id: "Dịch vụ Tiktok", label: "Dịch vụ Tiktok" },
      { id: "Dịch vụ Google", label: "Dịch vụ Google" },
      { id: "Dịch vụ Telegram", label: "Dịch vụ Telegram" },
      { id: "Dịch vụ Shopee", label: "Dịch vụ Shopee" },
      { id: "Dịch vụ Discord", label: "Dịch vụ Discord" },
      { id: "Dịch vụ Twitter", label: "Dịch vụ Twitter" },
      { id: "Dịch vụ Youtube", label: "Dịch vụ Youtube" },
      { id: "Dịch vụ Zalo", label: "Dịch vụ Zalo" },
      { id: "Dịch vụ Instagram", label: "Dịch vụ Instagram" },
      { id: "Tương tác khác", label: "Tương tác khác" },
    ],
  },
  {
    sub: convertToSlug("Dịch vụ phần mềm"),
    child: [
      { id: "Dịch vụ code tool", label: "Dịch vụ code tool" },
      { id: "Dịch vụ đồ họa", label: "Dịch vụ đồ họa" },
      { id: "Dịch vụ video", label: "Dịch vụ video" },
      { id: "Dịch vụ tool khác", label: "Dịch vụ tool khác" },
    ],
  },
  {
    sub: convertToSlug("BlockChain"),
    child: [
      { id: "Dịch vụ tiền ảo", label: "Dịch vụ tiền ảo" },
      { id: "Dịch vụ NFT", label: "Dịch vụ NFT" },
      { id: "Dịch vụ Coinlist", label: "Dịch vụ Coinlist" },
      { id: "Blockchain khác", label: "Blockchain khác" },
    ],
  },
  {
    sub: convertToSlug("Dịch vụ khác"),
    child: [{ id: "Dịch vụ khác", label: "Dịch vụ khác" }],
  },
];
export const slugProduct = [
  {
    sub: convertToSlug("Tài khoản"),
    child: [
      { id: "Tài khoản FB", label: "Tài khoản FB" },
      { id: "Tài Khoản BM", label: "Tài Khoản BM" },
      { id: "Tài Khoản Zalo", label: "Tài Khoản Zalo" },
      { id: "Tài Khoản Twitter", label: "Tài Khoản Twitter" },
      { id: "Tài Khoản Telegram", label: "Tài Khoản Telegram" },
      { id: "Tài Khoản Instagram", label: "Tài Khoản Instagram" },
      { id: "Tài Khoản Shopee", label: "Tài Khoản Shopee" },
      { id: "Tài Khoản Discord", label: "Tài Khoản Discord" },
      { id: "Tài khoản TikTok", label: "Tài khoản TikTok" },
      { id: "Key Diệt Virus", label: "Key Diệt Virus" },
      { id: "Key Window", label: "Key Window" },
      { id: "Tài Khoản Khác", label: "Tài Khoản Khác" },
    ],
  },
  {
    sub: convertToSlug("Email"),
    child: [
      { id: "Gmail", label: "Gmail" },
      { id: "HotMail", label: "HotMail" },
      { id: "OutlookMail", label: "OutlookMail" },
      { id: "RuMail", label: "RuMail" },
      { id: "DomainMail", label: "DomainMail" },
      { id: "YahooMail", label: "YahooMail" },
      { id: "ProtonMail", label: "ProtonMail" },
      { id: "Loại Mail Khác", label: "Loại Mail Khác" },
    ],
  },
  {
    sub: convertToSlug("Phần mềm"),
    child: [
      { id: "Phần Mềm FB", label: "Phần Mềm FB" },
      { id: "Phần Mềm Google", label: "Phần Mềm Google" },
      { id: "Phần Mềm Youtube", label: "Phần Mềm Youtube" },
      { id: "Phần Mềm Tiền Ảo", label: "Phần Mềm Tiền Ảo" },
      { id: "Phần Mềm PTC", label: "Phần Mềm PTC" },
      { id: "Phần Mềm Capcha", label: "Phần Mềm Capcha" },
      { id: "Phần Mềm Offer", label: "Phần Mềm Offer" },
      { id: "Phần Mềm PTU", label: "Phần Mềm PTU" },
      { id: "Phần Mềm Khác", label: "Phần Mềm Khác" },
    ],
  },
  {
    sub: convertToSlug("Khác"),
    child: [{ id: "Thẻ nạp" }, { id: "VPS" }, { id: "Khác", label: "Khác" }],
  },
];
