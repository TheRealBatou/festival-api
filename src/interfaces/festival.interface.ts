import { Festival } from "../entities/festival.entity";

export interface FestivalListResult {
  data: Festival[];
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}
