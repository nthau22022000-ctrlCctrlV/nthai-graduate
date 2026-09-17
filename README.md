# nthai-graduate

Thiết kế Website làm thư mời dự lễ tốt nghiệp
Ưu tiên xem trên điện thoại
Thành phẩm 1 trang để người dùng nhập tên người được mời và tạo liên kết
Sản phẩm sẽ được đẩy lên hosting free - domain free
Trang index là cho người dùng có thể nhập tên người được mời và tạo link kết sao chép
/invite= -> sẽ là liên kết ngừoi nhận được

Thông số vật lý của pháo hoa để nó rơi chậm rãi và nhẹ nhàng hơn rồi nhé:
Lực nổ ban đầu (velocity): Giảm xuống, pháo sẽ không bị bung ra quá gắt.
Lực hút trái đất (gravity): Giảm xuống, các hạt pháo hoa sẽ có cảm giác bay lơ lửng và rơi từ từ xuống rất thơ mộng.
Tần suất bắn: Giãn cách ra 1.2 giây mỗi đợt, tạo khoảng nghỉ vừa phải, không làm rối mắt khách mời.

- Thêm vòng nguyệt quế bao quanh biểu tượng mũ cử nhân.
- Thêm các họa tiết trang trí ở 4 góc của thiệp (corner ornaments).
- Thêm hình ảnh dải ruy băng dưới tiêu đề LỄ TỐT NGHIỆP để tăng độ trang trọng, giữ nguyên phong cách thiệp gốc.

## Nâng cấp thiết kế giấy xé

Phần hiển thị tên tân thạc sĩ đã được nâng cấp dựa trên thiết kế tham chiếu trong `IMG_2197.JPG`:

- Thay đường phân cách dạng sóng bằng hai mép giấy xé SVG bất đối xứng.
- Bổ sung lớp xơ giấy sáng và bóng tiếp xúc tại mép xé trên, dưới để tạo chiều sâu.
- Nền đỏ rượu vang sử dụng nhiều lớp màu loang kết hợp texture giấy, thay cho một màu phẳng.
- Thêm hiệu ứng mép giấy cuộn ở bên phải với vùng sáng, vùng lõm tối và bóng đổ.
- Chuyển chữ "Tân thạc sĩ" sang màu trắng ngà và điều chỉnh độ đậm gần với mẫu.
- Điều chỉnh tên thạc sĩ sang nét chữ thanh hơn, có kích thước responsive và bóng chữ nhẹ.
- Tăng khoảng cách quanh khối tên để nội dung không chạm mép giấy trên màn hình điện thoại.

### Kiểm tra

- `npm run build`: thành công với Vite 8.3.0.
- `git diff --check`: không phát hiện lỗi khoảng trắng.
- Chưa thực hiện kiểm tra screenshot trên trình duyệt do môi trường không cho phép mở local dev server.
- Tải nhạc nền không bản quyền (Canon in D) và tích hợp vào thiệp mời.
- Thêm nút Bật/Tắt nhạc (music player) xoay hình tròn như đĩa than ở góc dưới.
- Tự động bật nhạc khi khách mời chạm vào màn hình (vượt qua chính sách chặn Autoplay của trình duyệt).
- Đổi nhạc nền sang bản Acoustic/Ukulele vui tươi, tích cực.
- Thiết kế lại giao diện nút Music Player thành đĩa than (vinyl record) xoay tròn.
- Bổ sung hiệu ứng cuộn mượt mà (Scroll Animations): lướt lên, lướt xuống, lướt ngang, và phóng to cho các cụm văn bản, thẻ và thông tin để tăng tính hiện đại và sinh động.
- Tinh chỉnh hiệu ứng lướt (staggered animation) cho Chương trình chi tiết: Các mốc thời gian sẽ lần lượt lướt vào từ trái sang phải vô cùng mượt mà và tuần tự.
- Sửa lỗi giật hình khi cuộn trang: Các hiệu ứng lướt (scroll animations) nay chỉ chạy một lần duy nhất khi khối nội dung xuất hiện trên màn hình, giúp việc lướt lên lướt xuống mượt mà tuyệt đối và không gây mỏi mắt.
- Thêm phần "Lời Tự Sự & Lời Cảm Ơn" với nội dung chân thành, sâu lắng.
- Định dạng chữ và canh lề chuẩn phong cách thiệp cưới/sự kiện cao cấp với dấu ngoặc kép trích dẫn cách điệu.
- Thiết kế lại phần Chương trình chi tiết theo phong cách timeline cao cấp: đường kẻ dọc gradient vàng, chấm tròn bo viền vàng, thẻ nội dung có nền mờ (glassmorphism), typography serif cho tiêu đề mỗi mục.
- Nâng cấp icon mũ tốt nghiệp: vẽ lại 3D isometric có mặt bảng, thân mũ, dây tua và chùm tua rua; thêm hiệu ứng bóng đổ và hoạt ảnh lướt nhẹ (floating) vô cùng tinh tế.
- Tinh chỉnh theo nguyên tắc thiết kế thiệp sang trọng: thay mũ 3D phức tạp bằng mũ cử nhân nét mảnh tối giản; thay bộ lá lớn + sao bằng cành nguyệt quế nhỏ nhắn ôm bên dưới. Một điểm nhấn chính, một họa tiết phụ.
