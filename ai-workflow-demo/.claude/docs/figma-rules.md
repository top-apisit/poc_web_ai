# Figma MCP Rules

## Context Size Guard
1. **Do NOT call `get_design_context` on parent frame with > 50 child nodes**
   → Use `get_metadata` first, then call `get_design_context` per child frame
2. If response > 10k tokens → stop, notify orchestrator
3. **Limit Figma calls to max 10 per page/component**

## MCP Connection Guard
- error "connection refused" or "timeout" → **stop immediately**, notify orchestrator
- Do NOT retry on your own

## Loop Guard
- Editing same file more than **5 times** → stop, notify orchestrator
- check-zones.sh failing more than **3 times** → stop, notify orchestrator

## Localhost Assets
Figma MCP may return localhost URLs — do NOT use in real code:

```
❌ <img src="http://localhost:3845/assets/xxx.png" />

✅ Must do:
1. download from localhost URL
2. save to local:
   images → public/images/<name>.png
   icons  → public/icons/<name>.svg  (or use as React component)
3. use Next.js Image component:
   import Image from 'next/image'
   <Image src="/images/logo.png" alt="..." width={x} height={y} />
```

## Figma Output → Next.js Conversion

| Figma output | Convert to |
|-------------|-----------|
| `<div>` | `<div>` with Tailwind classes |
| `<p>`, `<span>` | appropriate HTML elements |
| `<button>` | `<Button>` from shadcn |
| `<input>` | `<Input>` from shadcn |
| `<img>` | `<Image>` from `next/image` |
| `onClick` | `onClick` (keep as-is) |
| inline `style={{}}` | Tailwind classes via `className` |
| `localhost:3845` URL | local asset path in `public/` |

## Icon Rules — Vector (Stroke) multiple paths
Every Vector (Stroke) in the same group = one icon → combine into single SVG file:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="...path 1..." stroke="currentColor" stroke-width="1.5" />
  <path d="...path 2..." stroke="currentColor" stroke-width="1.5" />
</svg>
```

Name by parent group: `icon/eye-off` → `icon-eye-off.svg`
If no clear name → ask orchestrator

## Self-Verify: Figma Visual Fidelity (Required before finish)

After implementing → call `get_design_context` again and compare:

| Property | Must check |
|----------|-----------|
| Colors | background, text, border, button bg/text, error text |
| Font | family, size, weight, line-height |
| Spacing | padding, margin, gap |
| Dimensions | min-height inputs/buttons, icon sizes |
| Border | radius, width, color |
| Layout | flex direction, align, justify |
| Shadow | shadow/drop-shadow values (if any) |
| Responsive | verify at sm/md/lg breakpoints |

If not matching → fix immediately before finish
**Do NOT finish without doing Figma Fidelity Check**
