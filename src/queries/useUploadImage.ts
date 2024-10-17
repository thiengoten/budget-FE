import { uploadImage } from '@/api/UploadImage/api'
import { CloudinaryUploadResponse } from '@/types/apiType'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

export type DataResponse<T> = {
  data: T
  statusCode: number
}

export const useUploadImage = (
  options?: UseMutationOptions<
    DataResponse<CloudinaryUploadResponse>,
    Error,
    File
  >
) => {
  const {
    data: uploadData,
    mutate: onUploadImage,
    isPending: isCreating,
    mutateAsync: onUploadImageAsync,
  } = useMutation<DataResponse<CloudinaryUploadResponse>, Error, File>({
    mutationFn: (data: File) => {
      console.log('🚀 ~ data:', data)
      return uploadImage(data)
    },
    onSuccess(data, _variables, _context) {
      console.log('🚀 ~ onSuccess ~ data:', data)
    },
    onError(error) {
      console.error(error)
    },

    ...options,
  })
  return { onUploadImage, isCreating, onUploadImageAsync, uploadData }
}
