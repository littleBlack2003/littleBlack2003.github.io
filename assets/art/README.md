# assets/art/ —— 摄影作品图片目录

把你自己的艺术摄影作品放到这个目录，然后在 `index.html` 的「摄影」板块里替换占位卡片。

## 一、替换一个作品位

在 `index.html` 里找到「摄影」板块，占位卡片长这样：

```html
<figure class="photo is-empty">
  <div class="photo-media"><span class="photo-plus" aria-hidden="true">+</span></div>
  <figcaption class="photo-meta">
    <span class="photo-title">作品位 01</span>
    <span class="photo-year">待添加</span>
  </figcaption>
</figure>
```

把整段替换为：

```html
<figure class="photo">
  <div class="photo-media">
    <img src="assets/art/photo-01.jpg" alt="黄昏的江面" loading="lazy">
  </div>
  <figcaption class="photo-meta">
    <span class="photo-title">黄昏的江面</span>
    <span class="photo-year">2026</span>
  </figcaption>
</figure>
```

要点：
- 一定要去掉 `is-empty` 这个 class —— 去掉后才会启用悬停效果、点击看大图。
- `img` 的 `src` 写相对路径 `assets/art/文件名`。
- `alt` 写图片描述（无障碍与 SEO 用）。
- `loading="lazy"` 保留即可，图片会延迟加载、页面更快。

## 二、加更多作品

直接复制整段 `<figure class="photo">...</figure>` 粘贴即可，网格会自动排版
（桌面三列、平板两列、手机一列）。

## 三、大图与原图

网格里图片按 **3:2 统一裁切**显示，所以看起来整齐；点开的大图是**原图不裁切**。所以：

- 如果想让网格里也完整显示构图，建议上传前裁成 3:2。
- 想点开时看另一张更大 / 更清晰的版本，可以额外加 `data-full`：

```html
<img src="assets/art/photo-01.jpg"
     data-full="assets/art/photo-01-large.jpg"
     alt="黄昏的江面" loading="lazy">
```

## 四、建议规格

- 长边 1600–2400 px，JPG 或 WebP，单张 300–800 KB。
- 同一批作品尽量保持同样的比例，视觉更统一。
- 文件名用英文或拼音，避免空格（用 `-` 连接），例如 `wuhan-river-01.jpg`。

## 五、当前的照片位

`index.html` 里预留了 6 个位置（作品位 01–06）。用不上可以整段删掉，不够就复制更多。
