
import { useMemo } from 'react';
import { ToolbarHeading } from '@/layouts/demo1/components/toolbar'
import { Toolbar } from '@/partials/common/toolbar'
import { Container } from '@/components/common/container';
import TanstackTable from '@/core/components/TanstackTable';
import { ColumnDef } from '@tanstack/react-table';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { useNavigate } from 'react-router';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { QUERY_KEYS } from '@/constants/query-keys';
import { APP_APIS } from '@/core/apis';
import { TCountry } from './types';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {}

export function PurchaseListing({ }: Props) {

  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<TCountry>[]>(
    () => [
      {
        id: 'country_name',
        accessorFn: (row) => row.name,
        header: ({ column }) => (
          <DataGridColumnHeader title="Country Name" column={column} />
        ),
        enableSorting: true,
        size: 180,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'code',
        accessorFn: (row) => row.code,
        header: ({ column }) => (
          <DataGridColumnHeader title="Country Code" column={column} />
        ),
        enableSorting: true,
        size: 130,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'logo',
        header: ({ column }) => (
          <DataGridColumnHeader title="Country Logo" column={column} />
        ),
        cell: ({ row }) => (
          <img
            className="rounded-[6px] object-cover size-9 shrink-0"
            src={row?.original?.logo} alt={row?.original?.name} title={row?.original?.name} loading='lazy' />
        ),
        enableSorting: true,
        size: 130,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'status',
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => (
          <Badge
            size="lg"
            variant={row.original.is_active ? "success" : "warning"}
            appearance="outline"
            shape="circle"
          >
            <BadgeDot className={`${row.original.is_active ? "success" : "warning"}`} />
            {row.original.is_active ? "Active" : "In Active"}
          </Badge>
        ),
        enableSorting: true,
        size: 150,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'status',
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => navigate(`${row.original.slug}/${row?.original?.name}`)} variant="outline" className='border-none size-[30px] rounded-full'>
                <Eye />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Packages</p>
            </TooltipContent>
          </Tooltip>
        ),
        enableSorting: true,
        size: 150,
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
          queryKey={QUERY_KEYS.countries}
          url={APP_APIS.country}
        />
      </Container>
    </>
  )
}