import CircularProgress from "@/core/components/CircularProgress";
import { IOrderDetails } from "../types";
import { Skeleton } from "@/components/ui/skeleton";


type Props = {
  data: IOrderDetails
  isLoading: boolean
}

export default function UsageModal({ data, isLoading }: Props) {

  return (
    <>
      {
        isLoading ? (
          <div>
            <div className='flex items-center gap-1'>
              <Skeleton className="h-3 w-40" />
            </div>

            <div className="grid grid-cols-3 mt-6 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <Skeleton className="h-2 w-20" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className='flex items-center gap-1'>
              <p className='text-black font-semibold'>Order Id -</p>
              <p className='text-gray-500 font-semibold'>{data?.work_order}</p>
            </div>
            <div className="grid grid-cols-3 mt-6">
              <div className="flex flex-col items-center gap-3">
                <CircularProgress value={data?.data_usage_percent} />
                <p className="font-semibold">Available Data</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <CircularProgress trackColor="#FFD7D9" progressColor="#DA1E28" value={data?.voice_usage_percent} />
                <p className="font-semibold">Call</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <CircularProgress trackColor="#F9E59E" progressColor="#F1C21B" value={data?.sms_usage_percent} />
                <p className="font-semibold">Sms</p>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}