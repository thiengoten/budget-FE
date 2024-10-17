import { DataResponse } from '@/queries/useUploadImage'
import axiosInstance from '@/services/axiosConfig'
import {
  BASE_URL,
  CloudinaryUploadResponse,
  UploadImageFormDataKey,
} from '@/types/apiType'

export const uploadImage = async (
  data: File
): Promise<DataResponse<CloudinaryUploadResponse> | any> => {
  return await axiosInstance.post(
    `${BASE_URL}/upload`,
    {
      [UploadImageFormDataKey.IMAGE]: data,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
}
