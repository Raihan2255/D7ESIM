

type Props = {
  item: any
}

export default function Card({ item }: Props) {
  // const base64 = item?.qr_code

  // console.log("base64=>>>", base64);

  return (
    <div className='p-5 rounded-[20px] border-2'>
      <div>
        <div className='flex items-center gap-1'>
          <p className='text-black font-semibold'>Order Id -</p>
          <p className='text-gray-500 font-semibold'>{item?.order_id}</p>
        </div>
        <p></p>
      </div>
      <div className='mt-6 flex items-center gap-4'>
        <div className="flex flex-1 flex-col gap-2">
          {
            item?.usage?.map((details: any, index: number) => (
              <div key={index} className='flex items-center gap-4'>
                <div className='size-[30px] bg-rose-300 rounded-[6px] flex items-center justify-center'>
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
        <div className="size-[150px]" >
          <img
            title={item?.order_id}
            className="w-full h-full"
            src={item?.qr_code}
            alt={item?.order_id}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}