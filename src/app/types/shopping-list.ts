export interface ShoppingList {}

export interface CreateShoppingListItemBody {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface CreateShoppingListBody {
  name: string;
  description?: string;
  purchaseDate: Date | null;

  shoppingListItems: CreateShoppingListItemBody[];
}
