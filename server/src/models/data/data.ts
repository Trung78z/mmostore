import { createSlug } from "../../utils/loashCover";

enum RolePost {
  cancel = "cancel",
  success = "success",
  ide = "ide",
  error = "error",
}

export function postCategory() {
  return [
    { category: "Facebook", slug: createSlug("Facebook") },
    { category: "Nội dung khác", slug: createSlug("Nội dung khác") },
    { category: "Tik tok", slug: createSlug("Tik tok") },
    { category: "Marketing", slug: createSlug("Marketing") },
    { category: "Telegram", slug: createSlug("Telegram") },
    { category: "TapHoaMMO", slug: createSlug("TapHoaMMO") },
    { category: "Youtube", slug: createSlug("Youtube") },
    { category: "Airdrop", slug: createSlug("Airdrop") },
    { category: "Zalo", slug: createSlug("Zalo") },
  ];
}

export const serviceSales = [
  {
    id: 1,
    title: "Gói 200 acc 5M Impression | 40k một acc",
    price: 40000,
    serviceId: 1,
  },
  {
    id: 2,
    title: "10 Twitter Impression ( Min 500 )",
    price: 10,
    serviceId: 1,
  },
  {
    id: 3,
    title: "Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày",
    price: 150000,
    serviceId: 1,
  },
  {
    id: 4,
    title: "Gói 5 triệu view bkt",
    price: 40000,
    serviceId: 1,
  },
  {
    id: 5,
    title: "Gói 1 triệu view tính analytics",
    price: 19000,
    serviceId: 1,
  },
];

