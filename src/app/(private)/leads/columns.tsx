'use client';

import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { format } from 'date-fns';
import { Lead, LEAD_STATUS, LEAD_STATUS_LABELS } from '@/definitions/lead';
import { updateLead } from '@/reducer/leads/leadsSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

const SortHeader = ({
  column,
  title,
}: HeaderContext<Lead, unknown> & { title: string }) => {
  const isSorted = column.getIsSorted() === 'asc';
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(isSorted)}>
      {title}
      {isSorted ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

export const columns = (
  onHandleLeadUpdate: (lead: Partial<Lead>) => void,
): ColumnDef<Lead>[] => [
  {
    accessorKey: 'name',
    header: (headerProps) => <SortHeader {...headerProps} title="Name" />,
  },
  {
    accessorKey: 'submittedAt',
    header: (headerProps) => <SortHeader {...headerProps} title="Submitted" />,
    cell: ({ row }) => {
      const date: string = row.getValue('submittedAt');
      const formatted = format(date, 'MM/dd/yyyy, H:mm aa');

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: (headerProps) => <SortHeader {...headerProps} title="Status" />,
    cell: ({ row }) => {
      const status: LEAD_STATUS = row.getValue('status');
      return LEAD_STATUS_LABELS[status];
    },
  },
  {
    accessorKey: 'country',
    header: (headerProps) => <SortHeader {...headerProps} title="Country" />,
  },
  {
    id: 'actions',
    cell: ({ row, ...rest }) => {
      const isPending = row.original.status === LEAD_STATUS.PENDING;
      const id: number = row.original.id;

      if (!isPending || !id) return null;
      return (
        <Button
          onClick={() => {
            onHandleLeadUpdate({ id, status: LEAD_STATUS.REACHED_OUT });
          }}
          size={'sm'}
        >
          Set as Reached Out
        </Button>
      );
    },
  },
];
