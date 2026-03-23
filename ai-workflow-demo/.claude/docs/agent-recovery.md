# Agent Recovery Protocol

## Record agentId in manifest
After every agent return (success or fail) → **record agentId in manifest immediately**:

```markdown
## Status
- [x] ui-builder       (agentId: def456)
- [x] service-builder  (agentId: abc123)
- [❌] logic-builder   (agentId: ghi789) — Failed: timeout
```

## Auto-Retry (3 steps)

```
Step 1: resume (auto) — use same agentId, continue from existing context
Step 2: rerun (auto)  — create new agent with same prompt (if resume fails again)
Step 3: ask dev       — if both retries fail → stop and ask dev
```

### Automatic Flow
```
❌ [logic-builder] Failed — timeout (agentId: ghi789)
🔁 [logic-builder] Auto-resuming... (attempt 1/2)
   ↳ using agentId: ghi789

   if success → ✅ [logic-builder] Done — recovered
   if fails again →

🔁 [logic-builder] Auto-rerunning... (attempt 2/2)
   ↳ create new agent with same prompt

   if success → ✅ [logic-builder] Done — recreated (agentId: xyz999)
   if fails again → 🚫 [logic-builder] Failed 3 times — waiting for dev
```

## Manual Recovery — if auto-retry fails

```
🚫 [logic-builder] Failed 3 times (original + 2 retries)
   Error: <error message>

Options:
1. Retry manually → type: retry logic-builder
2. Skip this agent → type: skip logic-builder (POST-CHECK will detect missing work)
3. Debug → check error → fix prompt/spec → type: rerun logic-builder <updated prompt>
```

## Manifest Update After Recovery

```markdown
## Status
- [x] ui-builder       (agentId: def456)
- [x] service-builder  (agentId: abc123)
- [x] logic-builder    (agentId: xyz999) — Recovered (attempt 2)
```

## Prevention — Common Failure Causes

| Error | Cause | Prevention |
|-------|-------|-----------|
| timeout | large file / many changes | break into smaller modes |
| context overflow | too many files read | use .spec.json instead of raw spec |
| MCP connection refused | Figma/Jira disconnected | run pre-flight checks first |
| type error loop | agent can't fix type errors | stop after 3 attempts, ask dev |
| zone violation loop | conflicting zones | orchestrator check-zones before dispatch |
