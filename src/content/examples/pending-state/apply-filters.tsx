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
import { capitalize } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface ApplyFiltersProps {
  dataSet?: "orders" | "products"
}

export default function ApplyFilters({
  dataSet = "orders",
}: ApplyFiltersProps) {
  const orders = [
    {
      id: 1023,
      status: "paid",
      name: "Liam Brown",
      amount: "$346",
    },
    {
      id: 1504,
      status: "unpaid",
      name: "Nia Roberts",
      amount: "$789",
    },
    {
      id: 1987,
      status: "refunded",
      name: "Kai Nguyen",
      amount: "$1120",
    },
    {
      id: 1345,
      status: "cancelled",
      name: "Zara Singh",
      amount: "$250",
    },
    {
      id: 1765,
      status: "paid",
      name: "Omar Haddad",
      amount: "$1000",
    },
  ]

  const products = [
    {
      id: 1023,
      name: "Banana",
      amount: "$10",
      status: "active",
    },
    {
      id: 1504,
      name: "Apple",
      amount: "$1",
      status: "inactive",
    },
    {
      id: 1987,
      name: "Orange",
      amount: "$2",
      status: "active",
    },
  ]

  const dataSetResult = dataSet === "orders" ? orders : products
  const dataSetStatuses = [...new Set(dataSetResult.map((item) => item.status))]

  const [filteredData, setFilteredData] = useState(dataSetResult)
  const [selectedStatus, setSelectedStatus] = useState(dataSetStatuses[0])
  const [pending, setPending] = useState(false)

  const applyFilters = () => {
    setPending(true)
    setTimeout(() => {
      const filteredData =
        selectedStatus === "all"
          ? dataSetResult
          : dataSetResult.filter((data) => {
              return data.status === selectedStatus
            })
      setFilteredData(filteredData)
      setPending(false)
    }, 1000)
  }

  return (
    <div className="w-full min-h-[430px]">
      <p className="font-bold text-lg mb-2">{capitalize(dataSet)}</p>
      <div className="flex items-center gap-2 border-t border-b py-2 justify-between md:justify-end">
        <Select
          value={selectedStatus}
          onValueChange={setSelectedStatus}
          disabled={pending}
        >
          <SelectTrigger>
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {dataSetStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {capitalize(status)}
              </SelectItem>
            ))}
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
          A list of your {dataSet}.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
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
            filteredData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{capitalize(data.status)}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell className="text-right hidden @md:block">
                  {data.amount}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
