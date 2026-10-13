# assets/art/

把你的艺术作品图片放在这个目录里，然后在 `index.html` 的 **艺术** 板块中替换占位卡片。

## 替换方法

找到 `index.html` 里这一段（约在「艺术」板块末尾）：

```html
<figure class="gallery-item placeholder">
  <div class="ph-icon">+</div>
  <figcaption>作品位 01<span>把你的图片放进 assets/art/ 并替换这里</span></figcaption>
</figure>
```

改成：

```html
<figure class="gallery-item">
  <img src="assets/art/your-work.jpg" alt="作品名称">
  <figcaption>作品名称<span>2026 · 纸本水墨</span></figcaption>
</figure>
```

## 建议

- 图片宽度 1200–1600 px、JPG/WebP 格式，单张控制在 500 KB 以内，加载更快。
- 想加更多作品，直接复制整段 `<figure>` 即可，网格会自动排版。
- 想点击放大看原图，可以把 `<img>` 包进 `<a href="assets/art/your-work.jpg" target="_blank">`。