export function serviceCategories() {
  return [
    {
      Category: "Tăng tương tác",
      CategoryCover: createSlug("Tăng tương tác"),
      subCategories: [
        { subCategory: "Dịch vụ Facebook" },
        { subCategory: "Dịch vụ Tiktok" },
        { subCategory: "Dịch vụ Google" },
        { subCategory: "Dịch vụ Telegram" },
        { subCategory: "Dịch vụ Shopee" },
        { subCategory: "Dịch vụ Discord" },
        { subCategory: "Dịch vụ Twitter" },
        { subCategory: "Dịch vụ Youtube" },
        { subCategory: "Dịch vụ Zalo" },
        { subCategory: "Dịch vụ Instagram" },
        { subCategory: "Tương tác khác" },
      ],
    },
    {
      Category: "Dịch vụ phần mềm",
      CategoryCover: createSlug("Dịch vụ phần mềm"),
      subCategories: [
        { subCategory: "Dịch vụ code tool" },
        { subCategory: "Dịch vụ đồ họa" },
        { subCategory: "Dịch vụ video" },
        { subCategory: "Dịch vụ tool khác" },
      ],
    },
    {
      Category: "BlockChain",
      CategoryCover: createSlug("BlockChain"),
      subCategories: [
        { subCategory: "Dịch vụ tiền ảo" },
        { subCategory: "Dịch vụ NFT" },
        { subCategory: "Dịch vụ Coinlist" },
        { subCategory: "Blockchain khác" },
      ],
    },
    {
      Category: "Dịch vụ khác",
      CategoryCover: createSlug("Dịch vụ khác"),
      subCategories: [{ subCategory: "Dịch vụ khác" }],
    },
  ];
}
export function productCategories() {
  return [
    {
      Category: "Tài khoản",
      CategoryCover: createSlug("Tài khoản"),
      subCategories: [
        { subCategory: "Tài khoản FB" },
        { subCategory: "Tài Khoản BM" },
        { subCategory: "Tài Khoản Zalo" },
        { subCategory: "Tài Khoản Twitter" },
        { subCategory: "Tài Khoản Telegram" },
        { subCategory: "Tài Khoản Instagram" },
        { subCategory: "Tài Khoản Shopee" },
        { subCategory: "Tài Khoản Discord" },
        { subCategory: "Tài khoản TikTok" },
        { subCategory: "Key Diệt Virus" },
        { subCategory: "Key Window" },
        { subCategory: "Tài Khoản Khác" },
      ],
    },
    {
      Category: "Email",
      CategoryCover: createSlug("Email"),
      subCategories: [
        { subCategory: "Gmail" },
        { subCategory: "HotMail" },
        { subCategory: "OutlookMail" },
        { subCategory: "RuMail" },
        { subCategory: "DomainMail" },
        { subCategory: "YahooMail" },
        { subCategory: "ProtonMail" },
        { subCategory: "Loại Mail Khác" },
      ],
    },
    {
      Category: "Phần mềm",
      CategoryCover: createSlug("Phần mềm"),
      subCategories: [
        { subCategory: "Phần Mềm FB" },
        { subCategory: "Phần Mềm Google" },
        { subCategory: "Phần Mềm Youtube" },
        { subCategory: "Phần Mềm Tiền Ảo" },
        { subCategory: "Phần Mềm PTC" },
        { subCategory: "Phần Mềm Capcha" },
        { subCategory: "Phần Mềm Offer" },
        { subCategory: "Phần Mềm PTU" },
        { subCategory: "Phần Mềm Khác" },
      ],
    },
    {
      Category: "Khác",
      CategoryCover: createSlug("Khác"),
      subCategories: [
        { subCategory: "Thẻ nạp" },
        { subCategory: "VPS" },
        { subCategory: "Khác" },
      ],
    },
  ];
}
export function service(userId: string) {
  return [
    {
      title: "Dịch Vụ Twttier X Buff Follow SIÊU RẺ",
      content:
        "Gmail ngoại iOS, random IP, đã ngâm đủ 14 ngày Kinh doanh: Gmail random IP >7 ngày ( Đọc mô tả trước khi sử dụng) | Gmail random IP >8 tháng | Gmail random IP >6 tháng | Gmail API random > 7 ngày ( ĐỌC MAIL KHÔNG CẦN LOGIN) | Gmail random IP >3 tháng",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Dịch Vụ Twttier X Buff Follow SIÊU RẺ"),
      description: descriptions,
      userId: userId,
      categoryId: 1,
      subCategoryId: 7,
    },
    {
      title: "Gmail new đã ngâm từ 7 ngày đến 2 tháng siêu rẻ",
      content:
        "Gmail đã ngâm trên 10 ngày - 2 tháng bao trâu\nKinh doanh: Gmail new mix ip đã ngâm trên 1 tháng | Gmail new mix ip đã ngâm trên 7 ngày bao trâu",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Gmail new đã ngâm từ 7 ngày đến 2 tháng siêu rẻ"),
      description: descriptions2,
      userId: userId,
      categoryId: 1,
      subCategoryId: 5,
    },
    {
      title: "Gmail ( cho thuê ) - Giá rẻ",
      content:
        "Gmail cho thuê để getcode, nhận thư, giá rẻ. Đuôi @gmail.com\nKinh doanh: Gmail cho thuê giá rẻ",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Gmail ( cho thuê ) - Giá rẻ"),
      description: descriptions2,
      userId: userId,
      categoryId: 1,
      subCategoryId: 7,
    },
    {
      title: "MAIL VIỆT TRÊN 1 NĂM CHƯA QUA DỊCH VỤ SIÊU KHỎE",
      content:
        "Mail Việt Ip Việt Đã Live Trên 1 Năm Chưa Qua Dịch Vụ Bao Khỏe Cho Các Bác\nKinh doanh: Gmail Việt Chưa Qua Dịch Vụ Trên 1 Năm",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("MAIL VIỆT TRÊN 1 NĂM CHƯA QUA DỊCH VỤ SIÊU KHỎE"),
      description: descriptions2,
      userId: userId,
      categoryId: 1,
      subCategoryId: 7,
    },
    {
      title: "Gmail kèm kênh youtube giá rẻ",
      content:
        "Gmail kèm kênh youtube giá rẻ, và nhiều hơn nữa... mình có bán kênh 1000sub mn qua gian hàng tham khảo nhé\nKinh doanh: Kênh youtube >1100 subcribers | Kênh youtube > 1100 subcriber | Kênh youtube 940 ~ 1020 subcribers >3100h xem | Kênh youtube 920 ~ 1180 subcribers 2600~2700h xem",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Gmail kèm kênh youtube giá rẻ"),
      description: descriptions,
      userId: userId,
      categoryId: 1,
      subCategoryId: 7,
    },

    {
      title: "Twttier X Buff Follow SIÊU RẺ 1",
      content:
        "Gmail ngoại iOS, random IP, đã ngâm đủ 14 ngày Kinh doanh: Gmail random IP >7 ngày ( Đọc mô tả trước khi sử dụng) | Gmail random IP >8 tháng | Gmail random IP >6 tháng | Gmail API random > 7 ngày ( ĐỌC MAIL KHÔNG CẦN LOGIN) | Gmail random IP >3 tháng",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Twttier X Buff Follow SIÊU RẺ 1"),
      description: descriptions,
      userId: userId,
      categoryId: 1,
      subCategoryId: 7,
    },
    {
      title: "Gmail đã ngâm từ 7 ngày đến 2 tháng siêu rẻ 2",
      content:
        "Gmail đã ngâm trên 10 ngày - 2 tháng bao trâu\nKinh doanh: Gmail new mix ip đã ngâm trên 1 tháng | Gmail new mix ip đã ngâm trên 7 ngày bao trâu",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Gmail đã ngâm từ 7 ngày đến 2 tháng siêu rẻ 2"),
      description: descriptions2,
      userId: userId,
      categoryId: 1,
      subCategoryId: 7,
    },
    {
      title: "Gmail ( cho thuê ) - Giá rẻ 1",
      content:
        "Gmail cho thuê để getcode, nhận thư, giá rẻ. Đuôi @gmail.com\nKinh doanh: Gmail cho thuê giá rẻ",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Gmail ( cho thuê ) - Giá rẻ 1"),
      description: descriptions2,
      userId: userId,
      categoryId: 1,
      subCategoryId: 7,
    },
    {
      title: "MAIL VIỆT TRÊN 1 NĂM CHƯA QUA DỊCH VỤ SIÊU KHỎE1",
      content:
        "Mail Việt Ip Việt Đã Live Trên 1 Năm Chưa Qua Dịch Vụ Bao Khỏe Cho Các Bác\nKinh doanh: Gmail Việt Chưa Qua Dịch Vụ Trên 1 Năm",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("MAIL VIỆT TRÊN 1 NĂM CHƯA QUA DỊCH VỤ SIÊU KHỎE1"),
      description: descriptions2,
      userId: userId,
      categoryId: 1,
      subCategoryId: 7,
    },
    {
      title: "Gmail kèm kênh youtube giá rẻ2",
      content:
        "Gmail kèm kênh youtube giá rẻ, và nhiều hơn nữa... mình có bán kênh 1000sub mn qua gian hàng tham khảo nhé\nKinh doanh: Kênh youtube >1100 subcribers | Kênh youtube > 1100 subcriber | Kênh youtube 940 ~ 1020 subcribers >3100h xem | Kênh youtube 920 ~ 1180 subcribers 2600~2700h xem",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Gmail kèm kênh youtube giá rẻ2"),
      description: descriptions,
      userId: userId,
      categoryId: 1,
      subCategoryId: 7,
    },
  ];
}
export function product(userId: string) {
  return [
    {
      title: "Dịch Vụ Twttier X Buff Follow SIÊU RẺ",
      content:
        "Gmail ngoại iOS, random IP, đã ngâm đủ 14 ngày Kinh doanh: Gmail random IP >7 ngày ( Đọc mô tả trước khi sử dụng) | Gmail random IP >8 tháng | Gmail random IP >6 tháng | Gmail API random > 7 ngày ( ĐỌC MAIL KHÔNG CẦN LOGIN) | Gmail random IP >3 tháng",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Dịch Vụ Twttier X Buff Follow SIÊU RẺ"),
      description: descriptions,
      userId: userId,
      duplicate: true,
      categoryId: 1,
      subCategoryId: 1,
    },
    {
      title: "Gmail new đã ngâm từ 7 ngày đến 2 tháng siêu rẻ",
      content:
        "Gmail đã ngâm trên 10 ngày - 2 tháng bao trâu\nKinh doanh: Gmail new mix ip đã ngâm trên 1 tháng | Gmail new mix ip đã ngâm trên 7 ngày bao trâu",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Gmail new đã ngâm từ 7 ngày đến 2 tháng siêu rẻ"),
      description: descriptions2,
      userId: userId,
      duplicate: true,
      categoryId: 1,
      subCategoryId: 1,
    },
    {
      title: "Gmail ( cho thuê ) - Giá rẻ",
      content:
        "Gmail cho thuê để getcode, nhận thư, giá rẻ. Đuôi @gmail.com\nKinh doanh: Gmail cho thuê giá rẻ",
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: createSlug("Gmail ( cho thuê ) - Giá rẻ"),
      description: descriptions2,
      userId: userId,
      duplicate: true,
      categoryId: 1,
      subCategoryId: 1,
    },
  ];
}
export const serviceSell = [
  {
    title: "Combo 500 Follow (BH 30 ngày)",
    price: 29999,
    serviceId: 1,
  },
  {
    title: "Combo 500 Follow (BH 15 ngày)",
    price: 19999,
    serviceId: 1,
  },
  {
    title: "1 Follow (Min 500 foll chia nhiều tài khoản) (BH 30 ngày)",
    price: 60,
    serviceId: 2,
  },
  {
    title: "1 Follow (Min 500 foll chia nhiều tài khoản) (BH 15 ngày)",
    price: 40,
    serviceId: 2,
  },
  {
    title: "Combo 500 Follow (BH 30 ngày)",
    price: 29999,
    serviceId: 3,
  },
  {
    title: "Combo 500 Follow (BH 15 ngày)",
    price: 19999,
    serviceId: 3,
  },
  {
    title: "1 Follow (Min 500 foll chia nhiều tài khoản) (BH 30 ngày)",
    price: 60,
    serviceId: 4,
  },
  {
    title: "1 Follow (Min 500 foll chia nhiều tài khoản) (BH 15 ngày)",
    price: 40,
    serviceId: 4,
  },
  {
    title: "Combo 500 Follow (BH 30 ngày)",
    price: 29999,
    serviceId: 5,
  },
  {
    title: "Combo 500 Follow (BH 15 ngày)",
    price: 19999,
    serviceId: 6,
  },
  {
    title: "1 Follow (Min 500 foll chia nhiều tài khoản) (BH 30 ngày)",
    price: 60,
    serviceId: 7,
  },
  {
    title: "1 Follow (Min 500 foll chia nhiều tài khoản) (BH 15 ngày)",
    price: 40,
    serviceId: 6,
  },
  {
    title: "Combo 500 Follow (BH 30 ngày)",
    price: 29999,
    serviceId: 4,
  },
  {
    title: "Combo 500 Follow (BH 15 ngày)",
    price: 19999,
    serviceId: 7,
  },
  {
    title: "1 Follow (Min 500 foll chia nhiều tài khoản) (BH 30 ngày)",
    price: 60,
    serviceId: 8,
  },
  {
    title: "1 Follow (Min 500 foll chia nhiều tài khoản) (BH 15 ngày)",
    price: 40,
    serviceId: 9,
  },
];

