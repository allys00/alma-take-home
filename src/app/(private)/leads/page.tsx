'use client';

import { DataTable } from '@/components/shared/dataTable';
import React, { useEffect, useMemo, useState } from 'react';
import { columns } from './columns';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchInput } from '@/components/shared/searchInput';
import { Button } from '@/components/ui/button';
import { Lead, LEAD_STATUS, LEAD_STATUS_LABELS } from '@/definitions/lead';
import { useAppSelector } from '@/lib/store';
import { useDispatch } from 'react-redux';
import { setLeads, updateLead } from '@/reducer/leads/leadsSlice';
import { getLeads } from '@/service/leads.api';

export default function LeadsPage(): React.ReactNode {
  const leads = useAppSelector((state) => state.leads.list);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');

  useEffect(() => {
    getLeads().then((leads) => dispatch(setLeads(leads)));
  }, []);

  const leadsByStatus = useMemo(
    () =>
      statusValue ? leads.filter((lead) => lead.status === statusValue) : leads,
    [leads, statusValue],
  );

  const handleUpdateLead = (lead: Partial<Lead>) => {
    dispatch(updateLead(lead));
  };

  return (
    <section className="w-full">
      <h1 className="mb-8 text-2xl font-bold">Leads</h1>
      <div className="mb-4 flex gap-4">
        <div>
          <SearchInput
            className="max-w-[300px]"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Select value={statusValue} onValueChange={setStatusValue}>
          <SelectTrigger className="max-w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(LEAD_STATUS).map((status: LEAD_STATUS) => (
              <SelectItem key={status} value={status}>
                {LEAD_STATUS_LABELS[status]}
              </SelectItem>
            ))}
            {statusValue && (
              <Button
                className="w-full px-2"
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setStatusValue('');
                }}
              >
                Clear
              </Button>
            )}
          </SelectContent>
        </Select>
      </div>
      <DataTable
        filterValue={searchValue}
        columns={columns(handleUpdateLead)}
        data={leadsByStatus}
      />
    </section>
  );
}
