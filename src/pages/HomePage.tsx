import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/hooks/use-toast'
import { useUploadImage } from '@/queries/useUploadImage'
import Dropzone from '@/components/Dropzone'
import { useCreateBudget } from '@/queries/useCreateBudget'

const formSchema = z.object({
  action: z.string(),
  amount: z.string(),
  image: z.instanceof(File).nullable(),
})

type FormValues = z.infer<typeof formSchema>

export default function HomePage() {
  const { uploadData, onUploadImage } = useUploadImage({
    retry: 2,
  })
  const { onCreateBudget: _ } = useCreateBudget()
  console.log('🚀 ~ HomePage ~ uploadData:', uploadData?.data)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      action: '',
      amount: '',
      image: null,
    },
  })

  function onSubmit(data: FormValues) {
    if (data.image) {
      onUploadImage(data.image)
    }

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 1)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-8 p-7'>
        <FormField
          control={form.control}
          name='action'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select action you want' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='pay'>Pay</SelectItem>
                      <SelectItem value='recive'>Recive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Enter your number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                {/* <DragAndDropImage onImageUpload={field.onChange} /> */}
                <Dropzone onImageUpload={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
