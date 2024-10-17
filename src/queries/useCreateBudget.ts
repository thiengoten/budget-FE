import { createBudget } from '@/api/Buddget'
import { CreateBudgetPayload } from '@/types/apiType'
import {
  useMutation,
  type UseMutationOptions,
  type DefaultError,
} from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'

export const useCreateBudget = (
  options?: UseMutationOptions<
    AxiosResponse<CreateBudgetPayload>,
    DefaultError,
    CreateBudgetPayload
  >
) => {
  const { mutate: onCreateBudget, isPending: isCreating } = useMutation<
    AxiosResponse<CreateBudgetPayload>,
    DefaultError,
    CreateBudgetPayload
  >({
    mutationFn: (data: CreateBudgetPayload) => {
      console.log('🚀 ~ data:', data)
      return createBudget(data)
    },
    onSuccess(data, variables, _context) {
      console.log('🚀 ~ onSuccess ~ data:', data, variables)
    },
    onError(error) {
      console.error(error)
    },
    ...options,
  })
  return { onCreateBudget, isCreating }
}
