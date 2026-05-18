"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HardDrive, LayoutDashboard, Server, Settings2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/nodes", label: "Nodes", icon: Server },
  { href: "/lxc", label: "Containers", icon: HardDrive },
  { href: "/settings", label: "Settings", icon: Settings2 },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border/70 bg-sidebar/95 backdrop-blur supports-backdrop-filter:bg-sidebar/80"
    >
      <SidebarHeader className="border-b border-sidebar-border/70 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/40 p-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <Server className="size-5" />
          </div>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sidebar-foreground/60">
              Homelab Control
            </p>
            <h2 className="truncate text-sm font-semibold text-sidebar-foreground">
              Proxmox Dashboard
            </h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[11px] uppercase tracking-[0.2em] text-sidebar-foreground/55 group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>

          <SidebarMenu className="gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    variant={isActive ? "outline" : "default"}
                    tooltip={item.label}
                    className={cn(
                      "rounded-xl px-3 py-3 transition-all hover:-translate-y-px hover:shadow-md",
                      "group-data-[collapsible=icon]:justify-center"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <Icon className="size-4" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/70 p-4 group-data-[collapsible=icon]:hidden">
        <div className="rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/40 px-3 py-3 text-sm text-sidebar-foreground/70">
          <p className="font-medium text-sidebar-foreground">Tip</p>
          <p className="mt-1 text-xs text-sidebar-foreground/60">
            Create more tabs by adding a route in <span className="font-medium">app/</span> and a matching item here.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}