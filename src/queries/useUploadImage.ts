import { uploadImage } from '@/api/UploadImage/api'
import { toast } from '@/components/hooks/use-toast'
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
      return uploadImage(data)
    },
    onSuccess(data, _variables, _context) {
      console.log('🚀 ~ onSuccess ~ data:', data)
      toast({
        title: 'Image uploaded successfully',
        description: 'Your image has been uploaded successfully',
        variant: 'success',
      })
    },
    onError(_error) {
      toast({
        title: 'Image upload failed',
        description: 'Failed to upload image. Please try again later.',
        variant: 'destructive',
      })
    },

    ...options,
  })
  return { onUploadImage, isCreating, onUploadImageAsync, uploadData }
}
