import { useApiHandlers } from "@/hooks/useApiHandlers";
import { IApiResponse } from "@/types/global.types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteRowOptions {
  url: string;
  id: number;
  queryKey: string;
}

// useHandleStatusChange.ts
export const useHandleStatusChange = () => {
  const { updatePatch } = useApiHandlers();
  const queryClient = useQueryClient();

  return async ({ url, id, queryKey }: DeleteRowOptions) => {
    try {
      const payload = { instance_ids: [id] };
      const response = await updatePatch<IApiResponse<any>>(url, payload);

      if (response?.data && response?.status) {
        toast.success(response?.message || "Deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting");
    } finally {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  };
};
