import bcrypt from "bcrypt";
export function user() {
  return [
    {
      email: "trungpspy@gmail.com",
      username: "trungpspy",
      password: bcrypt.hashSync("Trungpy78@", 10),
    },
    {
      email: "trungpyy@gmail.com",
      username: "trungpyy",
      password: bcrypt.hashSync("Trungpy78@", 10),
    },
  ];
}
export function post(userId: string) {
  return [
    {
      title: "Tại sao nên bán hàng trên Instagram?",
      content:
        "<h2>7 kinh nghiệm bán hàng trên Instagram</h2><p>Để bán hàng trên Instagram có hiệu quả, bạn cần lưu ý một số điều sau:</p><p><br></p><h3><strong>1. Lựa chọn kinh doanh sản phẩm phù hợ</strong></h3><p>Như đã nói, đối tượng sử dụng Instagram chủ yếu là giới trẻ nên khi lựa chọn bán hàng trên nền tảng này, bạn cần lựa chọn các sản phẩm, các mặt hàng phù hợp với thị hiếu người dùng này.</p><p>Có thể lựa chọn các sản phẩm ngách để dễ dàng tiếp cận khách hàng thay vì ôm đồm một lĩnh vực lớn. Ví dụ như với mặt hàng thời trang nữ, nên đánh vào một nhánh cụ thể như thời trang công sở, thời trang vintage,…</p><p><br></p><h3><strong>2. Tối ưu thông tin phần mô tả đầu trang</strong></h3><p>Để giúp khách hàng có thể ghi nhớ và nhớ lâu, bạn nên đặt tên shop thật ngắn gọn và ấn tượng, đồng bộ với tên trên các nền tảng bán hàng khác.</p><p>Bên cạnh đó, ở phần mô tả đầu trang, bạn cũng nên cập nhật đủ thông tin liên hệ, địa chỉ, sản phẩm kinh doanh và link website,… giúp khách hàng có thể nắm rõ ngay khi truy cập trang của bạn.</p><p><br></p><p>Bạn nên tối ưu thông tin phần mô tả đầu trang để tạo ấn tượng với khách hàng</p><p><br></p><h3><strong>3. Sử dụng hashtag</strong></h3><p>Hashtag là công cụ cực kỳ hữu ích bạn không nên bỏ qua khi bán hàng trên Instagram. Bởi:</p><ul><li>Hashtag được xem là từ khóa chính thường được khách hàng sử dụng mỗi khi có nhu cầu tìm kiếm thông tin, sản phẩm.</li><li>Hashtag hỗ trợ phân loại sản phẩm giúp khách hàng dễ dàng tìm kiếm.</li><li>Giúp bạn có thể nắm bắt được nhu cầu và xu hướng quan tâm mới của khách hàng.</li></ul><p>Vì vậy, khi bán hàng, bạn nên sử dụng hashtag xuyên suốt các bài đăng của mình. Điều này không chỉ giúp tạo dựng kho thông tin mà còn giúp cho bài viết của bạn dễ dàng lên top đầu kết quả tìm kiếm cũng như dễ dàng tiếp cận khách hàng một cách tự nhiên.</p><p><br></p><p>Nên sử dụng hashtag để tăng khả năng tiếp cận khách hàng</p><p><br></p><h3><strong>4. Đầu tư vào hình ảnh</strong></h3><p>Khi bán hàng trên Instagram, không phải nội dung bài viết mà hình ảnh mới chính là yếu tố quan trọng gây ấn tượng với khách hàng. Vì vậy, bạn nên chú trọng đầu tư vào yếu tố này.</p><p>Bạn có thể không nhất thiết phải sử dụng máy ảnh chuyên nghiệp. Thay vào đó, bạn có thể tận dụng ngay chiếc Smartphone của mình để chụp ảnh.</p><p>Ngoài ra, để có một bức ảnh thu hút, hãy tập trung vào các chi tiết, các khoảnh khắc, hãy thêm các hiệu ứng để bức ảnh của bạn trông lung linh và thu hút hơn.</p><p><br></p><h3><strong>5. Kết hợp với các Influencer</strong></h3><p>Một cách bán hàng trên Instagram cực hiệu quả mà bạn có thể thử áp dụng, đó là kết hợp với các Influencer – những người có sức ảnh hưởng vô cùng lớn trên mạng xã hội để quảng bá sản phẩm của mình.</p><p>Các Influencer là những người có tiếng nói, có lượng fan khá đông đảo nên bạn có thể tận dụng những điều này để thúc đẩy giới thiệu sản phẩm của mình đến với nhiều người dùng hơn nữa.</p><p><br></p><h3><strong>6. Sử dụng tính năng story để bán hàng trên Instagram</strong></h3><p>Bên cạnh việc đăng bài lên NewFeed, bạn có thể đăng tải các story trên Instagram. Mặc dù các story này thường sẽ biến mất sau 24h nhưng bạn vẫn có thể lưu lại chúng thành từng mục trên trang cá nhân để phục vụ nhu cầu tìm kiếm của khách hàng cũng như thu hút người dùng mới.</p><p><br></p><h3><strong>7. Chia sẻ các phản hồi của khách hàng</strong></h3><p>Phản hồi của khách hàng là một trong những yếu tố đánh giá chân thực nhất về chất lượng sản phẩm của bạnkhi bán hàng trên Instagram.</p><p>Do vậy, với những khách hàng đã mua và sử dụng, bạn có thể tiến hành chăm sóc, xin ý kiến đánh giá, phản hồi để có thể chia sẻ lên trang bán hàng hoặc để rút kinh nghiệm trong trường hợp mang đến những trải nghiệm chưa tốt.</p><p>Trên đây là những chia sẻ về cách bán hàng trên Instagram. Hy vọng với những chia sẻ này, việc bán hàng của bạn sẽ trở nên suôn sẻ và hiệu quả hơn.!</p>",
      image:
        "http://localhost:8080/api/post/uploads/avatar-1720005367435-656148641",
      slug: "tai-sao-nen-ban-hang-tren-instagram",
      published: false,
      userId: userId,
    },
    {
      title: "Hướng dẫn sử dụng API token Medium.com hiệ",
      content:
        "<p>Một trong những plugin share , chăm&nbsp;sóc social tốt nhất .&nbsp;</p><p>Giá hiện tại khá cao mỗi key chỉ dùng được một website.</p><p>Nay mình share bản crack free cho ae , tuy không đầy đủ như bản chính thức nhưng cũng đủ mang lại hiệu quả cho website và ae làm auto.&nbsp;</p><p>Plugin auto-poster / reposter của WordPress hỗ trợ Facebook, Instagram, Twitter, Pinterest, Linkedin, Google my Business, Telegram, Medium, Reddit, Tumblr, VK, OK ru, Plurk, các blog dựa trên WordPress.</p><p>FS Poster&nbsp;mang đến cho bạn cơ hội tuyệt vời để tự động xuất bản các bài đăng WordPress trên các mạng xã hội phổ biến nhất một cách tự động.&nbsp;Bằng cách sử dụng FS Poster, bạn cũng sẽ có thể lên lịch cho các bài đăng, xuất bản lại các bài đăng đã tạo trước đó, v.v.</p><h3><strong>Lợi ích của việc mua plugin FS Poster là gì?</strong></h3><p><br></p><p>1 Tiết kiệm thời gian của bạn&nbsp;Bạn sẽ có thể tiết kiệm thời gian của mình bằng cách chia sẻ các bài đăng WordPress của bạn một cách tự động</p><p>2 Cải thiện SEO trang web&nbsp;Bạn sẽ có thể tăng liên kết đến trang web của mình từ các mạng xã hội.</p><p>3 Giữ cho phương tiện truyền thông xã hội của bạn luôn mới&nbsp;Bạn sẽ có thể giữ cho hồ sơ xã hội của mình luôn mới mẻ bằng cách đăng thường xuyên bằng cách sử dụng mô-đun Lịch biểu.</p><p>4 Tăng khách truy cập trang web&nbsp;Nhiều lượt chia sẻ hơn sẽ mang lại nhiều khách truy cập vào trang web của bạn.</p><h3><strong>Các mạng xã hội được hỗ trợ</strong></h3><p><br></p><p>Bạn sẽ có thể xuất bản các bài đăng / trang / sản phẩm của mình lên 14 mạng xã hội cùng một lúc:</p><p>1 Facebook (tài khoản, trang, nhóm)</p><p>2 Twitter (tài khoản)</p><p>3 Instagram (tài khoản, câu chuyện)</p><p>4 Linkedin (tài khoản, công ty)</p><p>5 Pinterest (bảng tài khoản)</p><p>6 Reddit (tài khoản, tín dụng phụ)</p><p>7 Tumblr (tài khoản)</p><p>8 VK com (tài khoản, trang, nhóm, sự kiện)</p><p>9 OK ru (tài khoản, nhóm)</p><p>10 Telegram (trò chuyện, kênh, nhóm)</p><p>11 Phương tiện (hồ sơ, ấn phẩm)</p><p>12 Google Doanh nghiệp của tôi (địa điểm)</p><p>13 Các trang web dựa trên WordPress</p><p>14 Plurk</p><h4><strong>Bạn nào cần Plugin nhắn mình gởi bản free đầy đủ tính năng.</strong></h4><p>Login website và cài plugin FS Poster</p><p>Sau khi cài plugin FS poster</p><p>1 : Vào phần account</p><p>2 : Chọn ADD AN ACCOUNT</p><p>3 : Chọn Token Method</p><p>4 : Add token vào =&gt; Get Access</p><p>5 : Sau đó chọn dấu tích&nbsp;=&gt; activate&nbsp;</p><p><br></p><p><br></p><p>Sau khi tạo tài khoản medium bạn làm theo như ảnh để lấy token Medium.</p><p><br></p><p>Như vậy là xong , sau đó các bài viết trên website được đăng thì FS poster sẽ tự động share lên hàng loạt tài khoản medium.&nbsp;</p><p>Với các tính năng tuyệt vời trên plugin sẽ giúp bạn chăm sóc các mạng xã hội&nbsp;, index bài viết website nhanh hơn. Trang web Medium.com có độ Trust và chỉ số rất cao, lượng truy cập ( traffic ) hàng tháng lên đến 500tr người. Hãy tận dụng nó làm một kênh traffic free cho con đường Affiliate Marketing của bạn.</p>",
      image:
        "http://localhost:8080/api/post/uploads/avatar-1720006653091-730369529",
      slug: "huong-dan-su-dung-api-token-mediumcom-hie",
      published: false,
      userId: userId,
    },
    {
      title: "Bảoww mật tàis khoản fb mua không lo bị",
      content:
        '<p><strong>1/ Login fb, kiểm tra thông tin mail có khớp với tài khoản, check pass mail.</strong></p><p><strong>2/ Thay đổi pass hotmail, add mail khôi phục cho hotmail (login hotmail đã very sđt, mailkp đúng cách thì ae nên sử dụng trình duyệt ẩn danh và mạng lan "mạng nhà" để khỏi bị bảo mật phone)s</strong></p><p><strong>Đổi mật khẩu mail qua link: https://account.live.com/password/change</strong></p><p><strong>add mail khôi phục qua link https://account.live.com/proofs/manage/additional</strong></p><p><strong>Trường hợp hotmail đã có mailkp thì ae cứ add mailkp mới và đợi 30 ngày, trong thời gian này mail vẫn login bình thường.</strong></p><p><strong style="color: rgb(230, 77, 77);">3/ Đổi pass facebook không cần ngâm: bằng cách khôi phục tài khoản, nhấn quên mật khẩu để đổi pass mới.</strong></p><p><strong>4/ ae ngâm nuôi lâu dài cần add mail mới cho acc fb. hiện fb đang bóp nên không thể xoá mail cũ vs thay 2fa cho mới tài khoản, ae cần ngâm thời gian cho trust trình duyệt, đủ 30 ngày xoá mail cũ đi, trong trường hợp đổi pass hotmail thì không cần add mail mới.</strong></p><p><strong>Lưu ý: Hiện fb đang trả sđt và email cũ của tài khoản.nên anh em spam hay làm gì cũng dễ cp phone.ae cần ngâm nuôi trust rồi xoá phone fb trả lại tài khoản.</strong></p><p><strong>Chủ yếu bước 2 và 3 ok, vậy là ae khỏi lo bị back tài khoản.s</strong></p>',
      image:
        "http://localhost:8080/api/post/uploads/avatar-1720006752166-966193932",
      slug: "baoww-mat-tais-khoan-fb-mua-khong-lo-bi",
      published: false,
      userId: userId,
    },
  ];
}
