
import { useMemo, useState } from 'react';
import { ToolbarHeading } from '@/layouts/demo1/components/toolbar'
import { Toolbar } from '@/partials/common/toolbar'
import { Container } from '@/components/common/container';
import TanstackTable from '@/core/components/TanstackTable';
import { ColumnDef } from '@tanstack/react-table';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { QUERY_KEYS } from '@/constants/query-keys';
import { APP_APIS } from '@/core/apis';
import { IOrderDetails, TOrderHistory } from './types';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import DialogContent, { Dialog } from '@/components/ui/dialog';
import UsageModal from './UsageModal';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { useQuery } from 'react-query';
import { useApiHandlers } from '@/hooks/useApiHandlers';
import { IApiResponse } from '@/types/global.types';

type Props = {}

export default function OrderHistory({ }: Props) {

  const columns = useMemo<ColumnDef<TOrderHistory>[]>(
    () => [
      {
        id: 'order_live',
        accessorFn: (row) => row.order_live,
        header: ({ column }) => (
          <DataGridColumnHeader title="Work Order Id" column={column} />
        ),
        enableSorting: true,
        size: 180,
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
        id: 'package',
        accessorFn: (row) => row?.package?.name,
        header: ({ column }) => (
          <DataGridColumnHeader title="Package" column={column} />
        ),
        enableSorting: false,
        size: 180,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'amount',
        accessorFn: (row) => row.price,
        header: ({ column }) => (
          <DataGridColumnHeader title="Amount" column={column} />
        ),
        enableSorting: true,
        size: 130,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'expired',
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => (
          <Badge
            size="lg"
            variant={"info"}
            appearance="outline"
            shape="circle"
            className='capitalize'
          >
            <BadgeDot />
            {row.original.status?.toLocaleLowerCase()}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: ({ column }) => (
          <DataGridColumnHeader title="Action" column={column} />
        ),
        cell: ({ row }) => {
          const [open, setOpen] = useState<boolean>(false)

          const { getAll } = useApiHandlers()

          const getDatas = async () => {
            try {
              const response = await getAll<IApiResponse<IOrderDetails>>(`${APP_APIS.orderUsage}?order=${row?.original?.order_live}`)
              if (response?.data && response?.status) {
                return response?.data
              }

            } catch (error) {
              console.error(error)
            }
          }

          const { data, isLoading } = useQuery({
            queryKey: ["test", open, row?.original?.order_live],
            queryFn: getDatas,
            enabled: !!(row?.original?.order_live && open)
          })

          return (
            <>
              <div className='flex items-center gap-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button disabled={!row?.original?.order_live} onClick={() => setOpen(true)} variant="outline" className='border-none size-[30px] rounded-full shadow-none'>
                      <Eye />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Details</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='border-none shadow-none bg-white'>
                  <UsageModal isLoading={isLoading} data={data as IOrderDetails} />
                </DialogContent>
              </Dialog>
            </>
          )
        },
        enableSorting: false,
        size: 100,
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