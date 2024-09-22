import { Card } from '@/components/ui/card'
import { File, Upload } from 'lucide-react'
import { useCallback, useState } from 'react'

type DropzoneProps = {
  onChange: (...event: any[]) => void
  onBlur: () => void
  value: string
  disabled?: boolean
  name: string
  ref: React.RefCallback<HTMLInputElement>
}

export default function Dropzone(props: DropzoneProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please upload an image file.')
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      handleFile(file)
    },
    [handleFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  return (
    <Card
      className={`w-full max-w-md mx-auto h-64 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors ${
        isDragging ? 'bg-primary/10' : 'bg-background'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type='file'
        accept='image/*'
        onChange={handleChange}
        className='hidden'
        id='imageUpload'
      />
      <label
        htmlFor='imageUpload'
        className='w-full h-full flex flex-col items-center justify-center cursor-pointer'
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt='Preview'
            className='max-w-full max-h-full object-contain'
          />
        ) : (
          <>
            {isDragging ? (
              <File className='w-16 h-16 text-primary mb-4' />
            ) : (
              <Upload className='w-16 h-16 text-muted-foreground mb-4' />
            )}
            <p className='text-muted-foreground'>
              {isDragging
                ? 'Drop the image here'
                : 'Drag & drop an image here, or click to select'}
            </p>
          </>
        )}
      </label>
    </Card>
  )
}
