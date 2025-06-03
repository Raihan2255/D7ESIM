import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useApiHandlers } from '@/hooks/useApiHandlers'
import { cn } from '@/lib/utils'
import { IApiResponse } from '@/types/global.types'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'

type Props = {
  url: string
  lableKey?: string
  queryKey: string
  value: any
  onChange: (value: Option) => void
}

type Option = {
  value: any;
  label: any;
}


export default function Autocomplete({ url, lableKey = "name", queryKey, onChange, value }: Props) {
  const [open, setOpen] = React.useState(false)

  const { getAll } = useApiHandlers()

  const getOptions = async () => {
    try {
      const response = await getAll<IApiResponse<any[]>>(`${url}?is_paginated=false`)
      if (response?.data && response?.status) {
        const options = response?.data?.map((item) => ({
          value: item?.id,
          label: item[lableKey]
        }))
        return options ?? []
      }
    } catch (error) {

    }
  }

  const { data } = useQuery({
    queryKey: [queryKey, url],
    queryFn: getOptions,
    enabled: !!url,
    refetchOnWindowFocus: false
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value?.label || "Select item..."}

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search item..." className="h-9" />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item?.value}
                  value={item?.value}
                  onSelect={(currentValue) => {
                    const newValue = data?.find((val) => val?.label === currentValue)
                    if (newValue) {
                      onChange(newValue)
                    }
                    setOpen(false)
                  }}
                >
                  {item?.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item?.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}