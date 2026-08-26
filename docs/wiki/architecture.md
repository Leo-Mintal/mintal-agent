# 架构说明

## 运行入口

- `apps/cli` 提供 `dsh` 命令和 profile 启动。
- `apps/web` 是 Vite 构建入口；它不是独立可运行的 Vite 应用，Web GUI 由 `pnpm dsh web` 提供静态资源和 API。
- `pnpm run dev:web` 只负责监听并重建带 `dsh.client` 标记的客户端插件，通常与 `pnpm dsh web` 并行运行。

## 组合层

- `packages/bundle/base` 定义所有 profile 共用的 Cordis 插件组合。
- `packages/bundle/headless` 提供无 Host/HTTP/浏览器层的单次运行模式。
- `packages/bundle/web-app` 在 base 之上挂载 Web 静态资源、API、URL 和 Web surface prompt。
- `packages/extensions` 负责动态客户端/Host 插件加载与运行时检查。

## Client/Host 分工

- `packages/client/*` 提供浏览器侧状态、Slot、React UI 和 Web shell。
- `packages/host/*` 提供 API 代理、静态文件、Web server、目录选择和插件 inventory。
- `packages/core`, `packages/llm`, `packages/fs`, `packages/shell`, `packages/session` 等领域包通过 Cordis service seam 组合能力。

## 当前设置引导边界

`ui-settings-models` 仍注册 Models 页面和 `deepseek-official` API Key 配置引导；此前的 `welcome-notice` 内测声明已移除。`ui-onboarding` 不再注册、持久化或通过 API proxy 暴露。
