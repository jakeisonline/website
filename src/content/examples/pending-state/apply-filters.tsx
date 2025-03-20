import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function ApplyFilters() {
  const orders = [
    {
      orderNumber: 1023,
      status: "Paid",
      customer: "Liam Brown",
      amount: "$346",
    },
    {
      orderNumber: 1504,
      status: "Unpaid",
      customer: "Nia Roberts",
      amount: "$789",
    },
    {
      orderNumber: 1987,
      status: "Refunded",
      customer: "Kai Nguyen",
      amount: "$1120",
    },
    {
      orderNumber: 1345,
      status: "Cancelled",
      customer: "Zara Singh",
      amount: "$250",
    },
    {
      orderNumber: 1765,
      status: "Paid",
      customer: "Omar Haddad",
      amount: "$1000",
    },
  ]

  const [filteredOrders, setFilteredOrders] = useState(orders)
  const [pending, setPending] = useState(false)

  const shuffleOrders = () => {
    return orders.sort(() => Math.random() - 0.5)
  }

  const applyFilters = () => {
    setPending(true)
    setTimeout(() => {
      const filteredOrders = orders.filter((order) => {
        return order.status === "Paid"
      })
      setFilteredOrders(filteredOrders)
      setPending(false)
    }, 1000)
  }

  return (
    <div className="w-full min-h-[430px]">
      <p className="font-bold text-lg mb-2">Orders</p>
      <div className="flex items-center gap-2 border-t border-b py-2 justify-start md:justify-end">
        <Select defaultValue="paid" disabled={pending}>
          <SelectTrigger>
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={applyFilters} disabled={pending}>
          {pending ? (
            <>
              <span>
                Applying<span className="sr-only"> filters</span>...
              </span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            "Apply filters"
          )}
        </Button>
      </div>
      <Table>
        <TableCaption className="sr-only">
          A list of your most recent orders.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right hidden sm:table-cell">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pending ? (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Skeleton className="w-[50px] h-[26px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[70px] h-[26px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[100px] h-[26px]" />
                  </TableCell>
                  <TableCell className="justify-end hidden @md:flex">
                    <Skeleton className="w-[50px] h-[26px]" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            filteredOrders.map((order) => (
              <TableRow key={order.orderNumber}>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="text-right hidden @md:block">
                  {order.amount}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
