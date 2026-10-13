# WuXiaoHei · 个人主页

科研 + 艺术双主题的浅色简洁个人主页，托管于 GitHub Pages。

线上地址：**https://littleBlack2003.github.io**

## 目录结构

```
.
├── index.html            # 单页主页（关于 / 研究 / 艺术 / 联系）
├── assets/
│   ├── css/style.css     # 全部样式
│   ├── js/main.js        # 点阵动画、滚动淡入
│   ├── img/favicon.svg   # 站点图标
│   └── art/README.md     # 艺术作品图片放置说明
├── .nojekyll             # 跳过 Jekyll 处理，保证资源路径正常
└── README.md
```

纯静态站点，无构建步骤、无依赖。改完直接提交推送即可。

## 本地预览

直接双击 `index.html`，或在目录下起一个静态服务：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 更新发布

```bash
git add -A
git commit -m "update site"
git push
```

推送后 GitHub Pages 会自动重新构建，通常 1 分钟内生效。

## 待办 / 可自定义的地方

- [ ] 顶部的姓名与简介文案（`index.html` 中 `.hero` 部分）
- [ ] 「研究」卡片里的仓库链接，目前统一指向 GitHub 仓库列表，可改为具体仓库地址
- [ ] 「艺术」板块的三张占位卡片，替换为真实作品（见 `assets/art/README.md`）
- [ ] 联系方式的邮箱与社交链接
- [ ] 如需自定义域名，在仓库根目录添加 `CNAME` 文件
