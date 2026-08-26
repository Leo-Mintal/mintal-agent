# Errors

## [ERR-20260825-011] jscpd_cli_option

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tooling

### Summary
The installed jscpd CLI does not support the attempted `--no-statistics` option.

### Error
```
error: unexpected argument '--no-statistics' found
```

### Context
- Action: source-only duplicate-code audit.

### Resolution
- **Resolved**: 2026-08-25T00:00:00+08:00
- **Notes**: Re-run with the supported options only.

### Metadata
- Reproducible: yes
- Related Files: .jscpd.json

---

## [ERR-20260825-009] package_path_verifier_baseline

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: docs

### Summary
The package-path verifier still reports two pre-existing references to absent client test files.

### Error
```
packages/client/connection/src/client/fixture.ts:120 packages/client/ui-primitives/tests/terminal-block.client.spec.tsx
packages/client/connection/src/client/fixture.ts:205 packages/client/ui-tool/tests/search-card.client.spec.tsx
```

### Context
- Command: `pnpm run verify-package-paths`
- No `skill-badge` path was reported.

### Suggested Fix
Restore the missing tests or update the fixture references separately from this package removal.

### Metadata
- Reproducible: yes
- Related Files: scripts/verify-package-paths.ts, packages/client/connection/src/client/fixture.ts

---

## [ERR-20260825-010] doc_graph_generator_baseline

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: docs

### Summary
The documentation graph checker cannot load a missing example configuration file.

### Error
```
ENOENT: no such file or directory, open 'examples/headless-agent/cordis.yml'
```

### Context
- Command: `pnpm run gen-doc-graphs --check`
- The failure occurs before generated graph comparison.

### Suggested Fix
Restore the example file or remove the stale example from the graph generator inputs.

### Metadata
- Reproducible: yes
- Related Files: scripts/gen-doc-graphs.ts, examples/headless-agent/cordis.yml

---

## [ERR-20260825-008] translation_snapshot_missing_input

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: tests

### Summary
The translation snapshot test cannot assemble its input because `docs/i18n/translation-prompt.md` is absent from this workspace copy.

### Error
```
verify-translation-prompt: ENOENT: no such file or directory, open 'docs/i18n/translation-prompt.md'
```

### Context
- Command: `pnpm exec vitest run scripts/translation-prompt.snapshot.ts --config vitest.snapshot.config.ts`
- The removed QR images were not opened by the test; the failure occurs before snapshot comparison.

### Suggested Fix
Restore the translation prompt input or remove/adjust the stale snapshot test fixture as part of a separate documentation cleanup.

### Metadata
- Reproducible: yes
- Related Files: scripts/translation-prompt.snapshot.ts, docs/i18n/translation-prompt.md

---

## [ERR-20260825-007] verify_doc_refs_baseline

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: docs

### Summary
The documentation-reference verifier reports existing source-comment links to historical `.agents/notes` and `docs/` files that are absent from this workspace copy.

### Error
```
verify-doc-refs: broken documentation references found in source comments
```

### Context
- Command: `pnpm run verify-doc-refs`
- Scope: repository-wide source comments; no new broken link was introduced by the directory documentation correction.

### Suggested Fix
Restore/archive the referenced historical notes, or remove/update stale source-comment links after deciding the documentation retention policy.

### Metadata
- Reproducible: yes
- Related Files: scripts/verify-doc-refs.ts

---

## [ERR-20260825-006] zsh_path_variable_collision

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: infra

### Summary
A shell audit loop reused zsh's special `path` variable, temporarily removing command lookup paths in that subprocess.

### Error
```
zsh: command not found: find
zsh: command not found: awk
```

### Context
- Action: count source lines in optional packages.
- Cause: `for path in ...` overwrote the special array that backs `PATH` in zsh.

### Resolution
- **Resolved**: 2026-08-25T00:00:00+08:00
- **Notes**: Re-run with a task-specific `target_dir` variable; never use `path` for shell variables.

### Metadata
- Reproducible: yes
- Related Files: .learnings/ERRORS.md

---

## [ERR-20260825-005] repository_audit_environment

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: low
**Status**: pending
**Area**: infra

### Summary
The supplied workspace copy has no Git metadata and does not include `rg`, so repository audits cannot use Git history or ripgrep.

