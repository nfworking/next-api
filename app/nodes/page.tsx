"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NodesPage() {
  const [nodes, setNodes] = useState<any[]>([])

  async function fetchNodes() {
    try {
      const res = await fetch("/api/proxmox/nodes")
      const data = await res.json()
      setNodes(data?.data ?? [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchNodes()
    const interval = setInterval(fetchNodes, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {nodes.length === 0 ? (
        <div className="col-span-full rounded-2xl border border-dashed border-border/60 bg-muted/20 p-6 text-center text-muted-foreground">
          No nodes found.
        </div>
      ) : (
        nodes.map((node: any) => {
          const uptime = Number(node.uptime ?? 0)
          const days = Math.floor(uptime / 86400)
          const remainingAfterDays = uptime % 86400
          const hours = Math.floor(remainingAfterDays / 3600)
          const remainingAfterHours = remainingAfterDays % 3600
          const minutes = Math.floor(remainingAfterHours / 60)
          const formattedUptime = `${days}d ${hours}h ${minutes}m`
          const isOnline = node.status === "online"

          return (
            <Card key={node.node ?? node.id} className="border-border/60 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{node.node ?? "Unnamed node"}</CardTitle>
                    <CardDescription>Node status and uptime</CardDescription>
                  </div>
                  <span className={isOnline ? "text-sm font-medium text-emerald-600" : "text-sm font-medium text-red-500"}>
                    {node.status ?? "Unknown"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Type: {node.type ?? "—"}</p>
                <p>Uptime: {formattedUptime}</p>
              </CardContent>

              <CardFooter>
                <Button size="sm">Open</Button>
              </CardFooter>
            </Card>
          )
        })
      )}
    </div>
  )
}