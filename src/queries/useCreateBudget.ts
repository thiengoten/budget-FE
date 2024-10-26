import { createBudget } from '@/api/Buddget'
import { toast } from '@/components/hooks/use-toast'
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
  const {
    data: budgetData,
    mutate: onCreateBudget,
    isPending: isCreating,
    mutateAsync: onCreateBudgetAsync,
  } = useMutation<
    AxiosResponse<CreateBudgetPayload>,
    DefaultError,
    CreateBudgetPayload
  >({
    mutationFn: (data: CreateBudgetPayload) => {
      console.log('🚀 ~ data:', data)
      return createBudget(data)
    },
    onSuccess(_data, _variables, _context) {
      toast({
        title: 'Budget created successfully',
        variant: 'success',
      })
    },
    onError(error) {
      console.log('🚀 ~ error:', error)
      toast({
        title: 'Failed to create budget',
        description: Array.isArray(error.message)
          ? error.message.join(', ')
          : error.message || 'An unexpected error occurred',
        variant: 'destructive',
      })
    },
    ...options,
  })
  return { onCreateBudget, isCreating, budgetData, onCreateBudgetAsync }
}
