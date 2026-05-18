"use client"

import { useEffect, useState } from "react"

import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProxmoxApiResponse<T> = {
  data?: T[]
}

type NodeInfo = {
  node?: string
  status?: string
  uptime?: number
}

type LxcInfo = {
  vmid?: number
  name?: string
  node?: string
  status?: string
  uptime?: number
}

function formatUptime(totalSeconds: number) {
  const seconds = Math.max(0, Number(totalSeconds) || 0)
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${days}d ${hours}h ${minutes}m`
}

export default function Home() {
  const [nodes, setNodes] = useState<NodeInfo[]>([])
  const [lxcs, setLxcs] = useState<LxcInfo[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>("")

  useEffect(() => {
    let active = true

    async function refreshDashboard() {
      try {
        const [nodesRes, lxcRes] = await Promise.all([
          fetch("/api/proxmox/nodes", { cache: "no-store" }),
          fetch("/api/proxmox/lxc", { cache: "no-store" }),
        ])

        const nodesJson = (await nodesRes.json()) as ProxmoxApiResponse<NodeInfo>
        const lxcJson = (await lxcRes.json()) as ProxmoxApiResponse<LxcInfo>

        if (!active) return

        setNodes(nodesJson.data ?? [])
        setLxcs(lxcJson.data ?? [])
        setLastUpdated(new Date().toLocaleTimeString())
      } catch (err) {
        console.error(err)
      }
    }

    // Poll both APIs every 5 seconds and run once on first render.
    const initialLoad = window.setTimeout(() => {
      void refreshDashboard()
    }, 0)
    const interval = window.setInterval(() => {
      void refreshDashboard()
    }, 5000)

    return () => {
      active = false
      window.clearTimeout(initialLoad)
      window.clearInterval(interval)
    }
  }, [])

  const maxUptime = Math.max(1, ...nodes.map((node) => Number(node.uptime ?? 0)))

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <header className="pt-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Homelab Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Live view of Proxmox nodes and LXC containers</p>
        <p className="mt-1 text-xs text-muted-foreground">Updates every 5 seconds{lastUpdated ? ` • Last updated ${lastUpdated}` : ""}</p>
      </header>

      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle>Node Uptime Graph</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {nodes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No node data available.</p>
          ) : (
            nodes.map((node) => {
              const uptime = Number(node.uptime ?? 0)
              // Relative width gives a simple graph without extra chart dependencies.
              const width = Math.max(4, Math.round((uptime / maxUptime) * 100))

              return (
                <div key={node.node ?? `node-${uptime}`} className="space-y-1">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">{node.node ?? "Unknown node"}</span>
                    <span className="text-muted-foreground">{formatUptime(uptime)}</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted">
                    <div className="h-3 rounded-full bg-primary transition-all duration-500" style={{ width: `${width}%` }} />
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle>LXC Containers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border">
                <tr className="text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">VMID</th>
                  <th className="py-2 pr-4 font-medium">Node</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium">Uptime</th>
                </tr>
              </thead>
              <tbody>
                {lxcs.length === 0 ? (
                  <tr>
                    <td className="py-3 text-muted-foreground" colSpan={5}>
                      No container data available.
                    </td>
                  </tr>
                ) : (
                  lxcs.map((lxc) => (
                    <tr key={lxc.vmid ?? lxc.name} className="border-b border-border/60">
                      <td className="py-3 pr-4">{lxc.name ?? "Unnamed"}</td>
                      <td className="py-3 pr-4">{lxc.vmid ?? "—"}</td>
                      <td className="py-3 pr-4">{lxc.node ?? "—"}</td>
                      <td className="py-3 pr-4">{lxc.status ?? "unknown"}</td>
                      <td className="py-3">{formatUptime(Number(lxc.uptime ?? 0))}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}