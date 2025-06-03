import { API_END_POINTS } from "@/apis/api-constants";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useApiHandlers } from "@/hooks/useApiHandlers";
import { IApiResponse } from "@/types/global.types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";

type Props = {}

export function Verify({ }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const uid = searchParams.get('uid')
  const token = searchParams.get('token')

  const { getAll } = useApiHandlers()

  const getDatas = async () => {
    try {
      const response = await getAll<IApiResponse<any>>(`${API_END_POINTS.verify.endPoint}?uid=${uid}&token=${token}`)
      if (response?.data && response?.status) {
        navigate("/")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.verfiy, uid, token],
    queryFn: getDatas,
    refetchOnWindowFocus: false,
    enabled: !!(uid && token)
  })

  return (
    <div>Verify</div>
  )
}