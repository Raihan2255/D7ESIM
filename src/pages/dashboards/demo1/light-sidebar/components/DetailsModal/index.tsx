import DialogContent, { Dialog, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog'
import { Clock, Globe } from 'lucide-react'
import { CardData } from '../../types'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  item: CardData
}

export default function DetailsModal({ open, setOpen, item }: Props) {
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

            {/* Country List */}
            <div className="overflow-y-auto max-h-[300px] space-y-3 pr-2">
              {item?.countries?.map((country, index) => (
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
              ))}
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}