export function post(userId: string) {
  return [
    {
      title: "Tại sao nên bán hàng trên Instagram?",
      content:
        "<h2>7 kinh nghiệm bán hàng trên Instagram</h2><p>Để bán hàng trên Instagram có hiệu quả, bạn cần lưu ý một số điều sau:</p><p><br></p><h3><strong>1. Lựa chọn kinh doanh sản phẩm phù hợ</strong></h3><p>Như đã nói, đối tượng sử dụng Instagram chủ yếu là giới trẻ nên khi lựa chọn bán hàng trên nền tảng này, bạn cần lựa chọn các sản phẩm, các mặt hàng phù hợp với thị hiếu người dùng này.</p><p>Có thể lựa chọn các sản phẩm ngách để dễ dàng tiếp cận khách hàng thay vì ôm đồm một lĩnh vực lớn. Ví dụ như với mặt hàng thời trang nữ, nên đánh vào một nhánh cụ thể như thời trang công sở, thời trang vintage,…</p><p><br></p><h3><strong>2. Tối ưu thông tin phần mô tả đầu trang</strong></h3><p>Để giúp khách hàng có thể ghi nhớ và nhớ lâu, bạn nên đặt tên shop thật ngắn gọn và ấn tượng, đồng bộ với tên trên các nền tảng bán hàng khác.</p><p>Bên cạnh đó, ở phần mô tả đầu trang, bạn cũng nên cập nhật đủ thông tin liên hệ, địa chỉ, sản phẩm kinh doanh và link website,… giúp khách hàng có thể nắm rõ ngay khi truy cập trang của bạn.</p><p><br></p><p>Bạn nên tối ưu thông tin phần mô tả đầu trang để tạo ấn tượng với khách hàng</p><p><br></p><h3><strong>3. Sử dụng hashtag</strong></h3><p>Hashtag là công cụ cực kỳ hữu ích bạn không nên bỏ qua khi bán hàng trên Instagram. Bởi:</p><ul><li>Hashtag được xem là từ khóa chính thường được khách hàng sử dụng mỗi khi có nhu cầu tìm kiếm thông tin, sản phẩm.</li><li>Hashtag hỗ trợ phân loại sản phẩm giúp khách hàng dễ dàng tìm kiếm.</li><li>Giúp bạn có thể nắm bắt được nhu cầu và xu hướng quan tâm mới của khách hàng.</li></ul><p>Vì vậy, khi bán hàng, bạn nên sử dụng hashtag xuyên suốt các bài đăng của mình. Điều này không chỉ giúp tạo dựng kho thông tin mà còn giúp cho bài viết của bạn dễ dàng lên top đầu kết quả tìm kiếm cũng như dễ dàng tiếp cận khách hàng một cách tự nhiên.</p><p><br></p><p>Nên sử dụng hashtag để tăng khả năng tiếp cận khách hàng</p><p><br></p><h3><strong>4. Đầu tư vào hình ảnh</strong></h3><p>Khi bán hàng trên Instagram, không phải nội dung bài viết mà hình ảnh mới chính là yếu tố quan trọng gây ấn tượng với khách hàng. Vì vậy, bạn nên chú trọng đầu tư vào yếu tố này.</p><p>Bạn có thể không nhất thiết phải sử dụng máy ảnh chuyên nghiệp. Thay vào đó, bạn có thể tận dụng ngay chiếc Smartphone của mình để chụp ảnh.</p><p>Ngoài ra, để có một bức ảnh thu hút, hãy tập trung vào các chi tiết, các khoảnh khắc, hãy thêm các hiệu ứng để bức ảnh của bạn trông lung linh và thu hút hơn.</p><p><br></p><h3><strong>5. Kết hợp với các Influencer</strong></h3><p>Một cách bán hàng trên Instagram cực hiệu quả mà bạn có thể thử áp dụng, đó là kết hợp với các Influencer – những người có sức ảnh hưởng vô cùng lớn trên mạng xã hội để quảng bá sản phẩm của mình.</p><p>Các Influencer là những người có tiếng nói, có lượng fan khá đông đảo nên bạn có thể tận dụng những điều này để thúc đẩy giới thiệu sản phẩm của mình đến với nhiều người dùng hơn nữa.</p><p><br></p><h3><strong>6. Sử dụng tính năng story để bán hàng trên Instagram</strong></h3><p>Bên cạnh việc đăng bài lên NewFeed, bạn có thể đăng tải các story trên Instagram. Mặc dù các story này thường sẽ biến mất sau 24h nhưng bạn vẫn có thể lưu lại chúng thành từng mục trên trang cá nhân để phục vụ nhu cầu tìm kiếm của khách hàng cũng như thu hút người dùng mới.</p><p><br></p><h3><strong>7. Chia sẻ các phản hồi của khách hàng</strong></h3><p>Phản hồi của khách hàng là một trong những yếu tố đánh giá chân thực nhất về chất lượng sản phẩm của bạnkhi bán hàng trên Instagram.</p><p>Do vậy, với những khách hàng đã mua và sử dụng, bạn có thể tiến hành chăm sóc, xin ý kiến đánh giá, phản hồi để có thể chia sẻ lên trang bán hàng hoặc để rút kinh nghiệm trong trường hợp mang đến những trải nghiệm chưa tốt.</p><p>Trên đây là những chia sẻ về cách bán hàng trên Instagram. Hy vọng với những chia sẻ này, việc bán hàng của bạn sẽ trở nên suôn sẻ và hiệu quả hơn.!</p>",
      status: "success" as RolePost,
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: "tai-sao-nen-ban-hang-tren-instagram",
      postCategoryId: 1,
      userId: userId,
    },
    {
      title: "Hướng dẫn sử dụng API token Medium.com hiệ",
      content:
        "<p>Một trong những plugin share , chăm&nbsp;sóc social tốt nhất .&nbsp;</p><p>Giá hiện tại khá cao mỗi key chỉ dùng được một website.</p><p>Nay mình share bản crack free cho ae , tuy không đầy đủ như bản chính thức nhưng cũng đủ mang lại hiệu quả cho website và ae làm auto.&nbsp;</p><p>Plugin auto-poster / reposter của WordPress hỗ trợ Facebook, Instagram, Twitter, Pinterest, Linkedin, Google my Business, Telegram, Medium, Reddit, Tumblr, VK, OK ru, Plurk, các blog dựa trên WordPress.</p><p>FS Poster&nbsp;mang đến cho bạn cơ hội tuyệt vời để tự động xuất bản các bài đăng WordPress trên các mạng xã hội phổ biến nhất một cách tự động.&nbsp;Bằng cách sử dụng FS Poster, bạn cũng sẽ có thể lên lịch cho các bài đăng, xuất bản lại các bài đăng đã tạo trước đó, v.v.</p><h3><strong>Lợi ích của việc mua plugin FS Poster là gì?</strong></h3><p><br></p><p>1 Tiết kiệm thời gian của bạn&nbsp;Bạn sẽ có thể tiết kiệm thời gian của mình bằng cách chia sẻ các bài đăng WordPress của bạn một cách tự động</p><p>2 Cải thiện SEO trang web&nbsp;Bạn sẽ có thể tăng liên kết đến trang web của mình từ các mạng xã hội.</p><p>3 Giữ cho phương tiện truyền thông xã hội của bạn luôn mới&nbsp;Bạn sẽ có thể giữ cho hồ sơ xã hội của mình luôn mới mẻ bằng cách đăng thường xuyên bằng cách sử dụng mô-đun Lịch biểu.</p><p>4 Tăng khách truy cập trang web&nbsp;Nhiều lượt chia sẻ hơn sẽ mang lại nhiều khách truy cập vào trang web của bạn.</p><h3><strong>Các mạng xã hội được hỗ trợ</strong></h3><p><br></p><p>Bạn sẽ có thể xuất bản các bài đăng / trang / sản phẩm của mình lên 14 mạng xã hội cùng một lúc:</p><p>1 Facebook (tài khoản, trang, nhóm)</p><p>2 Twitter (tài khoản)</p><p>3 Instagram (tài khoản, câu chuyện)</p><p>4 Linkedin (tài khoản, công ty)</p><p>5 Pinterest (bảng tài khoản)</p><p>6 Reddit (tài khoản, tín dụng phụ)</p><p>7 Tumblr (tài khoản)</p><p>8 VK com (tài khoản, trang, nhóm, sự kiện)</p><p>9 OK ru (tài khoản, nhóm)</p><p>10 Telegram (trò chuyện, kênh, nhóm)</p><p>11 Phương tiện (hồ sơ, ấn phẩm)</p><p>12 Google Doanh nghiệp của tôi (địa điểm)</p><p>13 Các trang web dựa trên WordPress</p><p>14 Plurk</p><h4><strong>Bạn nào cần Plugin nhắn mình gởi bản free đầy đủ tính năng.</strong></h4><p>Login website và cài plugin FS Poster</p><p>Sau khi cài plugin FS poster</p><p>1 : Vào phần account</p><p>2 : Chọn ADD AN ACCOUNT</p><p>3 : Chọn Token Method</p><p>4 : Add token vào =&gt; Get Access</p><p>5 : Sau đó chọn dấu tích&nbsp;=&gt; activate&nbsp;</p><p><br></p><p><br></p><p>Sau khi tạo tài khoản medium bạn làm theo như ảnh để lấy token Medium.</p><p><br></p><p>Như vậy là xong , sau đó các bài viết trên website được đăng thì FS poster sẽ tự động share lên hàng loạt tài khoản medium.&nbsp;</p><p>Với các tính năng tuyệt vời trên plugin sẽ giúp bạn chăm sóc các mạng xã hội&nbsp;, index bài viết website nhanh hơn. Trang web Medium.com có độ Trust và chỉ số rất cao, lượng truy cập ( traffic ) hàng tháng lên đến 500tr người. Hãy tận dụng nó làm một kênh traffic free cho con đường Affiliate Marketing của bạn.</p>",
      status: "success" as RolePost,
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: "huong-dan-su-dung-api-token-mediumcom-hie",
      postCategoryId: 1,
      userId: userId,
    },
    {
      title: "Bảoww mật tàis khoản fb mua không lo bị",
      content:
        '<p><strong>1/ Login fb, kiểm tra thông tin mail có khớp với tài khoản, check pass mail.</strong></p><p><strong>2/ Thay đổi pass hotmail, add mail khôi phục cho hotmail (login hotmail đã very sđt, mailkp đúng cách thì ae nên sử dụng trình duyệt ẩn danh và mạng lan "mạng nhà" để khỏi bị bảo mật phone)s</strong></p><p><strong>Đổi mật khẩu mail qua link: https://account.live.com/password/change</strong></p><p><strong>add mail khôi phục qua link https://account.live.com/proofs/manage/additional</strong></p><p><strong>Trường hợp hotmail đã có mailkp thì ae cứ add mailkp mới và đợi 30 ngày, trong thời gian này mail vẫn login bình thường.</strong></p><p><strong style="color: rgb(230, 77, 77);">3/ Đổi pass facebook không cần ngâm: bằng cách khôi phục tài khoản, nhấn quên mật khẩu để đổi pass mới.</strong></p><p><strong>4/ ae ngâm nuôi lâu dài cần add mail mới cho acc fb. hiện fb đang bóp nên không thể xoá mail cũ vs thay 2fa cho mới tài khoản, ae cần ngâm thời gian cho trust trình duyệt, đủ 30 ngày xoá mail cũ đi, trong trường hợp đổi pass hotmail thì không cần add mail mới.</strong></p><p><strong>Lưu ý: Hiện fb đang trả sđt và email cũ của tài khoản.nên anh em spam hay làm gì cũng dễ cp phone.ae cần ngâm nuôi trust rồi xoá phone fb trả lại tài khoản.</strong></p><p><strong>Chủ yếu bước 2 và 3 ok, vậy là ae khỏi lo bị back tài khoản.s</strong></p>',
      status: "success" as RolePost,
      image:
        "https://api.taphoazalo.com/api/image/uploads/posts/avatar-1720108835434-873122554.jpg",
      slug: "baoww-mat-tais-khoan-fb-mua-khong-lo-bi",
      postCategoryId: 1,
      userId: userId,
    },
  ];
}

