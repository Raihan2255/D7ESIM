
import { Fragment, useMemo } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import TanstackTable from '@/core/components/TanstackTable';
import { ColumnDef } from '@tanstack/react-table';
import { DataGridTableRowSelect, DataGridTableRowSelectAll } from '@/components/ui/data-grid-table';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Link } from 'react-router';
import { Badge, BadgeDot } from '@/components/ui/badge';

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
    <Fragment>
      {settings?.layout === 'demo1' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                <div className="flex items-center flex-wrap gap-1.5 font-medium">
                  <span className="text-base text-secondary-foreground">
                    All Members:
                  </span>
                  <span className="text-base text-foreground font-medium me-2">
                    49,053
                  </span>
                  <span className="text-base text-secondary-foreground">
                    Pro Licenses
                  </span>
                  <span className="text-base text-foreground font-medium">
                    724
                  </span>
                </div>
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Button variant="outline">Import CSV</Button>
              <Button variant="primary">Add Member</Button>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}
      <Container>
        <TanstackTable columns={columns} queryKey='' url='' />
      </Container>
    </Fragment>
  )
}