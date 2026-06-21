import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export interface Column<T> {
  key: string
  header: string
  render: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  isLoading: boolean
  error: string | null
  emptyMessage?: string
  onRowClick?: (row: T) => void
}

export function DataTable<T>({
  columns, data, isLoading, error, emptyMessage = 'No data found.',
  onRowClick,
}: DataTableProps<T>) {
  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/5 p-8 text-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.className}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key}><Skeleton className="h-4 w-full" /></TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow
                key={(row as Record<string, unknown>).id as string ?? i}
                className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
