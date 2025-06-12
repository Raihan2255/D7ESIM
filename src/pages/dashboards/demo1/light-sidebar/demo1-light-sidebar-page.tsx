import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';

import { Container } from '@/components/common/container';
import { useApiHandlers } from '@/hooks/useApiHandlers';
import { APP_APIS } from '@/core/apis';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys';
import { IApiResponse } from '@/types/global.types';
import { Globe, MessageSquare, PhoneCall } from 'lucide-react';
import Card from './components/Card';
import UsageSkeleton from './components/UsageSkeleton';

export interface IDashboard {
  id: number
  package: number
  order_live: string
  price: number
  voice: number
  sms: number
  countries: string
  status: string
  unique: any
  transaction: any
  time_allowance_unit: string
  time_allowance_duration: number
  validity_in_days: number
  data_in_gb: number
  usage_data: UsageData
}

export interface UsageData {
  work_order: string
  data_usage_percent: number
  sms_usage_percent: number
  voice_usage_percent: number
}


export function Demo1LightSidebarPage() {
  const { getAll } = useApiHandlers()

  const getDashboardDatas = async () => {
    try {
      const response = await getAll<IApiResponse<IDashboard[]>>(`${APP_APIS.dashboard}?is_paginated=false`, { requiresAuth: true })
      if (response?.data && response?.status) {
        const updatedData = response?.data?.map((item) => ({
          id: item?.id,
          order_id: item?.order_live,
          usage: [
            {
              text: 'Available Data',
              value: item?.usage_data?.data_usage_percent,
              icon: <Globe color="#ffffff" />
            },
            {
              text: 'Call',
              value: item?.usage_data?.voice_usage_percent,
              icon: <PhoneCall color="#ffffff" />
            },
            {
              text: 'Sms',
              value: item?.usage_data?.sms_usage_percent,
              icon: <MessageSquare color="#ffffff" />
            },
          ]
        }))
        return updatedData ?? []
      }
      return []
    } catch (error) {
      console.error(error)
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.dashboard],
    queryFn: getDashboardDatas,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 15 * 60 * 1000, // 15 minutes
    refetchIntervalInBackground: true,
  })

  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="Dashboard"
            description=""
          />
          {/* <ToolbarActions>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button id="date" variant="outline">
                  <CalendarDays size={16} className="me-0.5" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={tempDateRange?.from || defaultStartDate}
                  selected={tempDateRange}
                  onSelect={setTempDateRange}
                  numberOfMonths={2}
                />
                <div className="flex items-center justify-end gap-1.5 border-t border-border p-3">
                  <Button variant="outline" onClick={handleDateRangeReset}>
                    Reset
                  </Button>
                  <Button onClick={handleDateRangeApply}>Apply</Button>
                </div>
              </PopoverContent>
            </Popover>
          </ToolbarActions> */}
        </Toolbar>
      </Container>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {
            isLoading ? (
              <>{
                Array.from({ length: 4 }).map((_, index) => (
                  <UsageSkeleton key={index} />
                ))}</>
            ) : (
              data && data?.map((item) => (
                <Card item={item} key={item?.id} />
              ))
            )
          }
        </div>
      </Container>
    </Fragment >
  );
}
