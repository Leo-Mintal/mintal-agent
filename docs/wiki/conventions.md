# 开发约定

- 包源码在各 package 的 `src/`，测试在 `tests/`；先改源码，不直接改 `lib/`、`types/` 或 `dist/`。
- 根目录使用 pnpm 11 workspace；安装依赖用 `pnpm install`。
- 快捷启动（前后端）：`pnpm start`，默认打开 `http://127.0.0.1:3080`。客户端插件监听：`pnpm dev:web`。
- Web 前端构建：`pnpm run build:web`。仓库当前没有独立的 Web 浏览器/压测测试链路，不应调用已移除的 `test:web*` 命令。
- `pnpm run build:lib` 会检查并构建 Host 与 Client 库；Linux Landlock 沙箱的 TypeScript 配置在 `native/landlock-run/tsconfig.base.json`，属于实际运行依赖，不可按测试残留删除。
- 客户端 Slot 目录清单由 `pnpm run gen-client-catalog` 生成，并由 `pnpm run verify-client-catalog` 校验新鲜度。
- 用户可见行为、API、配置或重要排查结论变化后，更新 `docs/wiki/` 中的相关页面。
- `package.json` 的 description、exports、dependencies 和 `dsh` manifest 是包边界的事实来源。
