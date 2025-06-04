
import { useMemo } from 'react';
import { ToolbarHeading } from '@/layouts/demo1/components/toolbar'
import { Toolbar } from '@/partials/common/toolbar'
import { Container } from '@/components/common/container';
import TanstackTable from '@/core/components/TanstackTable';
import { ColumnDef } from '@tanstack/react-table';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { QUERY_KEYS } from '@/constants/query-keys';
import { APP_APIS } from '@/core/apis';
import { TOrderHistory } from './types';
import { format } from 'date-fns';

type Props = {}

export default function OrderHistory({ }: Props) {

  const columns = useMemo<ColumnDef<TOrderHistory>[]>(
    () => [
      {
        id: 'unique',
        accessorFn: (row) => row.unique,
        header: ({ column }) => (
          <DataGridColumnHeader title="Order Id" column={column} />
        ),
        enableSorting: true,
        size: 100,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'created_at',
        accessorFn: (row) => row.created_at,
        header: ({ column }) => (
          <DataGridColumnHeader title="Purchase Date" column={column} />
        ),
        cell: ({ row }) => format(row?.original?.created_at, "dd MMM yyyy, hh:mm a"),
        enableSorting: true,
        size: 130,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'amount',
        accessorFn: (row) => row.amount,
        header: ({ column }) => (
          <DataGridColumnHeader title="Amount" column={column} />
        ),
        enableSorting: true,
        size: 100,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'validity',
        header: ({ column }) => (
          <DataGridColumnHeader title="Validity" column={column} />
        ),
        cell: ({ row }) => (
          <>{row?.original?.validity + " " + row?.original?.validity_period}</>
        ),
        enableSorting: true,
        size: 130,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'data_available',
        accessorFn: (row) => row.data_available,
        header: ({ column }) => (
          <DataGridColumnHeader title="Available Data" column={column} />
        ),
        enableSorting: true,
        size: 180,
        meta: {
          headerClassName: '',
        },
      },
    ],
    [],
  );


  return (
    <>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="Order History"
          />
        </Toolbar>
      </Container>
      <Container>
        <TanstackTable
          columns={columns}
          queryKey={QUERY_KEYS.orderHistory}
          url={APP_APIS.orderHistory}
        />
      </Container>
    </>
  )
}