

type Props = {
  item: any
}

export default function Card({ item }: Props) {
  return (
    <div className='p-6 rounded-[20px] border-2'>
      <div className='flex items-center gap-1'>
        <p className='text-black font-semibold'>Order Id -</p>
        <p className='text-gray-500 font-semibold'>{item?.order_id}</p>
      </div>
      <div className='mt-6 flex flex-col gap-4'>
        {
          item?.usage?.map((details: any, index: number) => (
            <div key={index} className='flex items-center gap-4'>
              <div className='size-[36px] bg-rose-300 rounded-[6px] flex items-center justify-center'>
                {details?.icon}
              </div>
              <div className='flex-1'>
                <p className='text-black font-semibold'>{details?.text}</p>
                <div className='flex items-center gap-4'>
                  <div className="relative flex-1 h-2 rounded-full bg-pink-100/60">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
                      style={{ width: `${details?.value}%` }}
                    />
                  </div>
                  <div className='w-[30px]'>
                    <p>{details?.value}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}