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

export default function LxcPage() {
  const [lxcs, setLxcs] = useState<any[]>([])

  async function fetchLxcs() {
    try {
      const res = await fetch("/api/proxmox/lxc")
      const data = await res.json()
      setLxcs(data?.data ?? [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchLxcs()
    const interval = setInterval(fetchLxcs, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {lxcs.length === 0 ? (
        <div className="col-span-full rounded-2xl border border-dashed border-border/60 bg-muted/20 p-6 text-center text-muted-foreground">
          No containers found.
        </div>
      ) : (
        lxcs.map((lxc: any) => {
          const uptime = Number(lxc.uptime ?? 0)
          const days = Math.floor(uptime / 86400)
          const remainingAfterDays = uptime % 86400
          const hours = Math.floor(remainingAfterDays / 3600)
          const remainingAfterHours = remainingAfterDays % 3600
          const minutes = Math.floor(remainingAfterHours / 60)
          const formattedUptime = `${days}d ${hours}h ${minutes}m`
          const isOnline = lxc.status === "running"

          return (
            <Card key={lxc.vmid ?? lxc.name} className="border-border/60 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{lxc.name ?? "Unnamed container"}</CardTitle>
                    <CardDescription>Container status and uptime</CardDescription>
                  </div>
                  <span className={isOnline ? "text-sm font-medium text-emerald-600" : "text-sm font-medium text-red-500"}>
                    {lxc.status ?? "Unknown"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Type: {lxc.type ?? "—"}</p>
                <p>Uptime: {formattedUptime}</p>
                <p>VMID: {lxc.vmid ?? "—"}</p>
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