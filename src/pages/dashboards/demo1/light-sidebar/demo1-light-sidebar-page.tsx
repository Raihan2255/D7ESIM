import { Fragment, useEffect } from 'react';
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
import { IDashboard } from './types';
import { useLocation, useNavigate } from 'react-router';
import { appRoutes } from '@/routes/app-routes';

export function Demo1LightSidebarPage() {
  const { getAll } = useApiHandlers()
  const navigate = useNavigate()
  const location = useLocation()

  const getDashboardDatas = async () => {
    try {
      const response = await getAll<IApiResponse<IDashboard[]>>(`${APP_APIS.dashboard}?is_paginated=false`, { requiresAuth: true })

      if (response?.data && response?.status) {
        const updatedData = response?.data?.map((item) => ({
          id: item?.id,
          order_id: item?.order_details?.package?.package_template?.name,
          usage: [
            {
              text: 'Available Data',
              value: item?.usage_data?.data_usage_percent,
              icon: <Globe size={20} color="#ffffff" />
            },
            {
              text: 'Call',
              value: item?.usage_data?.voice_usage_percent,
              icon: <PhoneCall size={20} color="#ffffff" />
            },
            {
              text: 'Sms',
              value: item?.usage_data?.sms_usage_percent,
              icon: <MessageSquare size={20} color="#ffffff" />
            },
          ],
          qr_code: item?.order_details?.qr_code,
          created_date: item?.order_details?.package?.created_date,
          expiry_date: item?.order_details?.package?.expiry_date,
          countries: item?.supported_countries
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

  useEffect(() => {
    if (!data) {
      navigate(appRoutes.purchase)
    }
  }, [data])

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
