# 目录说明

本文按当前源码和 `package.json` 生成，记录可维护目录的职责。依赖目录（`node_modules`）、构建产物（`lib`、`dist`、`types`）和临时缓存不逐项展开；它们不是业务源码，不应直接修改。

## 根目录

| 目录 | 用途 |
| --- | --- |
| `apps/` | 可执行应用入口：CLI 与 Web 前端。 |
| `assets/` | 项目运行或文档使用的静态图片资源。 |
| `docs/` | 项目 Wiki 与维护文档。 |
| `native/` | 原生辅助程序及按平台拆分的包。 |
| `packages/` | 按领域组织的 pnpm workspace 包，主体代码所在处。 |
| `patches/` | 第三方依赖的本地补丁。 |
| `scripts/` | 构建、校验、生成、测试与发布脚本。 |
| `vendor/` | 供应商源码（当前包含 Cordis 及其配套包）。 |

## 应用与原生

| 目录 | 用途 |
| --- | --- |
| `apps/cli/` | dsh CLI: profile boot, plugin management, and the browser UI alias |
| `apps/cli/config/` | 该应用/原生模块的子包。 |
| `apps/cli/reference/` | 该应用/原生模块的子包。 |
| `apps/cli/src/` | 该应用/原生模块的子包。 |
| `apps/web/` | Web application entry: vite build over the @deepseek-ai/dsh-client-web shell library; dist/ served by apps/cli's dsh web |
| `apps/web/public/` | 该应用/原生模块的子包。 |
| `apps/web/src/` | 该应用/原生模块的子包。 |
| `apps/web/stress-tests/` | 该应用/原生模块的子包。 |
| `native/landlock-run/` | 原生模块目录。 |
| `native/landlock-run/packages/` | 该应用/原生模块的子包。 |

## Workspace 包

每个 `packages/<领域>/<包名>/` 都是一个独立 workspace 包：`src/` 是源码，`tests/` 是对应测试（若存在），`package.json` 是导出和依赖边界，`tsdown.config.ts`/`tsconfig*.json` 是构建类型配置。下面列出所有领域和包的当前职责。

### `packages/acp/`

| 包目录 | 职责 |
| --- | --- |
| `packages/acp/acp/` | Automation-only Agent Client Protocol server for driving DeepSeek Harness agents over JSON-RPC stdio |

### `packages/api/`

| 包目录 | 职责 |
| --- | --- |
| `packages/api/gateway/` | Typert Remote Host dispatcher and Client API endpoint |
| `packages/api/remotes/` | Remote BFF assembly and Host Agent/Session lookup policy |

### `packages/attachment/`

| 包目录 | 职责 |
| --- | --- |
| `packages/attachment/attachment/` | Durable immutable attachment storage seam for the DeepSeek Harness |
| `packages/attachment/attachment-local/` | Private content-addressed DSH_HOME attachment storage |

### `packages/boot/`

| 包目录 | 职责 |
| --- | --- |
| `packages/boot/app-boot/` | Shared boot glue for the app bins: .env loading, fail-loud Loader guards, snapshot-aware config resolution, and the Loader boot sequence |
| `packages/boot/cmdline/` | Immutable command-line handoff from a dsh launcher to any app plugin that injects cmdlineArgs |

### `packages/bundle/`

| 包目录 | 职责 |
| --- | --- |
| `packages/bundle/base/` | The shared dsh core as a profile bundle: every profile's first patch layer, inserting the base plugin rows over the empty profile root |
| `packages/bundle/headless/` | The dsh one-shot bundle: a direct core Agent/Session runner over dsh-base with no Host, HTTP, or browser layer |
| `packages/bundle/web-app/` | The dsh browser-surface bundle: the web patch layer over dsh-base plus the runtime glue plugin (frontend dist serving, web-surface prompt, bash runtime variables, URL line) |

### `packages/client/`

