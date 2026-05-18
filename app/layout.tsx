import { Geist, Geist_Mono } from "next/font/google"
import { AppSidebar } from "../components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { TooltipProvider } from "../components/ui/tooltip"

import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { cn } from "../lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <TooltipProvider delayDuration={0}>
            <SidebarProvider className="min-h-svh">
              <AppSidebar />

              <SidebarInset>
                <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur supports-backdrop-filter:bg-background/70">
                  <SidebarTrigger />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-none">Homelab Dashboard</p>
                    <p className="text-xs text-muted-foreground">Use the sidebar tabs to switch pages</p>
                  </div>
                </header>

                <main className="p-4 md:p-6">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
