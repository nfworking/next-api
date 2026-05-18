import * as React from "react"

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        "rounded-lg border bg-card text-card-foreground shadow-sm ring-1 ring-border " +
        (className || "")
      }
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"flex flex-col p-4 " + (className || "")} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={"text-sm font-semibold leading-none " + (className || "")} {...props} />
  )
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={"text-sm text-muted-foreground mt-1 " + (className || "")} {...props} />
  )
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"p-4 pt-0 " + (className || "")} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"flex items-center p-4 pt-0 " + (className || "")} {...props} />
}

export default Card
