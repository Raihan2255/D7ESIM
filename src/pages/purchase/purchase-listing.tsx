
import { useMemo } from 'react';
import { ToolbarHeading } from '@/layouts/demo1/components/toolbar'
import { Toolbar } from '@/partials/common/toolbar'
import { useSettings } from '@/providers/settings-provider';
import { Container } from '@/components/common/container';
import TanstackTable from '@/core/components/TanstackTable';
import { ColumnDef } from '@tanstack/react-table';
import { DataGridTableRowSelect, DataGridTableRowSelectAll } from '@/components/ui/data-grid-table';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Link } from 'react-router';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { QUERY_KEYS } from '@/constants/query-keys';
import { APP_APIS } from '@/core/apis';

type Props = {}

export function PurchaseListing({ }: Props) {
  const { settings } = useSettings();

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id',
        accessorFn: (row) => row.id,
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        size: 51,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'users',
        accessorFn: (row) => row.user,
        header: ({ column }) => (
          <DataGridColumnHeader title="Member" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <img
              src={toAbsoluteUrl(`/media/avatars/${row.original.user.avatar}`)}
              className="rounded-full size-9 shrink-0"
              alt={`${row.original.user.userName}`}
            />
            <div className="flex flex-col gap-0.5">
              <Link
                to="#"
                className="text-sm font-medium text-mono hover:text-primary-active mb-px"
              >
                {row.original.user.userName}
              </Link>
              <Link
                to="#"
                className="text-sm text-secondary-foreground font-normal hover:text-primary-active"
              >
                {row.original.user.userGmail}
              </Link>
            </div>
          </div>
        ),
        enableSorting: true,
        size: 300,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'role',
        accessorFn: (row) => row.role,
        header: ({ column }) => (
          <DataGridColumnHeader title="Role" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal">
            {row.original.role}
          </span>
        ),
        enableSorting: true,
        size: 180,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => (
          <Badge
            size="lg"
            variant={row.original.status.color}
            appearance="outline"
            shape="circle"
          >
            <BadgeDot className={`${row.original.status.color}`} />
            {row.original.status.label}
          </Badge>
        ),
        enableSorting: true,
        size: 180,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'location',
        accessorFn: (row) => row.location,
        header: ({ column }) => (
          <DataGridColumnHeader title="Location" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center text-foreground font-normal gap-1.5">
            <img
              src={toAbsoluteUrl(`/media/flags/${row.original.flag}`)}
              className="rounded-full size-4 shrink-0"
              alt={`${row.original.user.userName}`}
            />
            {row.original.location}
          </div>
        ),
        enableSorting: true,
        size: 180,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'activity',
        accessorFn: (row) => row.activity,
        header: ({ column }) => (
          <DataGridColumnHeader title="Activity" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal">
            {row.original.activity}
          </span>
        ),
        enableSorting: true,
        size: 180,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => <></>,
        enableSorting: false,
        size: 60,
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
            title="Purchase"
          />
        </Toolbar>
      </Container>
      <Container>
        <TanstackTable
          columns={columns}
          queryKey={QUERY_KEYS.purchase}
          url={APP_APIS.purchase}
        />
      </Container>
    </>
  )
}