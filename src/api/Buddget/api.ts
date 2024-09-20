import { BASE_URL } from '@/types/apiType'
import { Budget } from './helpers'
import axiosInstance from '@/services/axiosConfig'

export const getAllBudgets = async () => {
  return await axiosInstance.get<Budget>(`${BASE_URL}/budget`)
}