| 包目录 | 职责 |
| --- | --- |
| `packages/client/connection/` | Wire consumer layer: HTTP-up/WebSocket-down client, ConnectionController dual streams with reconnect, and fixture api |
| `packages/client/hmr/` | Dev-only hot-reload driver for script-loaded client entries: SSE rebuilt frames → invalidate/prefetch → fiber swap through the vendored Loader entry |
| `packages/client/locale/` | Locale plugin: Host-backed zh/en preference, browser-derived fallback, locale snapshots, and typed namespace dictionaries |
| `packages/client/modules/` | Client module system, dual-face: node half composes the __DSH_BOOT__ entry graph (incremental dsh.client scan, bundle route, index tap, webPlugins service); browser half is the lazy-CJS module table the vendored cordis Loader consumes as its internal seam |
| `packages/client/runtime/` | Client core services: SlotRegistry, SessionRuntime (scope tree + object layer) |
| `packages/client/schema-form/` | Schema/draft model layer for settings editors: rehydrates a serialized schemastery schema, validates drafts, and edits them immutably by path |
| `packages/client/ui-agent-preset/` | Agent-preset surfaces: the default for later sessions, this session's seat, and the composition editor |
| `packages/client/ui-attachment/` | Pure React attachment atoms for the dsh web UI: draft-image rail, message image gallery, and original-image lightbox (zero cordis) |
| `packages/client/ui-commands/` | Client command surface: global directory cache, '/' source, three command UI kinds, popupSelect registry |
| `packages/client/ui-conversation/` | Conversation domain: skeleton, ordered chat flow, composer with the Host-backed busy-Enter preference, and details host |
| `packages/client/ui-deliverables/` | Produced-files turn tail and clickable final-response file references for Web |
| `packages/client/ui-directory-picker-browse/` | In-app directory browsing surface: the workspace directory-flow owner rendering the host's listing and creation primitives |
| `packages/client/ui-directory-picker-native/` | Native directory-picker surface: the renderless workspace directory-flow occupant driving the host's OS chooser |
| `packages/client/ui-goal/` | Session goal surface: GoalBar docked above the composer, read from the goal session projection |
| `packages/client/ui-input-trigger/` | Input trigger pipeline: '/' and '@' detection, candidate menu, pick routing to registered sources |
| `packages/client/ui-jobs/` | Session-header background-job list: live registry state mirrored from session/jobs frames |
| `packages/client/ui-layout/` | Shell plugin: three-column AppFrame with drag handles, ctx.layout viewing-state service (navigation + panels) |
| `packages/client/ui-message-feedback/` | Per-message feedback controls contributed to the assistant-message action strip, backed by the messageFeedback Host Remote |
| `packages/client/ui-model-selection/` | Model selection: the /model popupSelect over session.models / session.selectModel |
| `packages/client/ui-permission-presets/` | Permission surfaces: a new-session default in General settings and a current-session /permission popup over the permissions projection |
| `packages/client/ui-plan/` | Plan-mode composer control: the conversation.input.plan seat over the plan projection and the /plan command channel |
| `packages/client/ui-primitives/` | Pure React atoms for the dsh web UI: controls, icons, markdown, and JSON inspectors (zero cordis) |
| `packages/client/ui-settings/` | Settings domain base plugin: the settings-namespace scope service and the canonical settings slot-type contract |
| `packages/client/ui-settings-general/` | Settings ownerless-copy plugin: the General section, shell trigger/header chrome content, and settings dictionaries |
| `packages/client/ui-settings-models/` | Models settings and provider onboarding over existing settings and credential joins |
| `packages/client/ui-settings-plugin-inventory/` | Read-only Cordis Loader inventory tab in Web Plugins settings |
| `packages/client/ui-settings-plugins/` | Plugins settings section with feature-owned tabs and configurable host-plane plugin cards |
| `packages/client/ui-sidebar/` | Sidebar plugin: session multi-level tree, search, grouping, state dots |
| `packages/client/ui-skill/` | Web skill references and the dedicated skill tool row |
| `packages/client/ui-slots/` | Slot registry pure core: SlotMap declaration merging, single register composition API, four-share props types, store-seat types, renderer install seam |
| `packages/client/ui-subagent/` | Subagent conversation catalog, continuation routing UI, and '@' reference source |
| `packages/client/ui-task/` | 提供 ui-task 相关能力。 |
| `packages/client/ui-theme/` | Theme plugin: Host bootstrap for the pre-plugin palette; DOM-free ThemeRuntime for light/dark/system state; --dsw-* token styles and Appearance settings row |
| `packages/client/ui-tool/` | Client Tool call-tree renderer and keyed per-tool presentation slot |
| `packages/client/ui-trajectory/` | Trajectory event ledger with an interactive timing overview: pure-consumer plugin registering into the conversation ViewMap (no service) |
| `packages/client/ui-user-questions/` | Web ask_user_question feature: host tool mount plus composer-takeover question UI |
| `packages/client/ui-workflow-run/` | Durable workflow-run Conversation Node and nested member disclosure for dsh web |
| `packages/client/ui-workspace/` | Workspace picker plugin: one WorkspacePicker registered into the sidebar and empty-state workspace slots |
| `packages/client/web/` | Web shell kernel: bootWebShell (module system holding + seed table + two-stage boot + AppRoot gate + app-shell assembly entry), consumed by the apps/web vite entry |
| `packages/client/web-react/` | Shell-side React glue: createSlotRenderer, SessionProvider, bindSnapshotSelector (uSES bridge), useInvoke |

