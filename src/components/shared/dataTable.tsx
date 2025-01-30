'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterValue?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterValue,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  useEffect(() => {
    table.setGlobalFilter(filterValue);
  }, [filterValue]);

  return (
    <div className="w-full rounded-md border">
      <Table className="w-full">
        <TableHeader className="h-14">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="h-14"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="!px-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getPageCount() > 0 && (
        <div className="flex items-center justify-end space-x-2 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FaAngleLeft />
          </Button>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <Button
                key={i}
                variant="ghost"
                size="sm"
                onClick={() => table.setPageIndex(i)}
                disabled={table.getState().pagination.pageIndex === i}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <FaAngleRight />
          </Button>
        </div>
      )}
    </div>
  );
}
