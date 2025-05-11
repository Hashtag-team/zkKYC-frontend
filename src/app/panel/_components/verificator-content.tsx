import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWriteContract } from 'wagmi'
import { ABI } from '@/lib/web3/abi'
import { CLAIM_TYPE, CONTRACT_ADDRESS } from '@/lib/web3/constants'
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
import { toast } from 'sonner'

// Схема валидации формы
const formSchema = z.object({
  did: z.string().min(1, 'DID обязателен'),
})

interface Props {
  className?: string
}

type ClaimForm = z.infer<typeof formSchema>

export const VerificatorContent: React.FC<Props> = ({ className }) => {
  const { writeContractAsync } = useWriteContract()

  const form = useForm<ClaimForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      did: '',
    },
  })

  const onSubmit = async (values: ClaimForm) => {
    try {
      // Генерация данных согласно требованиям
      const claimValue = 'true'
      const proofValue = '0x123abc'
      const expirationDate = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60 // Текущее время + 1 год

      await writeContractAsync({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'addVerifiableClaim',
        args: [
          values.did,
          CLAIM_TYPE,
          claimValue,
          proofValue,
          BigInt(expirationDate),
        ],
      })

      toast('Верификационное утверждение добавлено')
      form.reset()
    } catch (error) {
      toast.error('Ошибка при добавлении утверждения')
      console.error(error)
    }
  }

  return (
    <div className={className}>
      <h1 className="mb-6 text-2xl font-bold">Интерфейс верификатора</h1>

      <div className="max-w-xl rounded-lg border p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="did"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DID пользователя</FormLabel>
                  <FormControl>
                    <Input placeholder="did:example:123..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2 rounded bg-gray-100 p-4">
              <p className="text-sm">
                <strong>Тип утверждения:</strong> verify
              </p>
              <p className="text-sm">
                <strong>Значение:</strong> true
              </p>
              <p className="text-sm">
                <strong>Срок действия:</strong> 1 год с текущей даты
              </p>
            </div>

            <Button type="submit" className="w-full">
              Добавить верификационное утверждение
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
