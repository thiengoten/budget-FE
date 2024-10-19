import { BASE_URL, CreateBudgetPayload } from '@/types/apiType'
import { Budget } from './helpers'
import axiosInstance from '@/services/axiosConfig'

export const getAllBudgets = async () => {
  return await axiosInstance.get<Budget>(`${BASE_URL}/budget`)
}

export const createBudget = async (data: CreateBudgetPayload) => {
  return await axiosInstance.post(`${BASE_URL}/budget`, data)
}
