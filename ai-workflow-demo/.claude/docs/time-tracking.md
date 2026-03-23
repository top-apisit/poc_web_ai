# Time Tracking Protocol

## When to do it
Do immediately after impl-verifier passes (or after bug fix) — **do not skip, do not wait for next ticket**

## Record start_time
```
start_time = Date.now()  // record immediately when starting a subtask
```

## Calculate (per subtask)
```
ai_elapsed_min = Math.round((Date.now() - start_time) / 60000)
subtask_estimate_min = subtask_story_points * 60   // SP = hours → *60 = minutes
```

## Trigger: user types "done"
When user types "done" → ask only 1 question:
```
✅ Done — enter review + test time (minutes):
```

## Receive value + calculate
- `dev_elapsed_min` = review + test time from user
- `subtask_total_min = ai_elapsed_min + dev_elapsed_min`

## Log Worklog to Jira
Use `mcp__atlassian__addWorklogToJiraIssue`:
- issueKey = subtask key (e.g., SCRUM-5)
- `timeSpentSeconds` = `subtask_total_min * 60`
- `comment` = use format below (contentFormat: "markdown")

### Worklog Comment Format (Required)

```markdown
## AI Implementation — <TICKET-ID> <Page/Component Name>

### Time
AI: <ai_elapsed_min>m | Dev review: <dev_elapsed_min>m | Total: <total>m

### Issues Found (issues that prevented single-pass completion)

If completed in one pass:
> ✅ No issues — completed in one pass

If there were issues — summarize each:

1. **<short issue name>** (~<x>% of fix time)

   <1-2 line description: symptom + what was wrong>

   Root cause: <why it happened — what agent failed to check / spec was unclear / source conflicted>

2. **<next issue>** (~<x>%)
   ...
```

## Summary FE Total (after all subtasks complete)
```
total_ai_min  = sum(ai_elapsed_min all subtasks)
total_dev_min = sum(dev_elapsed_min all subtasks)
total_min     = total_ai_min + total_dev_min
diff_min      = total_min - total_fe_estimate_min
diff_pct      = Math.round((diff_min / total_fe_estimate_min) * 100)
```

```markdown
## Time Tracking (FE Total)
| Subtask | Estimate (min) | AI (min) | Dev (min) | Actual (min) |
|---------|----------------|----------|-----------|--------------|
| SCRUM-5 | <estimate_min> | <ai>     | <dev>     | <actual>     |
| **Total** | <total_estimate_min> | <total_ai> | <total_dev> | <total_min> |
| **Diff** | | | | <diff_min> (<diff_pct>%) |
```

## Archive
```bash
bash .claude/scripts/done-screen.sh <Name>
```

---

# Pending Time Tracking Guard

## Manifest must have time_tracking status
```markdown
## Time Tracking Status
- status: pending  ← set when starting, change to "done" after logging worklog
- start_time: <timestamp_ms>
```

## Auto-check when orchestrator is called
1. Check `.claude/tasks/active/*.json` all manifests
2. If manifest found with `time_tracking: pending` + all agents done:
```
⚠️ Found <TicketID> with pending Time Tracking → complete before starting new work
```
3. Run Time Tracking flow → change status to `done` → archive

## If user fixes bug after impl-verifier passes
After each bug fix round, ask user:
```
✅ Fixed — any more issues to fix?
   1. Yes → describe them
   2. No → Time Tracking will be done now
```

## Fallback
If conversation closed before completion → manifest stays `pending` → orchestrator will detect next time
