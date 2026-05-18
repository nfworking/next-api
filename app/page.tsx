"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export default function Home() {
  const [nodes, setNodes] = useState<any[]>([])
  const [lxcs, setLxcs] = useState<any[]>([])

  async function fetchLXC() {
    try {
      const res = await fetch("/api/proxmox/lxc")
      const data = await res.json()
      setLxcs(data?.data ?? [])
    } catch (err) {
      console.error(err)
    }
  }

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
    fetchLXC()

    const interval = setInterval(() => {
      fetchNodes()
      fetchLXC()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-svh flex-col items-center p-6">
      <div className="flex max-w-4xl w-full flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium text-center text-4xl">Homelab Dashboard with API implementation</h1>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nodes.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">No nodes found</div>
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
                <Card key={node.node ?? node.id} className="w-70 h-50 justify-center gap-4px border-4 transition-all duration-300  hover:border-cyan-400 hover:shadow-cyan-500/20 hover:shadow-lg
  hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex justify-between">
                    <CardTitle >
                      {node.node ?? "Unnamed node"}
                    </CardTitle>
                    <CardTitle className={isOnline ? "text-green-500" : "text-red-500" }>
                      {node.status ?? "Unknown status"} 
                    </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground">Type: {node.type ?? "—"}</p>
                    <p className="text-sm text-muted-foreground">Uptime: {formattedUptime}</p>
                  </CardContent>

                  <CardFooter>
                    <Button size="sm">Open</Button>
                  </CardFooter>
                </Card>
              )
            })
          )}
        </div>
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lxcs.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">No LXC containers found</div>
          ) : (
            lxcs.map((lxc: any) => {
                const isOnline = lxc.status === "runnning"
                const uptime = Number(lxc.uptime ?? 0)

              const days = Math.floor(uptime / 86400)
              const remainingAfterDays = uptime % 86400
              const hours = Math.floor(remainingAfterDays / 3600)
              const remainingAfterHours = remainingAfterDays % 3600
              const minutes = Math.floor(remainingAfterHours / 60)
              const formattedUptime = `${days}d ${hours}h ${minutes}m`

              return (
                <Card key={lxc.name ?? lxc.id} className="w-70 h-50 justify-center gap-4px border-4 transition-all duration-300  hover:border-cyan-400 hover:shadow-cyan-500/20 hover:shadow-lg
  hover:-translate-y-1">
                  <CardHeader>
                      <div className="flex justify-between">
                    <CardTitle>
                      {lxc.name ?? "Unnamed container"}
                    </CardTitle>
                   
                    <CardTitle className={isOnline ? "text-green-500" : "text-red-500" }>
                      {lxc.status ?? "Unknown status"} 
                    </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>                    
                    <p className="text-sm text-muted-foreground">Type: {lxc.type ?? "—"}</p>
                    <p className="text-sm text-muted-foreground">Uptime: {formattedUptime}</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Open</Button>
                  </CardFooter>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )}
      