const descriptions = `<div id="myDescription" class="typography"><div><font color="#000000"><font size="3"><font face="Times New Roman"><font face="Roboto, &quot;sans-serif&quot;"><strong><strong><strong><font color="#3d464d"><font size="3"><font color="#3d464d"><font size="6"><font face="Roboto, &quot;sans-serif&quot;"><strong><font color="#72ff84">Mã giảm giá 10% cho đơn trên 500k</font></strong></font></font></font></font></font></strong><strong><font color="#3d464d"><font size="3"><font color="#3d464d"><font size="6"><font face="Roboto, &quot;sans-serif&quot;"><strong><font color="#1e92f7">&nbsp; &nbsp;</font></strong></font></font></font></font></font></strong><strong><font color="#3d464d"><font size="3"><font color="#3d464d"><font size="6"><font face="Roboto, &quot;sans-serif&quot;"><strong><font color="#4cea5e">:&nbsp;</font></strong></font></font></font></font></font></strong><strong><font color="#3d464d"><font size="3"><font color="#3d464d"><font size="6"><font face="Roboto, &quot;sans-serif&quot;"><strong><font color="#4cea5e">&nbsp;&nbsp;</font></strong></font></font></font></font></font></strong><strong><font face="Roboto, &quot;sans-serif&quot;"><strong><font face="Arial, &quot;sans-serif&quot;">&nbsp;<font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">&nbsp;<font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><em><u><font color="#f551ff"><font size="5"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">DVX2024PLUS</font></font></font></u></em></font></font></font></strong></font></strong></strong></strong></font></font></font></font><br></div>
<div><font color="#000000"><font size="3"><font face="Times New Roman"><font face="Roboto, &quot;sans-serif&quot;"><strong><strong><strong><font face="Roboto, &quot;sans-serif&quot;"><strong><font face="Arial, &quot;sans-serif&quot;"><font size="6"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><font size="3"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><strong><font size="3"><font face="Roboto, &quot;sans-serif&quot;"><strong><strong><font color="#ff30dc"><font color="#3d464d"><font size="3"><font color="#3d464d"><font size="6"><font face="Roboto, &quot;sans-serif&quot;"><strong><font color="#72ff84">Mã giảm giá 20% cho đơn trên 1000k</font></strong></font></font></font></font></font></font></strong><strong><font color="#ff30dc"><font color="#3d464d"><font size="3"><font color="#3d464d"><font size="6"><font face="Roboto, &quot;sans-serif&quot;"><strong><font color="#1e92f7">&nbsp;</font></strong></font></font></font></font></font></font></strong><strong><font color="#ff30dc"><font color="#3d464d"><font size="3"><font color="#3d464d"><font size="6"><font face="Roboto, &quot;sans-serif&quot;"><strong><font color="#4cea5e">:&nbsp;</font></strong></font></font></font></font></font></font></strong><strong><font color="#ff30dc"><font color="#3d464d"><font size="3"><font color="#3d464d"><font size="6"><font face="Roboto, &quot;sans-serif&quot;"><strong><font color="#4cea5e">&nbsp;&nbsp;</font></strong></font></font></font></font></font></font></strong><strong><font face="Roboto, &quot;sans-serif&quot;"><strong><font face="Arial, &quot;sans-serif&quot;"><font color="#ff30dc">&nbsp;</font><font size="6"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><font size="3"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><font color="#ff30dc">&nbsp;</font><strong><font color="#ff30dc"><font color="#000000"><font size="3"><font face="Roboto, &quot;sans-serif&quot;"><strong><strong><font face="Roboto, &quot;sans-serif&quot;"><strong><font face="Arial, &quot;sans-serif&quot;"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><font color="#ff56ff"><font size="5"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><em><u><strong><font color="#000000"><font size="3"><font face="Roboto, &quot;sans-serif&quot;"><strong><strong><font face="Roboto, &quot;sans-serif&quot;"><strong><font face="Arial, &quot;sans-serif&quot;"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><em><u><font color="#f551ff"><font size="5"><font face="Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">DVX2024PLUS</font></font></font></u></em></font></font></font></strong></font></strong></strong></font></font></font></strong></u></em></font></font></font></font></font></strong></font></strong></strong></font></font></font></font></strong></font></font></font></font></font></strong></font></strong></strong></font></font></strong></font></font></font></font></font></strong></font></strong></strong></strong></font></font></font></font><br></div>
<div><br></div>
<div><font color="#000000"><font size="3"><font face="Times New Roman"><font color="#3d464d"><font size="3"><font face="Roboto, &quot;sans-serif&quot;"><strong><strong><font color="#ff5f54"><font size="5">Nhận buff follow&nbsp;</font></font></strong></strong></font></font></font></font></font></font><br></div>
<div><br></div>
<div><font color="#000000"><font size="3"><font face="Times New Roman"><font color="#ff5f54"><font size="5"><font face="Roboto, sans-serif"><strong>Là shop bán Clone X giá siêu rẻ nên có lợi thế về tài nguyên, đảm bao bảo hành đúng kỳ hạn không lo sụt tụt follower.</strong></font></font></font></font></font></font><br></div>
<div><br></div>
<div><font color="#000000"><font size="3"><font face="Times New Roman"><font color="#ff5f54"><font size="5"><font face="Roboto, sans-serif"><strong>Mọi người có thể tham khảo shop bán Clone X giá lẻ 249đ, site sale 30% link bên dưới :</strong></font></font></font></font></font></font><br></div>
<div><font color="#000000"><font size="3"><font face="Times New Roman"><font face="Roboto, sans-serif"><strong><font size="4">https://taphoammo.net/gian-hang/clone-twitter-x-tren-7-ngay-full-avatar-ip-viet-us-gia-sieu-re_205428</font></strong></font></font></font></font><br></div>
<div><br></div>
<div><font color="#000000"><font size="3"><font face="Times New Roman"><font size="4"><font face="Roboto, sans-serif"><strong>nhớ đánh giá shop để tiền hoàn 3%</strong></font></font></font></font></font><br></div>
<div align="left"><br></div><div align="left"><font color="#000000"><font size="3"><font face="Times New Roman"><font color="#3d464d"><font size="3"><font face="Roboto, &quot;sans-serif&quot;"><u><font color="#1e92f7"><font size="4">Cách sử dụng dịch vụ:</font></font></u></font></font></font></font></font></font><br></div><div align="left"><br></div><div align="left"><font color="#000000"><font size="3"><font face="Times New Roman"><font color="#3d464d"><font face="Roboto, sans-serif">Đối với buff follow bạn gửi @user vào phần nội dung.</font></font></font></font></font><br></div><div align="left"><font color="#000000"><font size="3"><font face="Times New Roman"><font color="#3d464d"><font face="Roboto, sans-serif">Shop bảo hành 15 ngày nếu sụt giảm follow</font></font></font></font></font><br></div><div align="left"><br></div><div align="left"><font color="#000000"><font size="3"><font face="Times New Roman"><font color="#3d464d"><font face="Roboto, sans-serif">Đôi với giải captcha unlock:</font></font></font></font></font><br></div><div align="left"><font color="#000000"><font size="3"><font face="Times New Roman"><font color="#3d464d"><font size="3"><font face="Roboto, &quot;sans-serif&quot;">- Khách gửi file lên google driver vô phần nội dung, nếu gỡ thiếu shop sẽ bảo hành hoàn lại số clone thiếu cho khách.</font></font></font></font></font></font><br></div><div><br></div>
<div><font color="#000000"><font size="3"><font face="Times New Roman">Shop hỗ trợ 24/7</font></font></font><br><br></div>
</div>`;

