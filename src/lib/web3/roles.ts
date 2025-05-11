import { ABI } from './abi'
import { CONTRACT_ADDRESS } from './constants'
import { useReadContract } from 'wagmi'

// Хеши ролей (должны совпадать с контрактом)
export const ROLES: Record<string, `0x${string}`> = {
  ADMIN: '0x0000000000000000000000000000000000000000000000000000000000000000', // DEFAULT_ADMIN_ROLE
  REGULATOR:
    '0x20b5f7ac978e5d6199de06401411960dfa81d2f762655f6206bdc61d46fc19e6', // keccak256("REGULATOR_ROLE")
  BUSINESS:
    '0x966a00e53c991954f9346cf783097be60911b589dd69ff02c7a9fd1c79215029', // keccak256("BUSINESS_ROLE")
  VERIFIER:
    '0x0ce23c3e399818cfee81a7ab0880f714e53d7672b08df0fa62f2843416e1ea09', // keccak256("VERIFIER_ROLE")
}

// Хелпер для проверки роли
export const useCheckRole = (
  address: `0x${string}` | undefined,
  role: `0x${string}`,
) => {
  return useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'hasRole',
    args: [role, address || '0x0'],
    query: {
      enabled: !!address,
    },
  })
}

// Хук для получения всех ролей пользователя
export const useUserRoles = (address: `0x${string}` | undefined) => {
  const admin = useCheckRole(address, ROLES.ADMIN)
  const regulator = useCheckRole(address, ROLES.REGULATOR)
  const business = useCheckRole(address, ROLES.BUSINESS)
  const verifier = useCheckRole(address, ROLES.VERIFIER)

  return {
    isAdmin: admin.data || false,
    isRegulator: regulator.data || false,
    isBusiness: business.data || false,
    isVerifier: verifier.data || false,
    isLoading:
      admin.isLoading ||
      regulator.isLoading ||
      business.isLoading ||
      verifier.isLoading,
  }
}
