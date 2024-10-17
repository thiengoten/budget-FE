import React, { useState } from 'react'

interface DragAndDropImageProps {
  onImageUpload: (file: File) => void
}

const DragAndDropImage: React.FC<DragAndDropImageProps> = ({
  onImageUpload,
}) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file))
      onImageUpload(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file))
      onImageUpload(file)
    }
  }

  return (
    <div className='flex flex-col items-center space-y-4'>
      <div
        className={`w-64 h-64 border-2 ${
          isDragging ? 'border-blue-400' : 'border-dashed'
        } border-gray-400 flex justify-center items-center rounded-md`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <img
            src={preview}
            alt='Preview'
            className='w-full h-full object-cover rounded-md'
          />
        ) : (
          <p className='text-gray-500'>Drag & Drop or Click to Upload</p>
        )}
      </div>
      <input
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden'
        id='image-upload'
      />
      <label
        htmlFor='image-upload'
        className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600'
      >
        {preview ? 'Change Image' : 'Upload Image'}
      </label>
    </div>
  )
}

export default DragAndDropImage
