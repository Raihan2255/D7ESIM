import { Container } from '@/components/common/container'
import { ToolbarHeading } from '@/layouts/demo1/components/toolbar'
import { Toolbar } from '@/partials/common/toolbar'
import TanstackTable from '@/core/components/TanstackTable'
import { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import { QUERY_KEYS } from '@/constants/query-keys'
import { APP_APIS } from '@/core/apis'
import { TPackage } from './types'
import { useNavigate, useParams } from 'react-router'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import DialogContent, { Dialog } from '@/components/ui/dialog'
import PlanCard from './components/PlanCard'

type Props = {}

export default function Packages({ }: Props) {

  const { id, country } = useParams()
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<TPackage>[]>(
    () => [
      {
        id: 'name',
        accessorFn: (row) => row.name,
        header: ({ column }) => (
          <DataGridColumnHeader title="Name" column={column} />
        ),
        enableSorting: true,
        size: 180,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'validity_period',
        accessorFn: (row) => row.validity_in_days,
        header: ({ column }) => (
          <DataGridColumnHeader title="Validity" column={column} />
        ),
        cell: ({ row }) => <>{row?.original?.validity_in_days} Days</>,
        enableSorting: true,
        size: 100,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'data_available',
        header: ({ column }) => (
          <DataGridColumnHeader title="Available Data" column={column} />
        ),
        accessorFn: (row) => row.data_in_gb,
        cell: ({ row }) => <>{row?.original?.data_in_gb} GB</>,
        enableSorting: true,
        size: 100,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'price',
        header: ({ column }) => (
          <DataGridColumnHeader title="Price" column={column} />
        ),
        accessorFn: (row) => row.price,
        enableSorting: true,
        size: 100,
        meta: {
          headerClassName: '',
        },
      },
      {
        id: 'actions',
        header: ({ column }) => (
          <DataGridColumnHeader title="Actions" column={column} />
        ),
        cell: ({ row }) => {
          const [open, setOpen] = useState<boolean>(false)
          const handlePaymentNavigation = () => {
            const url = `/payment?amount=${row?.original?.price}&package_id=${row?.original?.id}`
            navigate(url)
          }
          return (
            <>
              <div className='flex items-center gap-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => setOpen(true)} variant="outline" className='border-none size-[30px] rounded-full shadow-none'>
                      <Eye />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Details</p>
                  </TooltipContent>
                </Tooltip>
                <Button onClick={handlePaymentNavigation}>Buy Now</Button>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='bg-transparent border-none shadow-none p-0 max-w-[350px]'>
                  <PlanCard item={row?.original} />
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
            title={country}
          />
        </Toolbar>
      </Container>
      <Container>
        <TanstackTable
          columns={columns}
          queryKey={QUERY_KEYS.packages}
          url={APP_APIS.packagesCountryWise}
          extraParams={{
            country: id,
            type: 'country'
          }}
        />
      </Container>
    </>
  )
}