import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWriteContract } from 'wagmi'
import { ABI } from '@/lib/web3/abi'
import { CONTRACT_ADDRESS } from '@/lib/web3/constants'
import { ROLES } from '@/lib/web3/roles'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

// Схема валидации формы
const formSchema = z.object({
  address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Некорректный адрес кошелька'),
  role: z.enum(['REGULATOR', 'BUSINESS', 'VERIFIER']),
})

interface Props {
  className?: string
}

type RoleForm = z.infer<typeof formSchema>

export const AdminContent: React.FC<Props> = ({ className }) => {
  const { writeContractAsync } = useWriteContract()

  const form = useForm<RoleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      role: 'BUSINESS',
    },
  })

  const onSubmit = async (values: RoleForm) => {
    try {
      // Определяем хеш роли в зависимости от выбора
      const roleHash = ROLES[values.role]

      await writeContractAsync({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'grantRole',
        args: [roleHash, values.address as `0x${string}`],
      })

      toast('Роль назначена')

      form.reset()
    } catch {
      toast.error('Ошибка')
    }
  }

  return (
    <div className={className}>
      <h1 className="mb-6 text-2xl font-bold">Admin интерфейс</h1>

      <div className="flex flex-col items-start gap-x-2 sm:flex-row">
        <div className="min-w-md rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Назначение ролей</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес кошелька</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Роль</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите роль" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="REGULATOR">Регулятор</SelectItem>
                        <SelectItem value="BUSINESS">Бизнес</SelectItem>
                        <SelectItem value="VERIFIER">Верификатор</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Назначить роль
              </Button>
            </form>
          </Form>
        </div>

        <div className="max-w-md rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Отзыв ролей</h2>
          <p className="text-muted-foreground">
            Для отзыва ролей используйте функцию revokeRole в контракте.
            Аналогичная форма может быть реализована по примеру выше.
          </p>
        </div>
      </div>
    </div>
  )
}
