# Mintal Agent Wiki

## 项目简介

这是一个以 pnpm workspace 组织的 Agent Harness 项目，提供 CLI、Web GUI、LLM/工具能力、会话持久化和可组合插件运行时。

## 主要模块索引

- [目录说明](directories.md)：所有可维护根目录、应用目录和 workspace 包的职责。
- [架构入口](architecture.md)：CLI、Web、Bundle、Host、Client 和能力包之间的关系。
- [开发约定](conventions.md)：源码、构建产物、测试和启动命令的约定。
- [重要决策](decisions.md)：已确认的产品边界和本次声明移除记录。
- `modules/`：按模块补充的短页面；当前没有比上述入口更细的已确认事实。

## 最近更新

- 2026-08-25：对话运行状态按会话等待状态区分“正在打工”和“等待吩咐”；等待用户回答问题时不显示运行计时。
- 2026-08-25：新增 `pnpm start`，以单一命令启动包含 Web 前端资源的服务端。
- 2026-08-25：移除缺失源码的 Web 浏览器/压测及文档站测试链路，修复 Landlock 沙箱的 TypeScript 基础配置；`pnpm run build:lib` 已恢复通过。
- 2026-08-25：移除 Web 首次进入时的内测/欢迎声明及 `ui-onboarding` 专属持久化链路，保留模型提供方配置引导。
- 2026-08-25：新增基于 workspace 清单和 `package.json` 的目录职责文档。
- 2026-08-25：核对 bundle 编译残留和可选扩展引用，修正 `mintal-*` 目录职责描述。
- 2026-08-25：移除无运行时引用的社区二维码和历史 `mintal-*` 编译残留，保留翻译测试快照。
- 2026-08-25：移除默认关闭且无本项目需求的内置徽标 Skill，保留通用 Skill 能力。
