---
layout: drpost
title:  "Game from scratch: Nên hay không?"
date:   2013-07-28 11:35:41
categories: articles
description: "Game from scratch discussion. Vietnamese."
---

Suy cho cùng thì hiện nay có hai phương pháp phát triển games chính, một là sử dụng
các game engines sẵn có và hai là tự code game từ các library hoặc đôi khi là SDK của
các nhà phát triển khác. Tất nhiên việc code chỉ từ các library được coi là phát triển
từ con số không vì bạn sẽ phải tự lập ra game loop, game objects, game mechanic,... còn
library chỉ hỗ trợ bạn những cái cơ bản như tạo GUI/Window, load images/sounds... Vậy
bạn sẽ thu được những gì và sẽ gặp những vấn đề gì trong quá trình phát triển từ zero?

1. **Bạn tự code game từ zero khi:**
  * **Học tập:**
  Đây luôn là lý do đầu tiên đối với việc develop game from scratch, bởi khi phát triển theo cách
  này, bạn sẽ tiến bộ hơn rất nhiều trong khả năng lập trình, hơn thế, quá trình này sẽ giúp bạn
  hiểu rõ hơn về cấu trúc của một game đồng thời sẽ khiến bạn phải tìm hiểu và mầy mò nhiều hơn
  trong việc lập trình và việc thiết kế games.
  * **Kiểm soát:**
  Với một game được code hoàn chỉnh từ đầu đến cuối bằng chính tay bạn, tất nhiên việc kiểm soát
  cấu trúc sẽ đơn giản hơn rất nhiều so với việc sử dụng game engine sẵn có. Nếu cảm thấy performance
  không được như mong muốn, bạn có thể tìm tòi hoặc thậm chí tìm sự trợ giúp từ người khác để cải thiện.
  Ngoài ra, bạn có thể kiểm soát được những tính năng cần thiết trong game của bạn, khi bạn cần thì hoàn toàn
  có thể thêm vào và khi bạn không cần thì có thể loại ra để giảm dung lượng và tăng tốc độ xử lý trong một
  vài tình huống.
  * **Miễn phí:**
  Bạn sẽ không phải lệ thuộc vào bất kì một license nào từ nhà sản xuất thứ 3, không như game engine hoặc là
  thu phí, hoặc là có các điều kiện lớn bé trong việc phát triển game. Vì vậy nếu tài chính eo hẹp và quỹ thời gian
  lớn, hãy lựa chọn phương án game from scratch.
  * **Khả năng phát triển sau này:**
  Mã nguồn là của bạn, vì vậy bạn hoàn toàn có điều kiện và khả năng để tiếp tục phát triển sau này. Từ việc
  lấy mã nguồn game cũ làm nền tảng cho games mới, cho đến việc phát triển thành các game engine thương mại về sau,
  tất cả đều nằm trong tay bạn.

2. **Bạn nên sử dụng game engine:**
  * **Bạn cần một nền tảng vững chắc và đảm bảo:**
  Khi bạn làm một thứ gì đó từ đầu, hiển nhiên nó sẽ bắt gặp một vài lỗi phát sinh trong quá trình phát triển.
  Trong khi đó, với một game engine lâu đời, những lỗi hay vấn đề trong việc phát triển games đều được người dùng
  góp ý và sửa đổi trong thời gian dài, vì vậy sự vững chắc và đảm bảo cũng được nâng cao. Với một sản phẩm thương mại,
  việc đầu tiên một nhà phát triển phải lưu tâm là việc đảm bảo quá trình chơi suôn sẻ cho người tiêu dùng, trong những
  trường hợp này, việc tự code game từ con số không có vẻ không phải lựa chọn tốt.
  * **Thời gian không nhiều:**
  Việc phát triển game từ đầu cùng với việc nâng cấp chúng là một quá trình tốn nhiều thời gian và công sức, hơn thế
  bạn còn phải nghiên cứu và tìm tòi về cấu trúc game trước khi bắt tay vào công việc này. Vì vậy
  nếu bạn đang tiến sát đến deadline, hoặc thời gian bạn được giao không đủ lớn, hãy lựa chọn một game engine đáng
  tin cậy thay vì tự tay làm hết mọi thứ.
  * **Cần một cộng đồng hỗ trợ lớn:**
  Bạn code game từ con số không thì sẽ chẳng có ai hiểu và biết đến cái đống mã nguồn lằng nhằng của bạn để trợ giúp
  cả. Trong khi đó, một game engine chất lượng sẽ có một cộng đồng sử dụng lớn, từ đó bạn sẽ nhận được nhiều
  hỗ trợ trong quá trình phát triển hơn, điều này đặc biệt cần thiết đối với những người chập chững vào ngành công
  nghiệp games.

Trên đây là một vài quan điểm cá nhân của mình về vấn đề này. Một thời gian ngắn nữa mình sẽ bắt đầu series
game from scratch, vừa là để mình học tập, vừa là muốn chia sẻ với mọi người. Có lẽ ngôn ngữ sẽ là C++ và sử
dụng library SFML. Có điều gì chưa chính xác hay thiếu sót mong các bạn giúp đỡ và bổ sung qua contact phía dưới
cùng.

