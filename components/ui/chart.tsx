"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Workaround for https://github.com/recharts/recharts/issues/3615
const Tooltip = ({
  active,
  payload,
  label,
  formatter,
  content,
  className,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
  formatter?: (value: number | string | Array<number | string>, name: string, props: any) => React.ReactNode
}) => {
  if (active && payload && payload.length) {
    const value = payload[0].value
    const name = payload[0].name
    return (
      <div className={cn("rounded-lg border bg-background p-2 text-sm shadow-md", className)}>
        {content ? (
          content({ active, payload, label })
        ) : (
          <>
            <p className="font-bold">{label}</p>
            <p className="text-muted-foreground">
              {formatter ? formatter(value, name, payload[0]) : `${name}: ${value}`}
            </p>
          </>
        )}
      </div>
    )
  }

  return null
}

const ChartContext = React.createContext<{
  config: ChartConfig
} | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <Chart />")
  }

  return context
}

type ChartConfig = {
  [k: string]: {
    label?: string
    icon?: React.ComponentType
    color?: string
  }
}

type ChartProps = React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer> & {
  config: ChartConfig
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ config, className, children, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div ref={ref} className={cn("h-[--chart-height]", className)} {...props}>
        <RechartsPrimitive.ResponsiveContainer {...props}>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
Chart.displayName = "Chart"

export { Chart, Tooltip, useChart }