### `packages/code-runtime/`

| 包目录 | 职责 |
| --- | --- |
| `packages/code-runtime/code-runtime/` | Abstract code-execution seam (ctx.codeRuntime) for the DeepSeek Harness |
| `packages/code-runtime/code-runtime-worker-thread/` | Worker-thread implementation of the DeepSeek Harness code-execution seam |

### `packages/compaction/`

| 包目录 | 职责 |
| --- | --- |
| `packages/compaction/command-compact/` | Human-facing slash command for explicit session compaction |
| `packages/compaction/compaction/` | Abstract compaction service seam (ctx.compaction) for the DeepSeek Harness |
| `packages/compaction/compaction-basic/` | Token-meter-driven compaction policy and LLM summarization backend for the DeepSeek Harness |
| `packages/compaction/compaction-tool-result-pruner/` | Replay-safe model-free head/middle/tail pruning for tool-result surface nodes |

### `packages/context/`

| 包目录 | 职责 |
| --- | --- |
| `packages/context/agent-instructions/` | Workspace context loader for AGENTS.md/CLAUDE.md instruction files |
| `packages/context/session-reference/` | Cross-session snapshot references and durable untrusted model context (ctx.sessionReferenceResolver) |
| `packages/context/time-context/` | Opt-in durable per-step context with the current time and elapsed time |
| `packages/context/tmux-context/` | Opt-in durable per-step context with this agent's tmux pane and window location |

### `packages/core/`

| 包目录 | 职责 |
| --- | --- |
| `packages/core/agent/` | Agent interface, registry, initiator scope, and event vocabulary for the DeepSeek Harness |
| `packages/core/agent-default-model/` | Default model selection shared by Agent entry points |
| `packages/core/agent-loop/` | The concrete agent loop plugin for the DeepSeek Harness |
| `packages/core/agent-tool-presentation/` | Agent-plane presentation selector: composes one agent's tools as Code Mode, native, or both |
| `packages/core/scope/` | Scoped-context registration primitive (scope tags, scope-filtered event dispatch) for the DeepSeek Harness |
| `packages/core/session/` | Event-sourced session store for the DeepSeek Harness |
| `packages/core/system-prompt/` | System prompt assembly registry for the DeepSeek Harness |
| `packages/core/tools/` | Tool registry and execution pipeline for the DeepSeek Harness |

### `packages/credentials/`

| 包目录 | 职责 |
| --- | --- |
| `packages/credentials/credentials/` | Abstract credential seam (ctx.credentials): settings carry references to secrets, providers own the values |
| `packages/credentials/credentials-local/` | File-backed credentials provider ($DSH_HOME/.env under the live process environment) for the DeepSeek Harness |

### `packages/e2b/`

| 包目录 | 职责 |
| --- | --- |
| `packages/e2b/e2b/` | Shared E2B sandbox lifecycle for DeepSeek Harness provider adapters |
| `packages/e2b/fs-e2b/` | E2B filesystem implementation for DeepSeek Harness |
| `packages/e2b/subprocess-e2b/` | E2B subprocess implementation for DeepSeek Harness |

### `packages/extensions/`

| 包目录 | 职责 |
| --- | --- |
| `packages/extensions/cordis-client-runner/` | Browser half of dynamic dual-half plugin packages: event subscription, closure evaluation, guard facade, and loader entries |
| `packages/extensions/cordis-host-runner/` | Dynamic package definition registry, host-half sandbox lifecycle, and invoke handler table for model-mounted dual-half packages |
| `packages/extensions/tool-cordis/` | Self-referential cordis toolset: inspect the live runtime, mount and dispose model-written plugins |
| `packages/extensions/ui-cordis/` | Cordis dynamic-plugin definition card: the keyed cordis_define tool row with its run/stop switch |

### `packages/feedback/`

| 包目录 | 职责 |
| --- | --- |
| `packages/feedback/command-feedback/` | Log-only session feedback producer and human-facing slash command |
| `packages/feedback/message-feedback/` | Lifecycle-bound per-message rating and note sidecar for the DeepSeek Harness |

### `packages/fs/`

