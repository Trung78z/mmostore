import { PrismaClient } from "@prisma/client";
import {
  post,
  postCategory,
  productCategory,
  serviceCategory,
  product,
  user,
  service,
  profile,
  serviceSell,
} from "./data";
const prisma = new PrismaClient();
async function main() {
  await prisma.users.createMany({ data: user() });
  const result = await prisma.users.findFirst();
  await prisma.homepages.create({ data: { content } });
  await prisma.postCategory.createMany({ data: postCategory() });

  for (const item of productCategory()) {
    await prisma.productCategory.create({
      data: {
        category: item.category,
        subCategory: {
          createMany: { data: item.subCategory },
        },
      },
    });
  }
  for (const item of serviceCategory()) {
    await prisma.serviceCategory.create({
      data: {
        category: item.category,
        subCategory: {
          createMany: { data: item.subCategory },
        },
      },
    });
  }

  if (result) {
    await prisma.profiles.create({ data: profile(result.id) });
    await prisma.posts.createMany({ data: post(result.id) });
    await prisma.products.createMany({ data: product(result.id) });
    await prisma.services.createMany({ data: service(result.id) });
    await prisma.serviceSales.createMany({ data: serviceSell });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const content = `
  
  <h1>Tạp hóa MMO - Chuyên trang thương mại điện tử sản phẩm số - Phục vụ cộng đồng MMO (Kiếm tiền online)</h1><p>Một sản phẩm ra đời với mục đích thuận tiện và an toàn hơn trong các giao dịch mua bán sản phẩm số.</p><p>Như các bạn đã biết, tình trạng lừ.a đảo trên mạng xã hội kéo dài bao nhiêu năm nay, mặc dù đã có rất nhiều giải pháp từ cộng đồng như là trung gian hay bảo hiểm, nhưng vẫn rất nhiều người dùng lựa chọn mua bán nhanh gọn mà bỏ qua các bước kiểm tra, hay trung gian, từ đó tạo cơ hội cho s.c.a.m.m.e.r hoạt động. Ở Taphoammo, bạn sẽ có 1 trải nghiệm mua hàng yên tâm hơn rất nhiều, chúng tôi sẽ giữ tiền người bán 3 ngày, kiểm tra toàn bộ sản phẩm bán ra có trùng với người khác hay không, nhắm mục đích tạo ra một nơi giao dịch mà người dùng có thể tin tưởng, một trang mà người bán có thể yên tâm đặt kho hàng, và cạnh tranh sòng phẳng.</p><h2>Các tính năng trên trang:</h2><ul><li>Check trùng sản phẩm bán ra: toàn bộ gian hàng cam kết không bán trùng, hệ thống của chúng tôi sẽ kiểm tra từng sản phẩm một, để đảm bảo hàng đến tay người dùng chưa từng được bán cho ai khác trên trang, và hàng bạn đã mua, cũng không thể bán cho ai khác nữa.</li><li>Nạp tiền và thanh toán tự động: Bạn chỉ cần nạp tiền đúng cú pháp, số dư của bạn sẽ đc cập nhật sau 1-5 phút. Mọi bước thanh toán và giao hàng đều được thực hiện ngay tức thì.</li><li>Giữ tiền đơn hàng 3 ngày: Sau khi bạn mua hàng, đơn hàng đó sẽ ở trạng thái Tạm giữ tiền 3 ngày, đủ thời gian để bạn kiểm tra, đổi pass sản phẩm. Nếu có vấn đề gì, hãy nhanh chóng dùng tính năng "Khiếu nại" nhé.</li><li>Tính năng dành cho cộng tác viên (Reseller): Các bạn đọc thêm ở mục "FAQs - Câu hỏi thường gặp" nhé.</li></ul><h2>Các mặt hàng đang kinh doanh tại Tạp Hóa MMO</h2><ul><li>Mua bán email: Mua bán gmail, mail outlook, domain... tất cả đều có thể được tự do mua bán trên trang.</li><li>Mua bán phần mềm MMO: các phần mềm phục vụ cho kiếm tiền online, như phần mềm youtube, phần mềm chạy facebook, phần mềm PTC, PTU, phần mềm gmail....</li><li>Mua bán tài khoản: mua bán facebook, mua bán twitter, mua bán zalo, mua bán instagram.</li><li>Các sản phẩm số khác: VPS, key window, key diệt virus, tất cả sản phẩm số không vi phạm chính sách của chúng tôi đều được phép kinh doanh trên trang.</li><li>Các dịch vụ tăng tương tác (like, comment, share...), dịch vụ phần mềm, blockchain và các dịch vụ số khác.</li></ul>
  
  `;
