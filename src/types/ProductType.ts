export type ProductType = {
  id: number
  title: string
  price: number | null
  description: string
  category: string | null
  image: string
  rating: {
    rate: number
    count: number
  }
}