const descriptions2 = `
<div class="product-tabs__pane product-tabs__pane--active" id="1111">
						<div id="myDescription" class="typography"><div align="left"><strong><font color="#ff857a"><font size="6"><font face="Roboto, sans-serif">- Định dạng Mail <br/>   |Password|MailRecovery<br></font></font></font></strong><font size="7"><strong><font color="#ff4136">&nbsp; &nbsp; Gmail đã qua dịch vụ - Gmail New</font><br><font color="#ff851b">&nbsp; &nbsp; &nbsp; Mã giảm giá 500 gmail:</font><font color="#ff4136"> GMAILSIEUVIP</font></strong></font><br></div><div><strong>&nbsp;<font size="6"> --<font color="#000000"><font color="#000000"><font face="Times New Roman"><font color="#000000"><font face="Times New Roman"><font face="Times New Roman"><font color="#000000"><font face="Times New Roman">Khi đăng nhập gmail, đôi lúc sẽ có bước xác minh mail khôi phục ( Verify it's you).<br>&nbsp; +Các bạn lựa chọn "Confirm your recovery email" rồi điền&nbsp; mail khôi phục là được!</font></font></font></font></font></font></font></font></font></strong><br></div>
<div><strong><font size="6"><font color="#000000"><font color="#000000"><font face="Times New Roman"><font color="#000000"><font face="Times New Roman"><font face="Times New Roman"><font color="#000000"><font face="Times New Roman"><img src="data:image/png;base64,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fDPbfCuJrqiY7//Pf/u1GIdsLFAk7DEIBgIgAAIgAAIgAAIgAAIygZFWFEmWKbi6qJjvV8z3A9Lio382P/pnMyBL/qf/46NQXYEFCrlb4BoEQAAEQAAEQAAEQAAEEhIYdUWRXFQEFi7kj4Hr//Gv3usVFdg0NmGPQTAQAAEQAAEQAAEQAAEQkAmMgaIILDIE5MHJPv4Pq0uyqIBDttwncA0CIAACIAACIAACIAACyQmMgaJwHOcsRIVe+2MuKiAnkncXhAQBEAABEAABEAABEACBAIHxUBSO43z0z+bJliPiY/0v//d2gAg+ggAIgAAIgAAIgAAIgAAIJCcwNoqCVyleHgz6tGK+n5wUQoIACIAACIAACIAACIAACPQSGDNF4ThOtvnWoMqhN3zCPWd7eeEOCIAACIAACIAACIAACICATGD8FAUv/Yk9K7LNt7A0IfcAXIMACIAACIAACIAACIDAaQiMq6LgdR5IV0BLnKajIC4IgAAIgAAIgAAIgAAIhBIYb0XBq8SPseOH3AmbqGzzLf6v9+S7UBC4CQIgAAIgAAIgAAIgAAIgcAICF0FRnKDaiAICIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAACIDAUAlAUQ8GIREAABEAABEAABEAABEBgQglAUUxow6PaIAACIAACIAACIAAC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"><br></font></font><strong><strong><font color="#000000"><font face="Times New Roman">&nbsp;--TUYỆT ĐỐI KHÔNG ĐƯỢC&nbsp;</font></font></strong></strong></font></font></font></font></font></font><strong><font color="#000000"><font face="Times New Roman"><strong><font color="#000000"><font face="Times New Roman">CHỌN LỰA CHỌN NHẬN MÃ CODE ( Get a verification code at...) KHÔNG LÀ MAIL SẼ DIE!</font></font></strong></font></font></strong></font></strong><br></div>
<div><strong><font size="6">&nbsp;--MUA SLL IB SHOP UP HÀNG VÀ LẤY MÃ GIẢM GIÁ</font><br><font size="5"><font face="Roboto, &quot;sans-serif&quot;"><font face="Roboto, &quot;sans-serif&quot;"><font face="Roboto, &quot;sans-serif&quot;"><font face="Roboto, &quot;sans-serif&quot;"><font face="Roboto, &quot;sans-serif&quot;"><font face="&quot;Segoe UI&quot;, &quot;Helvetica Neue&quot;, Helvetica, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, sans-serif"><font color="#3d464d">- Chế độ bảo hành:</font><br><font color="#f012be">+Bảo hành login success lần đầu trong 7 ngày kể từ ngày mua account</font></font></font></font></font></font></font></font><br><br><font color="#008e02"><font size="3"><font face="Roboto, sans-serif">&nbsp; &nbsp;· ĐỂ LẠI REVIEW ĐỂ NHẬN GIẢM GIÁ Ạ. CHÚC AE LÀM VIỆC SUÔN SẺ</font></font></font><br></strong> </div>
</div>
					</div>`;
