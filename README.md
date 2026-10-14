# WuXiaoHei · 个人主页

风格参考 [Academic Pages](https://academicpages.github.io/)（Minimal Mistakes 的学术分支）：
左侧栏个人名片 + 右侧正文的两栏学者主页，浅色简洁。托管于 GitHub Pages。

线上地址：**https://littleBlack2003.github.io**

## 目录结构

```
.
├── index.html            # 单页主页（关于 / 研究 / 摄影 / 联系）
├── assets/
│   ├── css/style.css     # 全部样式
│   ├── js/main.js        # 摄影作品大图查看、页脚年份
│   ├── img/favicon.svg   # 站点图标
│   ├── img/avatar.svg    # 侧栏头像（占位，建议换成真人照片）
│   └── art/README.md     # 摄影作品图片放置说明
├── .nojekyll             # 跳过 Jekyll 处理，保证资源路径正常
└── README.md
```

纯静态站点，无构建步骤、无依赖、无外部字体与图标库（图标为内联 SVG）。

## 版式要点

- 顶栏最大宽 1280px，正文容器 925px，左侧栏占 21%（与参考站一致）。
- 配色取自参考站：正文 `#494e52`、次要文字 / 导航 `#7a8288`、链接 `#52adc8`、分隔线 `#f2f3f3`。
- 导航悬停为 4px 灰条由左向右展开。
- 768px 以下切换单栏，侧栏变为顶部名片；520px 以下摄影网格变单列。

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

- [ ] 侧栏头像：把 `assets/img/avatar.svg` 换成真人照片（建议 400×400 以上正方形，改 `index.html` 里的 `src` 与文件名）
- [ ] 顶部的姓名与简介文案（`index.html` 中 `.page__title` 与 `.page__content` 开头）
- [ ] 侧栏链接列表 `.author__urls`：可按需增删（如 ORCID、ResearchGate、X）
- [ ] 「研究」条目里的 `Code` 链接，目前统一指向 GitHub 仓库列表，建议改为具体仓库地址
- [ ] 「摄影」板块替换为真实照片，目前是 6 个占位位（见 `assets/art/README.md`）
- [ ] 联系方式的邮箱与社交链接
- [ ] 如需自定义域名，在仓库根目录添加 `CNAME` 文件