### Error
```
fatal: not a git repository (or any of the parent directories): .git
zsh: command not found: rg
```

### Context
- Action: read-only cleanup audit
- Fallback: use `find`, `grep`, workspace manifests, and file-system sizes.

### Suggested Fix
Provide a repository checkout with `.git` metadata and install ripgrep when history-based auditing is required.

### Metadata
- Reproducible: yes
- Related Files: .learnings/ERRORS.md

---

## [ERR-20260825-001] full_library_build

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: config

### Summary
The repository-wide `pnpm run build:lib` cannot complete because existing native and Web stress-test inputs are missing or invalid.

### Error
```
TS5083: Cannot read file 'native/landlock-run/tsconfig.base.json'.
apps/web/stress-tests/reasoning-chunks.stress.ts cannot find ../tests/scaffold.ts or ../tests/support.ts.
```

### Context
- Command: `pnpm run build:lib`
- The failures occurred while validating the removal of the Web welcome notice.

### Resolution
- **Resolved**: 2026-08-25T00:00:00+08:00
- **Notes**: Restored the Landlock workspace base config and removed the absent Web test/pressure-test chain with its stale project references. `pnpm run build:lib` now completes.

### Metadata
- Reproducible: yes
- Related Files: native/landlock-run, apps/web/stress-tests/reasoning-chunks.stress.ts

---

## [ERR-20260825-004] browser_networkidle_wait

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
The local browser automation backend did not support a `networkidle` wait state despite exposing it in its type reference.

### Error
```
playwright_wait_for_load_state does not support networkidle
```

### Context
- Action: local Web UI verification
- Related Files: apps/web

### Resolution
- **Resolved**: 2026-08-25T00:00:00+08:00
- **Notes**: Used DOM-based state inspection instead.

---

## [ERR-20260825-003] focused_vitest_no_files

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: low
**Status**: wont_fix
**Area**: tests

### Summary
The focused Vitest invocation found no test files in the three affected packages.

### Error
```
No test files found, exiting with code 1
```

### Context
- Command: `pnpm exec vitest run packages/client/ui-settings-models packages/client/ui-settings-general packages/host/apiproxy`
- The repository Vitest include patterns only match package `tests/**/*.spec.{ts,tsx}` files; none exist in these packages.

### Resolution
- **Resolved**: 2026-08-25T00:00:00+08:00
- **Notes**: Covered the change with focused TypeScript builds, package bundles, Web production build, catalog freshness check, and CLI help/startup smoke instead.

---

## [ERR-20260825-002] settings_models_typecheck

**Logged**: 2026-08-25T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: frontend

### Summary
Removing the welcome-notice refresh branch left an unused event parameter in the Models settings plugin.

### Error
```
TS6133: 'ns' is declared but its value is never read.
```

### Context
- Command: `pnpm exec tsc -b packages/client/ui-settings-models/tsconfig.json`
- Related Files: packages/client/ui-settings-models/src/client/index.ts

### Resolution
- **Resolved**: 2026-08-25T00:00:00+08:00
- **Notes**: Removed the obsolete parameter and reran the focused build.

---

## [ERR-20260826-001] rg_unavailable

**Logged**: 2026-08-26T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: infra

### Summary
The preferred repository search tool is not installed in this workspace environment.

### Error
```
zsh: command not found: rg
```

### Context
- Command: `rg --files` and `rg -n -F '.Wt3x_a_header' .`
- Related Files: none

### Resolution
- **Resolved**: 2026-08-26T00:00:00+08:00
- **Notes**: Used `find` and `grep` as the compatible fallback.

---

## [ERR-20260826-002] github_ssh_push_blocked

**Logged**: 2026-08-26T12:16:50Z
**Priority**: low
**Status**: resolved
**Area**: infra

### Summary
The initial push to the newly created private GitHub repository could not use SSH because the network closed port 22.

### Error
```
Connection closed by 198.18.0.128 port 22
fatal: Could not read from remote repository.
```

### Context
- Command: `gh repo create Leo-Mintal/mintal-agent --private --source=. --remote=origin --push`
- The GitHub CLI account is authenticated and HTTPS can use its existing token.

### Resolution
- **Resolved**: 2026-08-26T12:16:50Z
- **Notes**: Changed the repository remote to HTTPS and pushed `main` with the GitHub CLI credential helper.

---
