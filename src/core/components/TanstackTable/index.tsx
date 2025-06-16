import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardHeading, CardTable } from '@/components/ui/card'
import { DataGrid } from '@/components/ui/data-grid'
import { DataGridPagination } from '@/components/ui/data-grid-pagination'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useApiHandlers } from '@/hooks/useApiHandlers'
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, RowSelectionState, SortingState, useReactTable } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { PaginationResponse } from './types'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router'
import DebouncedSearchInput from './components/DebouncedSearchInput'
import { getSearchParams, setSearchParams } from '@/utils/url-params'

type Props<T> = {
  columns: ColumnDef<T>[]
  queryKey: string
  url: string
  children?: ReactNode
  extraParams?: Record<string, string | number | boolean | null | undefined>
}

export default function TanstackTable<T>({ columns, children, url, queryKey, extraParams }: Props<T>) {

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: '', desc: false },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { getAll } = useApiHandlers()

  const getTableDatas = async () => {
    try {
      const params = new URLSearchParams();
      // Add only if values exist
      if (pagination.pageIndex != null) {
        params.append('page', String(pagination.pageIndex + 1));
      }

      if (pagination.pageSize != null) {
        params.append('pageSize', String(pagination.pageSize));
      }

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      if (sorting[0]?.id) {
        params.append('sortBy', sorting[0].id);
        params.append('sortOrder', sorting[0].desc ? 'desc' : 'asc');
      }

      // Add extraParams if provided
      if (extraParams) {
        Object.entries(extraParams).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            params.set(key, String(value));
          }
        });
      }

      const updatedUrl = `${url}?${params.toString()}`
      const response = await getAll<PaginationResponse<T>>(updatedUrl, { requiresAuth: true })
      return response?.data
    } catch (error) {
      console.error(error)
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, pagination, searchQuery, sorting, extraParams],
    queryFn: getTableDatas,
    refetchOnWindowFocus: false,
    enabled: !!url && pagination.pageSize > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 15 * 60 * 1000, // 15 minutes
    refetchIntervalInBackground: true,
  })

  const table = useReactTable({
    columns,
    data: data?.results as T[] ?? [],
    pageCount: Math.ceil((data?.total_count || 0) / pagination.pageSize),
    manualPagination: true, // Important!
    manualSorting: true,    // Optional, if sorting is server-side
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

  const syncStateWithURL = () => {
    const pageParam = parseInt(getSearchParams("page") || "1", 10);
    const pageSizeParam = getSearchParams('pageSize');
    const searchParam = getSearchParams('search');

    const pageIndex = pageParam ? parseInt(String(pageParam), 10) - 1 : 0;
    const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : 10;

    // Prevent unnecessary state updates (avoid render loops)
    setPagination({ pageIndex, pageSize });

    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }

  useEffect(() => {
    syncStateWithURL()
    // Event listener for popstate to handle back/forward navigation
    const handlePopState = () => {
      syncStateWithURL();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {

    const params: Record<string, string | number> = {
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      search: searchQuery || '',
    };

    const sort = sorting[0];

    if (sort?.id) {
      params.sortBy = sort.id;
      params.sortOrder = sort.desc ? 'desc' : 'asc';
    }

    if (extraParams) {
      Object.entries(extraParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params[key] = String(value);
        }
      });
    }

    setSearchParams(params);

  }, [pagination, searchQuery, sorting, extraParams]);


  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', String(pagination.pageIndex + 1));
    params.set('pageSize', String(pagination.pageSize));

    if (searchQuery) {
      params.set('search', searchQuery);
    }

    if (sorting[0]?.id) {
      params.set('sortBy', sorting[0].id);
      params.set('sortOrder', sorting[0].desc ? 'desc' : 'asc');
    }

    const currentSearch = searchParams.toString();
    const newSearch = params.toString();

    if (extraParams) {
      Object.entries(extraParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params.set(key, String(value));
        }
      });
    }

    // Only navigate if the URL params are different
    if (currentSearch !== newSearch) {
      navigate({ search: newSearch }, { replace: true });
    }
  }, [pagination, searchQuery, sorting, extraParams]);

  useEffect(() => {
    if (searchQuery) {
      setPagination((prev) => ({ pageIndex: 0, pageSize: prev.pageSize }))
    }
  }, [searchQuery])

  return (
    <DataGrid
      table={table as any}
      recordCount={data?.total_count || 0}
      tableLayout={{
        columnsPinnable: false,
        columnsMovable: false,
        columnsVisibility: true,
        cellBorder: true,
        stripped: true,
        columnsResizable: true,
        dense: true,
      }}
      loadingMode='skeleton'
      isLoading={isLoading}
    >
      <Card>
        <CardHeader>
          <CardHeading>
            <div className="flex items-center gap-2.5">
              <div className='overflow-hidden flex items-center border-2 py-1 px-2 rounded-[6px] gap-2'>
                <Search className="size-4 text-muted-foreground" />
                <DebouncedSearchInput
                  onChange={(value) => {
                    setSearchQuery(value)
                    // if (value !== "") {
                    //   setPagination((prev) => ({ pageIndex: 0, pageSize: prev.pageSize }))
                    // }
                  }}
                  value={searchQuery}
                />
                {searchQuery.length > 0 && (
                  <Button
                    mode="icon"
                    variant="ghost"
                    className="h-6 w-6 bg-gray-50"
                    onClick={() => setSearchQuery('')}
                  >
                    <X />
                  </Button>
                )}
              </div>
              {/* <Popover>
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
              </Popover> */}
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