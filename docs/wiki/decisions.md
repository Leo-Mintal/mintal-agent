# 重要决策

## 移除内测声明

2026-08-25，移除 `packages/client/ui-settings-models` 的 `welcome-notice` 引导步骤及其 `WelcomeNotice`、确认状态存储、语言文案和 `ui-onboarding` 设置命名空间。这样首次打开空会话时直接进入现有模型配置流程，不再阻塞用户阅读和确认内测声明。

## 保留官方 DeepSeek 提供方

当前 base bundle 默认模型为 `deepseek-official`，`llm-deepseek` 和 Web 的 DeepSeek 搜索路由也在组合层挂载；Models 页面仍使用官方提供方作为无凭证用户的可配置入口。它们是运行链路的一部分，不属于本次可安全删除的“仅品牌文案”遗留。未挂载或 dormant 的可选包应在确认产品需求后单独裁剪。

## 官方遗留审计

- **当前必需**：`packages/llm/llm-deepseek`、`packages/web/web-search-deepseek`、`deepseek-official` 默认模型和对应 Web Models 配置页面，均被 `packages/bundle/base/cordis.patch.yml` 或 `packages/bundle/web-app/cordis.patch.yml` 挂载。
- **当前可用但非默认路由**：`llm-pi-ai` 默认零路由，但 Models 页面明确支持 `llm-pi-ai` 配置，不能按“未默认启用”判定为死代码。
- **默认关闭的基础设施**：`session-telemetry-otel` 默认 `DISABLED`，只有显式设置 `DSH_TELEMETRY_MODE` 才发送；它不是内测声明，但属于可选部署能力，暂不删除。
- **已清理的无需求能力**：默认关闭的内置官方徽标 Skill 已删除；通用 `skill`、文件系统 Skill 和 `tool-skill` 保留。
- **未挂载的可选扩展**：E2B、LSP、MCP、Exa/Perplexity 搜索、Claude/Codex 子代理等未出现在默认 base/web patch 的运行行中；它们作为 workspace 包保留，删除需要另行确认是否要缩减发布面或 workspace。
- `assets/community-*` 仅被历史翻译快照文本提及，当前 Web/CLI 源码没有运行时引用；已从项目移除，历史翻译快照仍保留为测试 fixture。
