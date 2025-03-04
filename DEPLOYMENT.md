# 快速部署指南

## 环境要求
- Node.js (推荐 v18.0.0 或更高版本)
- npm (通常随 Node.js 一起安装)

## 部署步骤

1. **克隆项目**
   ```bash
   git clone <你的项目仓库地址>
   cd personal_blog
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **构建项目**
   ```bash
   npm run build
   ```

4. **启动项目**
   ```bash
   npm run start
   ```
   启动后，项目将在 http://localhost:3000 运行

## 常见问题排查

如果遇到依赖安装问题：
1. 清除 npm 缓存：
   ```bash
   npm cache clean --force
   ```
2. 删除 node_modules 文件夹和 package-lock.json，然后重新安装：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 开发模式

如果需要进行开发，可以使用开发模式启动项目：
```bash
npm run dev
```

## 部署检查清单

- [ ] Node.js 环境已安装
- [ ] 所有依赖安装成功
- [ ] 项目成功构建
- [ ] 项目能够正常启动
- [ ] 能够正常访问页面
