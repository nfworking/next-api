"use client"

import Link from "next/link"
import { ArrowRight, HardDrive, Server, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <section className="rounded-3xl border border-border/60 bg-linear-to-br from-background to-muted/30 p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5" />
          Overview
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Homelab dashboard</h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
          Use the sidebar tabs to open the Nodes and Containers pages. This overview page stays light and acts as your landing page.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/nodes">
              View nodes
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/lxc">View containers</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="size-4" />
              Nodes
            </CardTitle>
            <CardDescription>Dedicated page for Proxmox nodes.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Add node-level details or keep this as a summary tile.
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline" asChild>
              <Link href="/nodes">Open nodes</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="size-4" />
              Containers
            </CardTitle>
            <CardDescription>Dedicated page for LXC containers.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This is where the container cards now live instead of the sidebar.
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline" asChild>
              <Link href="/lxc">Open containers</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}