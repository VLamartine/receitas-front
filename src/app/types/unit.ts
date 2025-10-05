import { ApiRequestOptions } from "@customTypes/api-request-options";

export interface Unit {
  id: string;
  name: string;
  symbol: string;
}

export interface UnitQueryOptions extends ApiRequestOptions {
  purchasable?: boolean;
}
