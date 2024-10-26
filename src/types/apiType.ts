export const BASE_URL = 'http://localhost:3000'

export const UploadImageFormDataKey = {
  IMAGE: 'image',
} as const

//*Payload Types

export type TransactionType = 'INCOME' | 'EXPENSE'

export type CreateBudgetPayload = {
  name: string
  typeOfTransaction: TransactionType
  amount: number
  imageUrl?: string | null
  description?: string
}

export type CloudinaryUploadResponse = {
  api_key: string
  asset_id: string
  bytes: number
  created_at: string
  etag: string
  folder: string
  format: string
  height: number
  original_filename: string
  placeholder: boolean
  public_id: string
  resource_type: string
  secure_url: string
  signature: string
  tags: string[] // array of strings
  type: string
  url: string
  version: number
  version_id: string
  width: number
}
