import { ApiRequestOptions } from "@customTypes/api-request-options";

export interface ShoppingListItem {
  id?: string;
  shoppingListId: string;
  productId: string;
  quantity: number;
  unitId: string;
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
  items?: ShoppingListItem[];
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

export interface ShoppingListFetch extends ApiRequestOptions {
  fetch?: "past" | "future" | "all";
}
