# DApp_01 — EtCoin 铸造前端（my-app）

本目录是 **DApp_01** 根仓库中的 **Web3 前端演示**（推送到 GitHub 后可在本段补充你的仓库主页链接）：通过浏览器连接钱包，与链上 **EtCoin（ERC-20）** 合约交互，完成代币铸造与余额展示。适合作为第一个 DApp 学习与上传到 GitHub 的示例项目。

> 智能合约源码位于仓库根目录的 `contracts/`（Foundry + OpenZeppelin），本应用通过 `ethers.js` 调用已部署合约。

## 功能概览

- 使用 **MetaMask**（或兼容 `window.ethereum` 的钱包）连接账户
- 输入数量后调用合约 **`mint`**，向**合约 Owner 地址**铸造代币（见下方「重要说明」）
- 轮询读取当前连接地址的 **EtCoin 余额** 并展示

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [Next.js](https://nextjs.org/) 15（App Router） |
| UI | [React](https://react.dev/) 19、[Tailwind CSS](https://tailwindcss.com/) 3 |
| 链交互 | [ethers.js](https://docs.ethers.org/v5/) v5 |
| 合约 | EtCoin：`ERC20` + `Ownable`（OpenZeppelin），`mint` / `burn` 均为 `onlyOwner` |

## 目录结构（与本前端相关）

```
my-app/
├── app/                 # Next.js 页面与布局
│   ├── layout.js
│   └── page.js          # 首页：导航栏 + 铸造组件
├── components/
│   ├── navbar.js        # 钱包连接
│   └── ercmint20.js     # 铸造与余额逻辑
├── EtCoin.json          # 合约 ABI（与链上字节码需一致）
├── public/              # 静态资源
└── package.json
```

## 环境要求

- **Node.js** 18+（建议使用 LTS）
- 浏览器安装 **MetaMask** 等 Web3 钱包
- 钱包网络需与**你配置的合约部署网络**一致（例如 Sepolia 测试网；导航栏内预留了 Sepolia 链参数，可按需在连接流程中启用切换网络）

## 本地运行

```bash
cd my-app
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

其他脚本：

```bash
npm run build   # 生产构建
npm run start   # 启动生产服务（需先 build）
npm run lint    # ESLint
```

## 配置已部署合约

当前合约地址写在 `components/ercmint20.js` 的 `ContractAddress` 常量中。若你自行部署了新的 EtCoin：

1. 在仓库 `contracts/` 下编译并部署，取得新地址。
2. 将 `components/ercmint20.js` 中的 `ContractAddress` 改为新地址。
3. 用 Foundry 编译产物中的 ABI 更新根目录下的 `EtCoin.json`（或从 `out/EtCoin.sol/EtCoin.json` 提取 `abi` 字段），保证与链上合约一致。

## 重要说明（Owner 与 mint）

链上 `EtCoin` 的 `mint` 为 **`onlyOwner`**：只有**部署时指定的 Owner 地址**能成功调用 `mint`。

- 若你用自己的钱包部署且 Owner 为自己，用**同一地址**在页面连接钱包后即可铸造。
- 若连接的是普通用户地址，而 Owner 为其他地址，交易将因权限失败。本仓库内嵌的演示地址仅供学习；**推送到 GitHub 前请按需替换为你的合约地址**，避免他人误用。

## 与仓库其他部分的关系

- **`../contracts/`**：Solidity 合约 `EtCoin.sol`、Foundry 测试与部署脚本。
- 完整 DApp 体验 = 部署合约 + 配置本前端地址与 ABI + 在对应网络上连接钱包。

## 开源与许可

合约与依赖库请遵循各自 **SPDX / LICENSE**；前端可按你的仓库统一选择许可证（例如 MIT）。上传 GitHub 时建议将 `node_modules/` 加入 `.gitignore`，勿提交私钥与 `.env` 中的 RPC 密钥。

---

