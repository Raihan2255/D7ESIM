import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardHeading, CardTable } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DataGrid } from '@/components/ui/data-grid'
import { DataGridPagination } from '@/components/ui/data-grid-pagination'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useApiHandlers } from '@/hooks/useApiHandlers'
import { Label } from '@radix-ui/react-label'
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, RowSelectionState, SortingState, useReactTable } from '@tanstack/react-table'
import { Filter, Search, X } from 'lucide-react'
import { ReactNode, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

type Props<T> = {
  columns: ColumnDef<T>[]
  queryKey: string
  url: string
  children?: ReactNode
}

const data = [
  {
    id: '1',
    user: {
      avatar: '300-1.png',
      userName: 'Esther Howard',
      userGmail: 'esther.howard@gmail.com',
    },
    role: 'Editor',
    status: {
      label: 'On Leave',
      color: 'destructive',
    },
    location: 'Malaysia',
    flag: 'malaysia.svg',
    activity: 'Week ago',
  },
  {
    id: '2',
    user: {
      avatar: '300-2.png',
      userName: 'Cody Fisher',
      userGmail: 'cody.fisher@gmail.com',
    },
    role: 'Manager',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Canada',
    flag: 'canada.svg',
    activity: 'Current session',
  },
  {
    id: '3',
    user: {
      avatar: '300-3.png',
      userName: 'Tyler Hero',
      userGmail: 'tyler.hero@gmail.com',
    },
    role: 'Super Admin',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Estonia',
    flag: 'estonia.svg',
    activity: 'Current session',
  },
  {
    id: '4',
    user: {
      avatar: '300-4.png',
      userName: 'Robert Fox',
      userGmail: 'robert.fox@gmail.com',
    },
    role: 'Developer',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'USA',
    flag: 'united-states.svg',
    activity: 'Today, 15:02',
  },
  {
    id: '5',
    user: {
      avatar: '300-5.png',
      userName: 'Leslie Alexander',
      userGmail: 'leslie.alexander@gmail.com',
    },
    role: 'Super Admin',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'India',
    flag: 'india.svg',
    activity: 'Month ago',
  },
  {
    id: '6',
    user: {
      avatar: '300-6.png',
      userName: 'John Smith',
      userGmail: 'john.smith@gmail.com',
    },
    role: 'Designer',
    status: {
      label: 'On Leave',
      color: 'destructive',
    },
    location: 'Australia',
    flag: 'australia.svg',
    activity: 'Yesterday, 14:23',
  },
  {
    id: '7',
    user: {
      avatar: '300-7.png',
      userName: 'Emily Johnson',
      userGmail: 'emily.johnson@gmail.com',
    },
    role: 'Developer',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'France',
    flag: 'france.svg',
    activity: 'Today, 10:12',
  },
  {
    id: '8',
    user: {
      avatar: '300-8.png',
      userName: 'Michael Brown',
      userGmail: 'michael.brown@gmail.com',
    },
    role: 'QA Engineer',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Germany',
    flag: 'germany.svg',
    activity: 'Today, 09:45',
  },
  {
    id: '9',
    user: {
      avatar: '300-10.png',
      userName: 'Olivia Martinez',
      userGmail: 'olivia.martinez@gmail.com',
    },
    role: 'Product Manager',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Italy',
    flag: 'italy.svg',
    activity: 'Current session',
  },
  {
    id: '10',
    user: {
      avatar: '300-11.png',
      userName: 'Jacob Jones',
      userGmail: 'jacob.jones@gmail.com',
    },
    role: 'Analyst',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Ukraine',
    flag: 'ukraine.svg',
    activity: '',
  },
  {
    id: '11',
    user: {
      avatar: '300-12.png',
      userName: 'Daniel Wilson',
      userGmail: 'daniel.wilson@gmail.com',
    },
    role: 'CTO',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Japan',
    flag: 'japan.svg',
    activity: 'Yesterday, 17:45',
  },
  {
    id: '12',
    user: {
      avatar: '300-13.png',
      userName: 'Sophia Lee',
      userGmail: 'sophia.lee@gmail.com',
    },
    role: 'HR',
    status: {
      label: 'On Leave',
      color: 'destructive',
    },
    location: 'South Korea',
    flag: 'south-korea.svg',
    activity: 'Week ago',
  },
  {
    id: '13',
    user: {
      avatar: '300-14.png',
      userName: 'James Miller',
      userGmail: 'james.miller@gmail.com',
    },
    role: 'DevOps',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Russia',
    flag: 'russia.svg',
    activity: 'Today, 11:30',
  },
  {
    id: '14',
    user: {
      avatar: '300-15.png',
      userName: 'Linda Scott',
      userGmail: 'linda.scott@gmail.com',
    },
    role: 'Designer',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Netherlands',
    flag: 'netherlands.svg',
    activity: 'Today, 13:22',
  },
  {
    id: '15',
    user: {
      avatar: '300-16.png',
      userName: 'Anthony Thomas',
      userGmail: 'anthony.thomas@gmail.com',
    },
    role: 'Engineer',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Sweden',
    flag: 'sweden.svg',
    activity: 'Month ago',
  },
  {
    id: '16',
    user: {
      avatar: '300-17.png',
      userName: 'Christopher Martinez',
      userGmail: 'christopher.martinez@gmail.com',
    },
    role: 'Analyst',
    status: {
      label: 'On Leave',
      color: 'destructive',
    },
    location: 'Mexico',
    flag: 'mexico.svg',
    activity: 'Yesterday, 10:50',
  },
  {
    id: '17',
    user: {
      avatar: '300-18.png',
      userName: 'Ronald Richards',
      userGmail: 'ronald.richards@gmail.com',
    },
    role: 'Manager',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Uruguay',
    flag: 'uruguay.svg',
    activity: 'Current session',
  },
  {
    id: '18',
    user: {
      avatar: '300-19.png',
      userName: 'Jennifer Thomas',
      userGmail: 'jennifer.thomas@gmail.com',
    },
    role: 'HR',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Brazil',
    flag: 'brazil.svg',
    activity: 'Today, 14:20',
  },
  {
    id: '19',
    user: {
      avatar: '300-20.png',
      userName: 'Guy Hawkins',
      userGmail: 'guy.hawkins@gmail.com',
    },
    role: 'HR',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Turkey',
    flag: 'turkey.svg',
    activity: 'Current session',
  },
  {
    id: '20',
    user: {
      avatar: '300-21.png',
      userName: 'Natalie Watson',
      userGmail: 'natalie.watson@gmail.com',
    },
    role: 'Editor',
    status: {
      label: 'On Leave',
      color: 'destructive',
    },
    location: 'Finland',
    flag: 'finland.svg',
    activity: 'Week ago',
  },
  {
    id: '21',
    user: {
      avatar: '300-22.png',
      userName: 'Marvin McKinney',
      userGmail: 'marvin.mckenney@gmail.com',
    },
    role: 'Viewer',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Latvia',
    flag: 'latvia.svg',
    activity: 'Week ago',
  },
  {
    id: '22',
    user: {
      avatar: '300-23.png',
      userName: 'Theresa Webb',
      userGmail: 'theresa.webb@gmail.com',
    },
    role: 'Admin',
    status: {
      label: 'On Leave',
      color: 'destructive',
    },
    location: 'Brazil',
    flag: 'brazil.svg',
    activity: 'Current session',
  },
  {
    id: '23',
    user: {
      avatar: '300-24.png',
      userName: 'Brian Ross',
      userGmail: 'brian.ross@gmail.com',
    },
    role: 'Designer',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Norway',
    flag: 'norway.svg',
    activity: 'Today, 08:30',
  },
  {
    id: '24',
    user: {
      avatar: '300-25.png',
      userName: 'Donald Coleman',
      userGmail: 'donald.coleman@gmail.com',
    },
    role: 'Manager',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Ireland',
    flag: 'ireland.svg',
    activity: 'Yesterday, 12:00',
  },
  {
    id: '25',
    user: {
      avatar: '300-26.png',
      userName: 'Jason Reed',
      userGmail: 'jason.reed@gmail.com',
    },
    role: 'Engineer',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Belgium',
    flag: 'belgium.svg',
    activity: 'Month ago',
  },
  {
    id: '26',
    user: {
      avatar: '300-27.png',
      userName: 'Paul Walker',
      userGmail: 'paul.walker@gmail.com',
    },
    role: 'Developer',
    status: {
      label: 'On Leave',
      color: 'destructive',
    },
    location: 'Denmark',
    flag: 'denmark.svg',
    activity: 'Yesterday, 16:00',
  },
  {
    id: '27',
    user: {
      avatar: '300-28.png',
      userName: 'Andrew Mitchell',
      userGmail: 'andrew.mitchell@gmail.com',
    },
    role: 'Product Manager',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Portugal',
    flag: 'portugal.svg',
    activity: 'Today, 12:45',
  },
  {
    id: '28',
    user: {
      avatar: '300-29.png',
      userName: 'Kevin Evans',
      userGmail: 'kevin.evans@gmail.com',
    },
    role: 'Support',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Austria',
    flag: 'austria.svg',
    activity: 'Today, 14:00',
  },
  {
    id: '29',
    user: {
      avatar: '300-30.png',
      userName: 'Steven Harris',
      userGmail: 'steven.harris@gmail.com',
    },
    role: 'Admin',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Greece',
    flag: 'greece.svg',
    activity: 'Current session',
  },
  {
    id: '30',
    user: {
      avatar: '300-31.png',
      userName: 'Thomas Clark',
      userGmail: 'thomas.clark@gmail.com',
    },
    role: 'Analyst',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Switzerland',
    flag: 'switzerland.svg',
    activity: 'Today, 11:00',
  },
  {
    id: '31',
    user: {
      avatar: '300-32.png',
      userName: 'Justin Adams',
      userGmail: 'justin.adams@gmail.com',
    },
    role: 'Viewer',
    status: {
      label: 'On Leave',
      color: 'destructive',
    },
    location: 'Czech Republic',
    flag: 'czech-republic.svg',
    activity: 'Yesterday, 15:30',
  },
  {
    id: '32',
    user: {
      avatar: '300-33.png',
      userName: 'Charles Carter',
      userGmail: 'charles.carter@gmail.com',
    },
    role: 'Engineer',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Hungary',
    flag: 'hungary.svg',
    activity: 'Today, 10:30',
  },
  {
    id: '33',
    user: {
      avatar: '300-34.png',
      userName: 'Jessica Evans',
      userGmail: 'jessica.evans@gmail.com',
    },
    role: 'Designer',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Poland',
    flag: 'poland.svg',
    activity: 'Today, 13:45',
  },
];

export default function TanstackTable<T>({ columns, children, url, queryKey }: Props<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'users', desc: false },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const { getAll } = useApiHandlers()
  // const [sortOrder, setSortOrder] = useState<string>('latest');

  const getTableDatas = async () => {
    try {
      const params = new URLSearchParams({
        page: String(pagination.pageIndex + 1),
        pageSize: String(pagination.pageSize),
        search: searchQuery ?? '', // we'll fix this in the next step
        sortBy: sorting[0]?.id ?? '',
        sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
      });

      const updatedUrl = `${url}${params}`
      const response = await getAll(updatedUrl)

    } catch (error) {
      console.error(error)
    }
  }

  const { } = useQuery({
    queryKey: [queryKey, pagination, searchQuery],
    queryFn: getTableDatas,
    refetchOnWindowFocus: false
  })

  const table = useReactTable({
    columns,
    data: data as T[] ?? [],
    pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
    getRowId: (row: T) => String((row as any)?.id),
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const statusCounts = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        const status = item.status.label;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, []);

  const handleStatusChange = (checked: boolean, value: string) => {
    setSelectedStatuses((prev = []) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  };

  return (
    <DataGrid
      table={table as any}
      recordCount={data?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader>
          <CardHeading>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Search Users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9 w-40"
                />
                {searchQuery.length > 0 && (
                  <Button
                    mode="icon"
                    variant="ghost"
                    className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchQuery('')}
                  >
                    <X />
                  </Button>
                )}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter />
                    Status
                    {selectedStatuses.length > 0 && (
                      <Badge size="sm" appearance="stroke">
                        {selectedStatuses.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3" align="start">
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground">
                      Filters
                    </div>
                    <div className="space-y-3">
                      {Object.keys(statusCounts).map((status) => (
                        <div key={status} className="flex items-center gap-2.5">
                          <Checkbox
                            id={status}
                            checked={selectedStatuses.includes(status)}
                            onCheckedChange={(checked) =>
                              handleStatusChange(checked === true, status)
                            }
                          />
                          <Label
                            htmlFor={status}
                            className="grow flex items-center justify-between font-normal gap-1.5"
                          >
                            {status}
                            <span className="text-muted-foreground">
                              {statusCounts[status]}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeading>
          <div>{children}</div>
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  )
}