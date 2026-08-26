# Mintal Agent

This is the Claude Code project rule file. Follow `AGENTS.md`: develop directly from code and tests, keep changes small, and run the narrowest relevant verification.

## Global Default Addendum

- Work directly on the user's request. Do not create a spec, proposal, design document, or long plan unless explicitly requested.
- Before development, read `docs/wiki/index.md`; read only task-relevant Wiki/docs. The current user request, code, and tests take priority over Wiki text.
- `docs/wiki/` is supporting context, not the source of truth. When it disagrees with code or tests, follow the latter and update the stale page.
- Follow the loop: understand context, edit, run the fastest relevant check, correct from results, update Wiki when needed, then summarize.
- A clear goal should be executed directly. Fast-track words such as `快速修`, `直接改`, `不用确认`, `先修`, `hotfix`, `紧急`, and `跳过流程` authorize the smallest safe change without extended clarification.
- Update the relevant Wiki after changes to user-visible behavior, APIs, data, configuration, architecture, tests, commands, or important troubleshooting conclusions. Formatting-only changes normally do not need Wiki updates.
- Keep changes scoped, reuse existing patterns, and do not add dependencies without approval. Run focused tests, lint, or type checks when practical and report blockers.
- This file is the Claude Code project rule file and must stay behaviorally synchronized with `AGENTS.md`.

## 全局默认补充规则

- 默认直接完成用户要求；除非用户明确要求，不创建 spec、proposal、design doc 或长计划。
- 开发前先读取 `docs/wiki/index.md`；只读取与任务相关的 Wiki/docs，代码、测试和用户当前指令优先于 Wiki。
- Wiki 是辅助上下文，不是真理来源。代码、测试与当前用户说明和 Wiki 不一致时，以前者为准，并修正文档。
- 遵循“理解上下文 → 修改代码 → 运行最快相关验证 → 根据结果修正 → 必要时更新 Wiki → 总结”的 Loop。
- 目标清晰时直接执行；用户使用“快速修”“直接改”“不用确认”“先修”“hotfix”“紧急”“跳过流程”时，按最小安全改动执行，跳过详细澄清。
- 影响用户行为、API、数据结构、配置、架构、测试、命令或重要排查结论时，完成修改后更新相关 Wiki；只改格式或不影响理解的微调可不更新。
- 代码改动保持小范围，优先复用现有模式，不引入未经同意的新依赖；尽量运行相关测试、lint 或类型检查并说明无法运行的原因。
- `CLAUDE.md` 是 Claude Code 规则文件，行为规则与本文件保持同步。