| 包目录 | 职责 |
| --- | --- |
| `packages/fs/fs/` | Abstract filesystem capability seam (ctx.fs) for the DeepSeek Harness — vocabulary types, the FileSystem service (text IO + optional version-guarded atomic mutations), and the fs/* policy event vocabulary |
| `packages/fs/fs-local/` | Local-filesystem implementation of the DeepSeek Harness filesystem seam (ctx.fs) |
| `packages/fs/fs-observation-policy/` | File-context policy plugin for the DeepSeek Harness — observed-state, read-before-edit, and version-guarded write/edit added over the ctx.fs provider seam through the fs/* event gate (no service API) |
| `packages/fs/fs-sandbox/` | Sandbox-enforcing implementation of the DeepSeek Harness filesystem seam: fences write/edit by the per-call sandbox mode (read-only denies mutation, workspace-write contains it to the workspace + temp roots) while reads pass through |
| `packages/fs/tool-fs/` | Model-facing filesystem tools (read, write, edit) over the DeepSeek Harness filesystem seam (ctx.fs) |
| `packages/fs/tool-fs-search/` | Model-facing filesystem discovery tools (glob, grep) backed by the packaged ripgrep binary (@vscode/ripgrep) |
| `packages/fs/tool-str-replace-editor/` | Model-facing view, create, literal replace, and line insert tool over the Harness filesystem service |

### `packages/goal/`

| 包目录 | 职责 |
| --- | --- |
| `packages/goal/command-goal/` | Human-facing slash command for persisted same-session goals |
| `packages/goal/goal/` | Event-sourced same-session goal state and lifecycle service for the DeepSeek Harness |
| `packages/goal/goal-round-driver/` | Race-fenced same-session goal-round driver |
| `packages/goal/tool-goal/` | Model-facing same-session goal tools with execution-time authority checks |

### `packages/guard/`

| 包目录 | 职责 |
| --- | --- |
| `packages/guard/repeat-tool-reminder/` | Repeat-tool-call guard plugin: advisory reminders when an agent loops on identical tool calls |
| `packages/guard/timeout-policy/` | Tool-call timeout policy: a tools/execute wrapper that arms a per-tool deadline on exec.signal and returns TOOL_TIMEOUT when it wins |

### `packages/hooks/`

| 包目录 | 职责 |
| --- | --- |
| `packages/hooks/hook-protocol/` | Shared Claude Code / Codex hook wire protocol: matcher engine, stdin/exit-code/stdout codec, multi-hook merge, and hook/* session events |
| `packages/hooks/hooks-claude-code/` | Bridge plugin: run a Claude Code hooks.json / settings hook config on the DeepSeek Harness interception seams |
| `packages/hooks/hooks-codex/` | Bridge plugin: run a Codex hooks.json hook config on the DeepSeek Harness interception seams |

### `packages/host/`

| 包目录 | 职责 |
| --- | --- |
| `packages/host/apiproxy/` | API gateway: the ApiProxy contract (api/), the fetch carrier pair (fetch/), and the host-side gateway plugin providing ctx.apiProxy |
| `packages/host/directory-picker/` | Abstract workspace-directory picking seam (ctx.directoryPicker) for the DeepSeek Harness web GUI host |
| `packages/host/directory-picker-auto/` | Adaptive chooser of the directory-picker seam: resolves the host situation at boot and mounts the native or browse backend for the DeepSeek Harness web GUI host |
| `packages/host/directory-picker-browse/` | In-app browsing backend of the directory-picker seam (listing/creation primitives over the host filesystem) |
| `packages/host/directory-picker-native/` | Native-OS-chooser backend of the directory-picker seam for the DeepSeek Harness web GUI host |
| `packages/host/frontend-static/` | SPA dist server for the Web shell: owns the webserver fallback seat, serving the built frontend with index-tap injection, traversal rejection, and SPA index fallback |
| `packages/host/plugin-inventory/` | Read-only Remote projection of current Cordis Loader plugin state |
| `packages/host/webserver/` | Web route-registration plugin: HTTP and upgrade routes, index transform taps, and static dist fallback; knows no harness concepts |

### `packages/identity/`

| 包目录 | 职责 |
| --- | --- |
| `packages/identity/anonymous-user-id/` | Shared anonymous user identity for DeepSeek Harness telemetry and feedback correlation |

### `packages/interaction/`

| 包目录 | 职责 |
| --- | --- |
| `packages/interaction/commands/` | Plugin-owned human command registry for DeepSeek Harness UIs |
| `packages/interaction/permission-presets/` | User-facing permission presets (ctx.permissionPresets) for the DeepSeek Harness: one product-level Permissions select bundling the sandbox-mode and approval-policy knobs, written through to their own session events |
| `packages/interaction/tool-ask-user/` | Model-facing ask_user_question tool over the ctx.userQuestions seam |
| `packages/interaction/user-approval/` | User-approval seam (ctx.approval) for the DeepSeek Harness: one-shot permission decisions dispatched to composed answerers over the approval/request waterfall, fail-closed by default |
| `packages/interaction/user-questions/` | Abstract user-questions seam (ctx.userQuestions) for asking the human during agent runs |

### `packages/jobs/`

| 包目录 | 职责 |
| --- | --- |
| `packages/jobs/jobs/` | Background job registry (ctx.jobs) for the DeepSeek Harness — shared ids, owner isolation, polling, cancellation, and completion listeners for long-running tool work |
| `packages/jobs/jobs-local/` | Process-local implementation of the DeepSeek Harness background job registry seam |
| `packages/jobs/tool-jobs/` | Model-facing background job control tools (job_output, job_list, job_kill) over the ctx.jobs registry |

### `packages/llm/`

| 包目录 | 职责 |
| --- | --- |
| `packages/llm/llm/` | Provider-neutral LLM service interface for the DeepSeek Harness |
| `packages/llm/llm-deepseek/` | DeepSeek chat-completions adapter for the DeepSeek Harness LLM seam |
| `packages/llm/llm-pi-ai/` | pi-ai-backed DeepSeek adapter for the DeepSeek Harness LLM seam (design-verification twin of dsh-llm-deepseek) |
| `packages/llm/llm-retry/` | Provider-routed LLM request retry policy for the DeepSeek Harness |
| `packages/llm/token-meter/` | Replay-aware token measurement service (ctx.tokenMeter) for the DeepSeek Harness |

### `packages/lsp/`

| 包目录 | 职责 |
| --- | --- |
| `packages/lsp/lsp/` | Abstract LSP capability seam (ctx.lsp) for the DeepSeek Harness — language-server provider registry keyed by branded id and extension mapping, order-independent per-query selection, normalized definition/references/implementation/hover requests and results, and the LspError taxonomy |
| `packages/lsp/lsp-stdio/` | Generic stdio language-server provider for the DeepSeek Harness LSP capability seam (ctx.lsp) — spawns configured servers, translates JSON-RPC, and serves transient-open goToDefinition/findReferences/goToImplementation/hover queries in the host filesystem namespace |
| `packages/lsp/tool-lsp/` | Model-facing lsp tool over the DeepSeek Harness LSP capability seam (ctx.lsp) — one read-only tool with goToDefinition/findReferences/goToImplementation/hover operations, one-based UTF-16 cursor coordinates, bounded location rendering, and hover normalization |

### `packages/mcp/`

| 包目录 | 职责 |
| --- | --- |
| `packages/mcp/mcp-client/` | MCP client bridge: connects to MCP servers and registers their tools on ctx.tools |

### `packages/plan/`

| 包目录 | 职责 |
| --- | --- |
| `packages/plan/plan-mode/` | Logged per-agent plan mode with deployment guidance, a direct slash command, and a user-reviewed exit |

### `packages/preset/`

| 包目录 | 职责 |
| --- | --- |
| `packages/preset/agent-presets/` | Per-session agent composition from preset cordis.yml files for the DeepSeek Harness |
| `packages/preset/persona/` | Composition-authored deployment persona section for the DeepSeek Harness |

### `packages/runtime-diagnostics/`

| 包目录 | 职责 |
| --- | --- |
| `packages/runtime-diagnostics/invariants/` | Registry service for package-owned DeepSeek Harness runtime invariants |

### `packages/sandbox/`

| 包目录 | 职责 |
| --- | --- |
| `packages/sandbox/sandbox/` | Abstract process-sandbox seam (ctx.sandbox) for the DeepSeek Harness: same-world confinement vocabulary and the SandboxProvider contract |
| `packages/sandbox/sandbox-local/` | Local process-sandbox backends for the DeepSeek Harness sandbox seam: bwrap, the npm-distributed landlock-run launcher, macOS Seatbelt, or the Windows ACL restricted-token runner — functionally probed, fail-closed |
| `packages/sandbox/sandbox-policy/` | Per-call sandbox policy resolver and current model context: deployment fallbacks plus each session's mode and workspace root, shared by every enforcing capability family |
| `packages/sandbox/sandbox-windows-acl/` | Windows ACL write-restriction sandbox backend (restricted-token spawn with capability-SID write allowlist) for the DeepSeek Harness sandbox seam |

### `packages/schedule/`

| 包目录 | 职责 |
| --- | --- |
| `packages/schedule/schedule/` | Agent-scoped durable after, at, and fixed-rate reminders over the session event log |

### `packages/sdk/`

| 包目录 | 职责 |
| --- | --- |
| `packages/sdk/client/` | TypeScript client SDK for driving a DeepSeek Harness runtime subprocess over stdio JSON-RPC: the DeepSeekHarness high-level turns API and the lower-level HarnessClient |
| `packages/sdk/protocol/` | Shared wire protocol for the DeepSeek Harness SDK runtime: the newline-delimited JSON-RPC stdio transport and the named request, result, and notification types spoken between the runtime server and SDK clients |
| `packages/sdk/server/` | Stdio JSON-RPC server plugin for out-of-process DeepSeek Harness SDK clients |

### `packages/session/`

| 包目录 | 职责 |
| --- | --- |
| `packages/session/session-checkpoint-policy/` | Semantic session durability checkpoints before model requests and tool side effects |
| `packages/session/session-persistence/` | Abstract durable session persistence seam (ctx.sessionPersistence) for the DeepSeek Harness |
| `packages/session/session-persistence-jsonl/` | JSONL durable session persistence backend for the DeepSeek Harness |
| `packages/session/session-persistence-sqlite/` | SQLite durable session persistence backend for the DeepSeek Harness |
| `packages/session/session-projection/` | Session-projection seam: the merge-extensible projection type table, the provider contract, and the ctx.sessionProjections registry serving whole current values of log-derived per-session state |
| `packages/session/session-projection-cache/` | Persisted projection cache (ctx.sessionProjectionCache): durable per-session projection checkpoints over the domain data form, throttled write-behind, and the cold-read ladder (cache row + persistence tail replay) |
| `packages/session/session-stats/` | Whole-log conversation counts and wall times projection (sessionStats) for the DeepSeek Harness |
| `packages/session/session-telemetry/` | SessionTelemetryBackend seam for the DeepSeek Harness: session-event capture, projection, redaction, and handoff to a reporting backend |
| `packages/session/session-telemetry-otel/` | OpenTelemetry backend for the DeepSeek Harness telemetry seam: hands captured session records to the OTel JS SDK's log pipeline |
| `packages/session/session-title/` | Log-backed session title service and provider registry for the DeepSeek Harness |
| `packages/session/session-title-all-prompts-llm/` | All-user-messages LLM provider plugin for DeepSeek Harness session titles |
| `packages/session/session-title-first-prompt-llm/` | First-message LLM provider plugin for DeepSeek Harness session titles |
| `packages/session/session-title-llm/` | Shared LLM generation policy for DeepSeek Harness session-title providers |

### `packages/session-query/`

| 包目录 | 职责 |
| --- | --- |
| `packages/session-query/session-log-export/` | Web Session-log export command and shared download dialog |
| `packages/session-query/session-query/` | Combined session query service contract with concrete reads, traces, and filters |
| `packages/session-query/session-query-sqlite/` | Concrete ctx.sessionQuery backend with SQLite FTS5 search |
| `packages/session-query/tool-session-query/` | Workspace-authorized model-facing session history search, trace, and event read tools |

### `packages/settings/`

| 包目录 | 职责 |
| --- | --- |
| `packages/settings/settings/` | Abstract user-settings seam (ctx.settings) for the DeepSeek Harness |
| `packages/settings/settings-file/` | File-backed settings provider (settings.yaml) for the DeepSeek Harness |

### `packages/shell/`

| 包目录 | 职责 |
| --- | --- |
| `packages/shell/bash-local/` | Local-subprocess implementation of the DeepSeek Harness bash executor seam |
| `packages/shell/bash-sandbox/` | Sandbox-consuming implementation of the DeepSeek Harness bash executor seam (confines every command via ctx.sandbox, reports denial/enforcement result facts) |
| `packages/shell/pwsh-local/` | Local PowerShell implementation of the DeepSeek Harness bash executor seam |
| `packages/shell/pwsh-sandbox/` | Sandbox-consuming implementation of the DeepSeek Harness PowerShell executor seam (confines every command via ctx.sandbox, reports denial/enforcement result facts) |
| `packages/shell/shell/` | Abstract bash executor seam (ctx.shell) for the DeepSeek Harness |
| `packages/shell/shell-env/` | Tool-independent managed DSH_* shell environment registry |
| `packages/shell/tool-bash/` | Model-facing bash tool with optional generic background-job and sandbox-escalation support |
| `packages/shell/tool-bash-persistent/` | Model-facing owner-scoped persistent Bash tool backed by the Harness PTY service |
| `packages/shell/tool-pwsh/` | Model-facing pwsh tool over the bash executor seam |

### `packages/skill/`

| 包目录 | 职责 |
| --- | --- |
| `packages/skill/skill/` | Agent skill provider registry for the DeepSeek Harness |
| `packages/skill/skill-filesystem/` | Local filesystem skill provider for the DeepSeek Harness |
| `packages/skill/tool-skill/` | Model-facing skill loading tool for the DeepSeek Harness |

### `packages/spill/`

| 包目录 | 职责 |
| --- | --- |
| `packages/spill/spill/` | Abstract spill storage seam (ctx.spillStore) for the DeepSeek Harness — save oversized tool text and return a retrieval locator |
| `packages/spill/spill-local/` | Local-filesystem implementation of the DeepSeek Harness spill storage seam (private session-scoped files) |
| `packages/spill/spill-policy/` | Tool-result spill policy for the DeepSeek Harness — replaces oversized plain-text tool results with a retained preview plus a spill-file path (no service API) |

### `packages/storage/`

| 包目录 | 职责 |
| --- | --- |
| `packages/storage/storage/` | Storage hub (ctx.storage): named backend registry plus mounted data-form facilities for the DeepSeek Harness |
| `packages/storage/storage-domain/` | Domain data form (ctx.storage.domain): schema-validated, event-emitting KV domains over storage backends for the DeepSeek Harness |
| `packages/storage/storage-json/` | JSON file KV storage backend for the DeepSeek Harness storage hub |
| `packages/storage/storage-sqlite/` | SQLite storage backend (kv facet) for the DeepSeek Harness storage hub |

### `packages/subagent/`

| 包目录 | 职责 |
| --- | --- |
| `packages/subagent/subagent/` | Abstract subagent seam (ctx.subagents): named-provider registry for delegating to child agents |
| `packages/subagent/subagent-acp/` | Out-of-process ACP subagent backend: drives a child agent in a spawned subprocess over the Agent Client Protocol |
| `packages/subagent/subagent-claude-code/` | One-shot Claude Code subagent provider over the official Agent SDK |
| `packages/subagent/subagent-codex/` | One-shot Codex subagent provider over the official app-server protocol |
| `packages/subagent/subagent-dsh-sdk/` | Out-of-process SDK subagent backend: drives a child DeepSeek Harness runtime subprocess over stdio JSON-RPC through the TypeScript SDK client |
| `packages/subagent/subagent-fork-in-process/` | In-process fork subagent backend: runs a child agent seeded with a prefix of the parent's log |
| `packages/subagent/subagent-in-process-driver/` | Shared in-process subagent run driver: drives a child agent on ctx.agents (used by the spawn and fork backends) |
| `packages/subagent/subagent-spawn-in-process/` | In-process spawn subagent backend: runs a fresh child agent on ctx.agents |
| `packages/subagent/tool-subagent/` | Model-facing subagent delegation tool over the ctx.subagents seam |
| `packages/subagent/tool-subagent-control/` | Globally named send_message, interrupt_agent, and list_agents tools over ctx.subagents continuations |
| `packages/subagent/tool-subagent-report/` | Child-scoped report tool over ctx.subagents continuations |

### `packages/subprocess/`

| 包目录 | 职责 |
| --- | --- |
| `packages/subprocess/subprocess/` | Subprocess seam (ctx.subprocess) for the DeepSeek Harness — managed process groups, bounded spill-backed output, and escalated kills behind one abstract service |
| `packages/subprocess/subprocess-local/` | Local-subprocess implementation of the DeepSeek Harness subprocess seam |

### `packages/terminal/`

| 包目录 | 职责 |
| --- | --- |
| `packages/terminal/terminal/` | Persistent PTY session seam for the DeepSeek Harness — owner-scoped ids, backend registry, interactive sends, reads, signals, and awaited cleanup |
| `packages/terminal/terminal-bash/` | Persistent shell PTY backend over the DeepSeek Harness subprocess terminal primitive |
| `packages/terminal/tool-terminal/` | Six model-facing persistent PTY tools with owner isolation and generic background-job integration |

### `packages/test-support/`

| 包目录 | 职责 |
| --- | --- |
| `packages/test-support/acp-snapshot/` | ACP test kit: shared subprocess launcher, snapshot scenario harness, expected-output normalizers, and suite factory |
| `packages/test-support/agent-loop-testkit/` | Shared prerequisite mounting for tests that exercise the concrete agent loop |
| `packages/test-support/client-runtime/` | jsdom slot test runtime: real Cordis Context + SlotRegistry + web-react renderer with test-owned session/workspace doubles for feature specs |
| `packages/test-support/llm-mock-server/` | Scriptable OpenAI-compatible HTTP/SSE fault server for LLM recovery tests |
| `packages/test-support/llm-replay/` | Replay LLM plugin: short-circuits llm/stream with model chunks reconstructed from a recorded session JSONL (keyless snapshot tests) |
| `packages/test-support/loader-smoke/` | Shared subprocess and direct-agent harness for keyless real-Loader example smoke tests |

### `packages/todo/`

| 包目录 | 职责 |
| --- | --- |
| `packages/todo/tool-todo/` | Model-facing todo_write tool over the DeepSeek Harness event-sourced session log |

### `packages/typert/`

| 包目录 | 职责 |
| --- | --- |
| `packages/typert/generator/` | TypeScript project analyzer and model-driven Typert artifact generator |
| `packages/typert/loader/` | Loader integration for generated Typert package contributions |
| `packages/typert/protocol/` | Compiler-independent Remote metadata and Typert provider protocols |
| `packages/typert/registry/` | Runtime registry for generated package reflection and Zod schemas |

### `packages/util/`

| 包目录 | 职责 |
| --- | --- |
| `packages/util/atomic-write/` | Zero-dependency atomic file replacement: exclusive-create random-suffix temp + rename carrying the caller-stated permissions (writeFileAtomic) |
| `packages/util/brand/` | Type-only Branded<B> nominal-typing primitive for the DeepSeek Harness |
| `packages/util/home-paths/` | Shared filesystem path helpers for the DeepSeek Harness |
| `packages/util/launch-environment/` | Immutable DeepSeek Harness launch environment that records which layer supplied each value |
| `packages/util/native-command/` | Zero-dependency no-shell execFile runner for host-native OS integrations: utf8 stdio capture, abort propagation, Windows hide |
| `packages/util/output-retention/` | Zero-dependency bounded-retention primitive: ItemRetainer/TextRetainer + neutral notice helpers (what did we keep, what did we omit) |
| `packages/util/timeout/` | Zero-dependency timeout/deadline primitive: clampTimeout, deadline, timeoutOf, TimeoutReason (timing + classification only, no termination) |

### `packages/web/`

| 包目录 | 职责 |
| --- | --- |
| `packages/web/tool-web/` | Model-facing web tools (web_search, web_fetch) over the DeepSeek Harness web capability seam (ctx.web) |
| `packages/web/web/` | Abstract web access capability seam (ctx.web) for the DeepSeek Harness — search/fetch provider registry, registration-order-independent selection, request/result vocabulary, and the WebError taxonomy |
| `packages/web/web-fetch-http/` | Anonymous public HTTP(S) fetch provider for the DeepSeek Harness web capability seam (ctx.web) |
| `packages/web/web-search-deepseek/` | DeepSeek-backed search provider (native web_search via the Anthropic-compatible API) for the DeepSeek Harness web capability seam (ctx.web) |
| `packages/web/web-search-exa/` | Exa-backed search provider for the DeepSeek Harness web capability seam (ctx.web) |
| `packages/web/web-search-perplexity/` | Perplexity-backed search provider for the DeepSeek Harness web capability seam (ctx.web) |

### `packages/workflow/`

| 包目录 | 职责 |
| --- | --- |
| `packages/workflow/tool-ralph/` | Model-facing fresh-agent Ralph loop over the workflow and subagent seams |
| `packages/workflow/tool-workflow/` | Model-facing workflow tool: run a JavaScript orchestration script over ctx.workflowEngine |
| `packages/workflow/workflow/` | Workflow capability seam: ctx.workflowEngine service, run vocabulary, and workflow/* events |
| `packages/workflow/workflow-worker-thread/` | worker-thread workflow engine: executes model-written orchestration scripts off the host event loop, bridging agent() calls back to ctx.subagents |

### `packages/workspace/`

| 包目录 | 职责 |
| --- | --- |
| `packages/workspace/workspace/` | Workspace entity registry (ctx.workspaceRegistry): durable workspace records with validated session attachment over the domain data form for the DeepSeek Harness |

## 目录内通用约定

- `src/`：可编辑源码；优先从这里理解和修改行为。
- `tests/`：包级测试；变更行为后优先运行最窄的相关测试。
- `lib/`、`types/`、`dist/`：构建输出，由构建命令生成，不手工维护。
- `node_modules/`：依赖安装目录，不属于项目源码。
- `package.json`：包名、导出、依赖和 workspace 注入关系的事实来源。
