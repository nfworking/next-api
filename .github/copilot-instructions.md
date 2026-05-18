# Copilot Instructions for `next-api`

## Build, lint, and type-check commands

- Install deps: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Start production build: `pnpm start`
- Lint: `pnpm lint`
- Lint a specific file: `pnpm lint app/nodes/page.tsx`
- Type-check: `pnpm typecheck`
- Format TS/TSX files: `pnpm format`

There is currently no test runner or `test` script in `package.json`, so single-test commands are not available yet.

## High-level architecture

- This is a Next.js App Router app. The root layout (`app/layout.tsx`) wraps all pages with:
  - `ThemeProvider` (dark/light support via `next-themes` + `d` key hotkey)
  - `TooltipProvider`
  - `SidebarProvider` + global `AppSidebar`
- Main UI routes are page-level client components in `app/`:
  - `app/page.tsx` (overview links)
  - `app/nodes/page.tsx` and `app/lxc/page.tsx` (polling dashboard cards)
  - `app/settings/page.tsx` (placeholder)
- Proxmox data is proxied through server route handlers:
  - `app/api/proxmox/nodes/route.ts`
  - `app/api/proxmox/lxc/route.ts`
  These routes read `process.env.PROXMOX_API_TOKEN`, call upstream Proxmox endpoints with `cache: "no-store"`, and return upstream JSON directly.
- Client pages poll these internal API routes every 5 seconds (`setInterval`) and expect the Proxmox payload shape (`data?.data ?? []`).

## Key repository conventions

- Use the `@/*` import alias (configured in `tsconfig.json`) for app-local imports.
- UI primitives live in `components/ui` (shadcn-based); route pages compose these primitives instead of duplicating base UI.
- `components/ui/card.tsx` exports both named parts (`CardHeader`, `CardContent`, etc.) and a default `Card`; existing pages use this default+named import style.
- Keep navigation updates in sync across routing and sidebar: new top-level pages in `app/` should be paired with a matching entry in `components/app-sidebar.tsx`.
- Theme/styling relies on CSS variables in `app/globals.css` (`@import "shadcn/tailwind.css"` + dark-mode variable overrides), so prefer token-based utility classes (`bg-background`, `text-foreground`, etc.) over hardcoded colors.

## Notes from existing docs/config

- README usage for shadcn components applies here: add components with `npx shadcn@latest add <component>` and import via `@/components/ui/...`.
- `components.json` is the source of truth for shadcn aliases (`ui`, `components`, `lib`, `hooks`) and should stay aligned with import paths.
