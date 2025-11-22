import { ApiRequestOptions } from "@customTypes/api-request-options";

export interface ShoppingListItem {
  id: string;
  name: string;
  image?: string | null;
  quantity: number;
  shoppingListId: string;
  unitId: string;
  unitName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoppingList {
  id?: string;
  name: string;
  description: string | null;
  purchaseDate: Date | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  products?: ShoppingListItem[];
}

export interface CreateShoppingListItemBody {
  productId: string;
  name: string;
  quantity: number;
  unitId: string;
}

export interface CreateShoppingListBody {
  name: string;
  description: string | null;
  purchaseDate: Date | null;

  items: CreateShoppingListItemBody[];
}

export interface UpdateShoppingListBody extends CreateShoppingListBody {
  id: string;
}

export interface ShoppingListFetch extends ApiRequestOptions {
  fetch?: "past" | "future" | "all";
}
