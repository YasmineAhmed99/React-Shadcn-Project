import * as React from "react"
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import jsonData from '../transactions.json'

export type Transaction = {
  card_number: string
  status: string
  cardholder: string
  expiration_date: string
  created: string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "card_number",
    header: "Card Number",
    cell: ({ row }) => <div>{row.getValue("card_number")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Button variant="outline" className="ml-auto">
        {row.getValue("status")}
      </Button>
    ),
  },
  {
    accessorKey: "cardholder",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cardholder
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("cardholder")}</div>,
  },
  {
    accessorKey: "expiration_date",
    header: () => <div className="text-right">Expiration Date</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("expiration_date")}</div>,
  },
  {
    accessorKey: "created",
    header: () => <div className="text-right">Created</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("created")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.card_number)}
            >
              Copy card number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View transaction details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TransactionsPage() {
  const [data, setData] = React.useState<Transaction[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  React.useEffect(() => {
    setData(jsonData.transactions)
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  })

  return (
    <div className="w-[650px] m-auto">
      <div className="header">
        <div className="left-buttons">
          <Button className="ml-auto">Transactions</Button>
          <Button className="ml-auto">Issued cards</Button>
        </div>
        <div className="right-buttons">
          <Button variant="outline" className="ml-auto">Download</Button>
          <Button variant="outline" className="ml-auto">Filter</Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getRowModel().rows.length} row(s) displayed.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
