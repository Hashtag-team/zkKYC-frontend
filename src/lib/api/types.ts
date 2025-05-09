export interface UserResponse {
  id: number
  did: string
}

export interface ProfileData {
  full_name: string
  birth_date: string
  gender: 'F' | 'M'
  eth_address: string
}
