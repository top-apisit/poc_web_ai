# Pre-flight Checks

Before dispatching any agent, orchestrator must check 3 things:

## CHECK-A: MCP Connections

| Agent | Requires MCP | How to check |
|-------|-------------|-------------|
| ui-builder | Figma remote | call `get_metadata` with node-id — if error = Figma not ready |
| service-builder | Jira | call `getJiraIssue` with ticket — if error = Jira not ready |
| logic-builder | Confluence (if no .spec.json) | call `getConfluencePage` — if error = Confluence not ready |

**If MCP not ready:**
```
🚫 Pre-flight failed — <MCP name> not responding
   Fix:
   - Figma: check Figma MCP server is running (run /mcp to verify)
   - Jira/Confluence: run /mcp to reconnect
```
→ **Stop immediately, do not dispatch agents** until MCP is ready

## CHECK-B: Figma Node Validation (if Figma link exists)
1. Call `get_metadata` with node-id
2. Verify response has child nodes
3. Check size:
   - ≤ 50 nodes → ✅ send single node-id
   - 51-150 nodes → ⚠️ send with warning "use get_design_context per child frame"
   - > 150 nodes → 🚫 stop, request more specific node-id

## CHECK-C: Files to modify actually exist (Mode B/D/E)
```bash
ls app/<path>/page.tsx components/<Name>/<Name>.tsx 2>/dev/null
```
If missing → tell dev that mode should be NEW not UPDATE

## CHECK-D: Branch exists and is up to date
```bash
git fetch origin
git status
```
If on wrong branch or behind remote → fix before dispatching agents

## CHECK-E: Linked ticket component interface
If ticket references a shared component → read existing interface before dispatching:
```bash
cat components/<SharedComponent>/<SharedComponent>.types.ts 2>/dev/null
```

## CHECK-F: Existing branch check
If a branch for this ticket already exists:
```bash
git branch -r | grep "SCRUM-<id>"
```
If exists → ask dev whether to continue on existing branch or create new

## Pre-flight Output Format
```
Pre-flight for SCRUM-{id}:
  ✅ CHECK-A: Figma MCP ready
  ✅ CHECK-A: Jira ready
  ✅ CHECK-B: Figma node 12:345 — 23 nodes (ok)
  ✅ CHECK-C: app/dashboard/page.tsx exists
  ✅ CHECK-D: On feature/SCRUM-{id}-... branch
  ✅ CHECK-E: No shared component dependency
  ✅ All pre-flight checks passed → dispatching agents
```
