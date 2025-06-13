import DialogContent, { Dialog, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog'
import { Clock, Globe, Search, X } from 'lucide-react'
import { CardData } from '../../types'
import { Input } from '@/components/ui/input'
import { useMemo, useState } from 'react'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  item: CardData
}

export default function DetailsModal({ open, setOpen, item }: Props) {
  const [searchTerm, setSearchTerm] = useState("")


  const filteredCountries = useMemo(() => {
    if (!item?.countries) return []
    return item.countries.filter((country) =>
      country?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [item?.countries, searchTerm])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="p-4">
            {/* Header Info */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-700">
              <div className="flex items-center gap-2">
                <Globe className="text-blue-600" />
                <p className="font-medium">1 GB</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-yellow-600" />
                <p className="font-medium">5 Days</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-4"></div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-9"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Country List */}
            <div className="overflow-y-auto max-h-[300px] min-h-[300px] space-y-3 pr-2">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition"
                  >
                    <img
                      className="w-8 h-8 rounded object-cover border"
                      src={country?.logo}
                      alt={country?.name}
                    />
                    <p className="text-sm font-medium text-gray-800">{country?.name}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No countries found.</p>
              )}
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}