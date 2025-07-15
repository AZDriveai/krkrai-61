"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type SalesData = {
  date: string
  revenue: number
  unitsSold: number
}

type UserData = {
  date: string
  newUsers: number
  activeUsers: number
}

type ProductData = {
  product: string
  sales: number
  profit: number
}

export function AdvancedDashboard() {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [userData, setUserData] = useState<UserData[]>([])
  const [productData, setProductData] = useState<ProductData[]>([])
  const [timeframe, setTimeframe] = useState("7days")
  const [date, setDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    // Simulate fetching data based on timeframe/date
    const generateSalesData = () => {
      const data = []
      for (let i = 0; i < 7; i++) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        data.push({
          date: format(d, "MMM dd"),
          revenue: Math.floor(Math.random() * 5000) + 1000,
          unitsSold: Math.floor(Math.random() * 200) + 50,
        })
      }
      setSalesData(data.reverse())
    }

    const generateUserData = () => {
      const data = []
      for (let i = 0; i < 7; i++) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        data.push({
          date: format(d, "MMM dd"),
          newUsers: Math.floor(Math.random() * 50) + 10,
          activeUsers: Math.floor(Math.random() * 500) + 100,
        })
      }
      setUserData(data.reverse())
    }

    const generateProductData = () => {
      setProductData([
        {
          product: "Product A",
          sales: Math.floor(Math.random() * 1000) + 200,
          profit: Math.floor(Math.random() * 500) + 100,
        },
        {
          product: "Product B",
          sales: Math.floor(Math.random() * 800) + 150,
          profit: Math.floor(Math.random() * 400) + 80,
        },
        {
          product: "Product C",
          sales: Math.floor(Math.random() * 600) + 100,
          profit: Math.floor(Math.random() * 300) + 50,
        },
        {
          product: "Product D",
          sales: Math.floor(Math.random() * 400) + 80,
          profit: Math.floor(Math.random() * 200) + 40,
        },
      ])
    }

    generateSalesData()
    generateUserData()
    generateProductData()
  }, [timeframe, date])

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sales Overview</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
              <Line yAxisId="right" type="monotone" dataKey="unitsSold" stroke="#82ca9d" name="Units Sold" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="newUsers" fill="#8884d8" name="New Users" />
              <Bar dataKey="activeUsers" fill="#82ca9d" name="Active Users" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="product" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
