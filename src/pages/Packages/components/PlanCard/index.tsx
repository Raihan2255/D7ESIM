

type Props = {
  item: any
}

export default function PlanCard({ item }: Props) {
  return (
    <div className='flex flex-col bg-[white] p-6 md:p-[0.6rem] lg:p-[0.8rem] xl:p-[1rem] 2xl:p-[1.2rem] 3xl:p-[1.5rem] rounded-3xl md:rounded-[0.8rem] lg:rounded-[1.066rem] xl:rounded-[1.333rem] 2xl:rounded-[1.6rem] 3xl:rounded-[2rem] shadow-[0px_0px_23px_0px_#BCBCBC40]'>
      <p className='font-semibold text-[1rem] md:text-[0.575em] lg:text-[0.766rem] xl:text-[0.958rem] 2xl:text-[1.15rem] 3xl:text-[1.437rem]'>{item?.name}</p>
      <div className='flex items-center justify-between mt-3.5 md:mt-[0.35em] lg:mt-[0.466rem] xl:mt-[0.583rem] 2xl:mt-[0.7rem] 3xl:mt-[0.875rem] pb-2 md:pb-[0.4rem] lg:pb-[0.5rem] xl:pb-[0.6rem] 2xl:pb-[0.8rem] 3xl:pb-[1rem] border-b-[1px] border-b-[#C6C6C6]'>
        <p className='uppercase font-semibold text-[#5F5F5F] text-[14px] md:text-[0.5em] lg:text-[0.666rem] xl:text-[0.833rem] 2xl:text-[1rem] 3xl:text-[1.25rem]'>COVERAGE</p>
        <p className='uppercase border-[1px] border-[#0A66FE] cursor-pointer font-bold text-[#0A66FE] text-[14px] md:text-[0.45rem] lg:text-[0.6rem] xl:text-[0.75rem] 2xl:text-[0.9rem] 3xl:text-[1.125rem] p-1 md:p-[0.2rem] lg:p-[0.266rem] xl:p-[0.333rem] 2xl:p-[0.4rem] 3xl:p-[0.5rem] rounded-[3px] md:rounded-[0.15em] lg:rounded-[0.2rem] xl:rounded-[0.25rem] 2xl:rounded-[0.3rem] 3xl:rounded-[0.375rem]'>{item?.country?.length} COUNTRIES</p>
      </div>
      <div className='flex-1 mt-8 md:mt-[1.05rem] lg:mt-[1.4rem] xl:mt-[1.75rem] 2xl:mt-[2.1rem] 3xl:mt-[2.625rem]'>
        <div className='grid grid-cols-3'>
          <div className='border-r-[1px] border-r-[#D6D6D6]'>
            <p className='text-left md:text-center text-[#32A4E3] font-semibold text-[1rem] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.2rem] 3xl:text-[1.5rem]'>{item?.data_available}</p>
          </div>
          <div className='border-r-[1px] border-r-[#D6D6D6]'>
            <p className='text-center text-[#32A4E3] font-semibold text-[1rem] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.2rem] 3xl:text-[1.5rem]'>{item?.validity?.toFixed(0) + "" + item?.validity_period}</p>
          </div>
          {
            item?.include_call ? (
              <div>
                <p className='text-right md:text-center text-[#32A4E3] font-semibold text-[1rem] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.2rem] 3xl:text-[1.5rem]'>{item?.texts} SMS</p>
              </div>
            ) : (
              <div>
                <p className='text-center text-[#06AD2A] font-semibold text-[1rem] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.2rem] 3xl:text-[1.5rem]'>
                  $ {item?.price?.toFixed(2)}
                </p>
              </div>
            )
          }
        </div>
      </div>

      {
        item?.include_call && (
          <div className='grid grid-cols-2 mt-6 md:mt-[0.6rem] lg:mt-[0.8rem] xl:mt-[1rem] 2xl:mt-[1.2rem] 3xl:mt-[1.5rem]'>
            <div className='border-r-[1px] border-r-[#D6D6D6]'>
              <p className='text-center text-[#32A4E3] font-semibold text-[1rem] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.2rem] 3xl:text-[1.5rem]'>
                {item?.calls} Mins Calls
              </p>
            </div>
            <div>
              <p className='text-center text-[#06AD2A] font-semibold text-[1rem] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.2rem] 3xl:text-[1.5rem]'>
                $ {item?.price?.toFixed(2)}
              </p>
            </div>
          </div>
        )
      }

    </div>
  )
}