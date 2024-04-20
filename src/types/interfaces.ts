export interface IProduct {
  id: number
  images: string[] //image
  category: IProductCategory
  title: string //title
  description: string //subtitle
  price: number //contentSlot
}

export interface IProductCategory {
  id: number
  name: string
}
