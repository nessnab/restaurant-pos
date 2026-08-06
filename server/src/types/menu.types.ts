export interface CreateMenuInput{
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
}

export interface UpdateMenuInput {
  name?: string
  description?: string
  price?: number
  categoryId?: string | null
  isAvailable?: boolean
}

export interface UpdateCategoryInput {
  name?: string
}