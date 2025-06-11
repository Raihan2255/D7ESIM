import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { truncateText } from "@/utils/helper"


type Props = {
  item: any
}

const TEXT_LENGTH = 28

export default function PlanCard({ item }: Props) {
  const shouldShowTooltip = item?.name?.length > TEXT_LENGTH

  return (
    <div className={`flex flex-col shadow-[0px_0px_23px_0px_#BCBCBC40] rounded-3xl md:rounded-[0.8rem] lg:rounded-[1.066rem] xl:rounded-[1.3rem] 2xl:rounded-[1.6rem] 3xl:rounded-[2rem] p-4 md:p-[0.6rem] lg:p-[0.8rem] xl:p-[1rem] 2xl:p-[1.2rem] 3xl:p-[1.5rem] bg-gradient-to-b from-[#658DEF] to-[#6FC7D8]`}>
      <div className='flex items-center gap-2 md:gap-[0.4rem] lg:gap-[0.533rem] xl:gap-[0.666rem] 2xl:gap-[0.8rem] 3xl:gap-[1rem] pb-5 border-b-[1px] border-b-white'>
        {
          shouldShowTooltip ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <h5 className='text-white font-semibold text-[16px] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.2rem] 3xl:text-[2rem]'>
                  {truncateText(item?.name, TEXT_LENGTH)}
                </h5>
              </TooltipTrigger>
              <TooltipContent>{item?.name}</TooltipContent>
            </Tooltip>
          ) : (
            <h5 className='text-white font-semibold text-[16px] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.2rem] 3xl:text-[1.5rem]'>{item?.name}</h5>
          )
        }
      </div>
      <div className='bg-white flex-1 rounded-[16px] my-6 md:my-[0.6rem] lg:my-[0.8rem] xl:my-[1rem] 2xl:my-[1.2rem] 3xl:my-[1.5rem] p-8 md:p-[0.6rem] lg:p-[0.8rem] xl:p-[1rem] 2xl:p-[1.2rem] 3xl:p-[1.5rem]'>
        <div>
          <div className='flex items-center justify-between border-b-[1px] border-b-[#C6C6C6] pb-4 md:pb-[0.6rem] lg:pb-[0.8rem] xl:pb-[1rem] 2xl:pb-[1.2rem] 3xl:pb-[1.5rem]'>
            <p className='text-[#5F5F5F] font-semibold uppercase text-[14px] md:text-[0.4rem] lg:text-[0.533rem] xl:text-[0.666rem] 2xl:text-[0.8rem] 3xl:text-[1rem]'>Coverage</p>
            <p className={`text-[#0A66FE] cursor-pointer font-bold uppercase text-[14px] md:text-[0.4rem] lg:text-[0.533rem] xl:text-[0.666rem] 2xl:text-[0.8rem] 3xl:text-[1rem] border-[1px] border-[#0A66FE] p-2 md:p-[0.2rem] lg:p-[0.266rem] xl:p-[0.333rem] 2xl:p-[0.4rem] 3xl:p-[0.5rem] rounded-[3px] md:rounded-[0.15em] lg:rounded-[0.2rem] xl:rounded-[0.25rem] 2xl:rounded-[0.3rem] 3xl:rounded-[0.375rem]`}>
              {item?.country?.length} Countries
            </p>

          </div>
          <div className='flex items-center pt-6 md:pt-[0.6rem] lg:pt-[0.8rem] xl:pt-[1rem] 2xl:pt-[1.2rem] 3xl:pt-[1.5rem]'>
            <div className='flex-1 font-semibold border-r-2 text-[1rem] md:text-[0.4rem] lg:text-[0.533rem] xl:text-[0.666rem] 2xl:text-[0.8rem] 3xl:text-[1rem]'>{item?.data_in_gb} GB</div>
            <div className='flex-1 px-2 font-semibold border-r-2 text-[1rem] md:text-[0.4rem] lg:text-[0.533rem] xl:text-[0.666rem] 2xl:text-[0.8rem] 3xl:text-[1rem] text-center'>{item?.validity_in_days} Days</div>
            {
              item?.call_included ? (
                <div className='flex-1 font-semibold text-[1rem] md:text-[0.4rem] lg:text-[0.533rem] xl:text-[0.666rem] 2xl:text-[0.8rem] 3xl:text-[1rem] text-right'>
                  {item?.sms} SMS
                </div>
              ) : (
                <div className='text-[#06AD2A] flex-1 font-semibold text-[1rem] md:text-[0.4rem] lg:text-[0.533rem] xl:text-[0.666rem] 2xl:text-[0.8rem] 3xl:text-[1rem] text-right'>$ {item?.price?.toFixed(2) ?? "0.00"}</div>
              )
            }
          </div>
          {
            item?.call_included && (
              <div className='flex items-center md:mt-[0.6rem] lg:mt-[0.8rem] xl:mt-[1rem] 2xl:mt-[1.2rem] 3xl:mt-[1.5rem]'>
                <div className='flex-1 font-semibold border-r-2 text-[1rem] md:text-[0.4rem] lg:text-[0.533rem] xl:text-[0.666rem] 2xl:text-[0.8rem] 3xl:text-[1rem]'>{item?.voice} Mins Calls</div>
                <div className='text-[#06AD2A] flex-1 font-semibold text-[1rem] md:text-[0.4rem] lg:text-[0.533rem] xl:text-[0.666rem] 2xl:text-[0.8rem] 3xl:text-[1rem] text-right'>$ {item?.price?.toFixed(2) ?? "0.00"}</div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}