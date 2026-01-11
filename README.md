# 3x3 - 智能币圈分析平台

## 🚀 项目简介

3x3 是一个专业的加密货币分析平台，采用对话式AI助手为用户提供实时数据分析和投资建议。

### ✨ 主要特性

- 🤖 **智能AI助手**: 基于实时数据的对话式分析
- 📊 **多币种支持**: 支持BTC、ETH、SOL等主流币种
- 📈 **实时数据**: 价格、市值、交易量等关键指标
- 💡 **智能洞察**: 技术分析、市场情绪、风险评估
- 🌓 **明暗主题**: 支持明暗模式切换
- 📱 **响应式设计**: 完美适配各种设备

## 🛠️ 技术栈

- **前端框架**: React + TypeScript
- **样式**: Tailwind CSS v4
- **UI组件**: shadcn/ui + Radix UI
- **图标**: Lucide React
- **图表**: Recharts

## 🏃‍♂️ 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📁 项目结构

```
├── App.tsx                 # 主应用组件
├── components/
│   ├── CoinSelector.tsx    # 币种选择组件
│   ├── ConversationalAssistant.tsx  # AI对话助手
│   ├── LiveDataSidebar.tsx # 实时数据侧边栏
│   └── ui/                 # UI基础组件
├── styles/
│   └── globals.css         # 全局样式
└── package.json
```

## 🎯 核心功能

### 1. 币种选择
- 支持搜索和切换不同币种
- 显示实时价格和涨跌幅
- 热门币种快速选择

### 2. AI对话分析
- 自然语言交互
- 基于实时数据的智能分析
- 个性化投资建议

### 3. 实时数据展示
- 价格、市值、交易量等核心指标
- 技术指标分析
- 市场情绪监控
- 风险评估提醒

## 🔧 自定义配置

### 主题配置
在 `styles/globals.css` 中可以自定义颜色主题：

```css
:root {
  --primary: #030213;
  --background: #ffffff;
  /* 更多变量... */
}
```

### 添加新币种
在 `CoinSelector.tsx` 的 `popularCoins` 数组中添加新币种：

```typescript
{
  symbol: "NEW",
  name: "New Coin",
  price: "$100",
  change: "+5.0%",
  changeType: "positive",
  marketCap: "$1B",
  rank: 10
}
```

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

⚡ 由 Figma Make 强力驱动