export const content = `
  
          <h1>Tạp hóa MMO - Chuyên trang thương mại điện tử sản phẩm số - Phục vụ cộng đồng MMO (Kiếm tiền online)</h1><p>Một sản phẩm ra đời với mục đích thuận tiện và an toàn hơn trong các giao dịch mua bán sản phẩm số.</p><p>Như các bạn đã biết, tình trạng lừ.a đảo trên mạng xã hội kéo dài bao nhiêu năm nay, mặc dù đã có rất nhiều giải pháp từ cộng đồng như là trung gian hay bảo hiểm, nhưng vẫn rất nhiều người dùng lựa chọn mua bán nhanh gọn mà bỏ qua các bước kiểm tra, hay trung gian, từ đó tạo cơ hội cho s.c.a.m.m.e.r hoạt động. Ở Taphoammo, bạn sẽ có 1 trải nghiệm mua hàng yên tâm hơn rất nhiều, chúng tôi sẽ giữ tiền người bán 3 ngày, kiểm tra toàn bộ sản phẩm bán ra có trùng với người khác hay không, nhắm mục đích tạo ra một nơi giao dịch mà người dùng có thể tin tưởng, một trang mà người bán có thể yên tâm đặt kho hàng, và cạnh tranh sòng phẳng.</p><h2>Các tính năng trên trang:</h2><ul><li>Check trùng sản phẩm bán ra: toàn bộ gian hàng cam kết không bán trùng, hệ thống của chúng tôi sẽ kiểm tra từng sản phẩm một, để đảm bảo hàng đến tay người dùng chưa từng được bán cho ai khác trên trang, và hàng bạn đã mua, cũng không thể bán cho ai khác nữa.</li><li>Nạp tiền và thanh toán tự động: Bạn chỉ cần nạp tiền đúng cú pháp, số dư của bạn sẽ đc cập nhật sau 1-5 phút. Mọi bước thanh toán và giao hàng đều được thực hiện ngay tức thì.</li><li>Giữ tiền đơn hàng 3 ngày: Sau khi bạn mua hàng, đơn hàng đó sẽ ở trạng thái Tạm giữ tiền 3 ngày, đủ thời gian để bạn kiểm tra, đổi pass sản phẩm. Nếu có vấn đề gì, hãy nhanh chóng dùng tính năng "Khiếu nại" nhé.</li><li>Tính năng dành cho cộng tác viên (Reseller): Các bạn đọc thêm ở mục "FAQs - Câu hỏi thường gặp" nhé.</li></ul><h2>Các mặt hàng đang kinh doanh tại Tạp Hóa MMO</h2><ul><li>Mua bán email: Mua bán gmail, mail outlook, domain... tất cả đều có thể được tự do mua bán trên trang.</li><li>Mua bán phần mềm MMO: các phần mềm phục vụ cho kiếm tiền online, như phần mềm youtube, phần mềm chạy facebook, phần mềm PTC, PTU, phần mềm gmail....</li><li>Mua bán tài khoản: mua bán facebook, mua bán twitter, mua bán zalo, mua bán instagram.</li><li>Các sản phẩm số khác: VPS, key window, key diệt virus, tất cả sản phẩm số không vi phạm chính sách của chúng tôi đều được phép kinh doanh trên trang.</li><li>Các dịch vụ tăng tương tác (like, comment, share...), dịch vụ phần mềm, blockchain và các dịch vụ số khác.</li></ul>
          
          `;
