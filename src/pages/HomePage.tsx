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
import Dropzone from '@/components/Dropzone'
import { TYPE_OF_TRANSACTION } from '@/utils/constants'
import { useUploadImage } from '@/queries/useUploadImage'
import { useCreateBudget } from '@/queries/useCreateBudget'
import { CreateBudgetPayload } from '@/types/apiType'

const formSchema = z.object({
  action: z.enum([TYPE_OF_TRANSACTION.INCOME, TYPE_OF_TRANSACTION.EXPENSE]),
  amount: z.string(),
  image: z.instanceof(File).nullable(),
})

type FormValues = z.infer<typeof formSchema>

export default function HomePage() {
  const { onUploadImageAsync } = useUploadImage({
    retry: 1,
  })

  const { onCreateBudget } = useCreateBudget()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      action: TYPE_OF_TRANSACTION.INCOME,
      amount: '',
      image: null,
    },
  })

  async function onSubmit(data: FormValues) {
    const budgetData: CreateBudgetPayload = {
      name: 'test',
      typeOfTransaction: data.action,
      amount: Number(data.amount),
    }

    if (data.image) {
      const imageResponse = await onUploadImageAsync(data.image)
      console.log('🚀 ~ onSubmit ~ imageResponse:', imageResponse)
      budgetData.imageUrl = imageResponse?.data?.secure_url
    }
    console.log('🚀 ~ onSubmit ~ budgetData:', budgetData)

    onCreateBudget(budgetData)
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={TYPE_OF_TRANSACTION.INCOME}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select action you want' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={TYPE_OF_TRANSACTION.INCOME}>
                        Income
                      </SelectItem>
                      <SelectItem value={TYPE_OF_TRANSACTION.EXPENSE}>
                        Expense
                      </SelectItem>
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
