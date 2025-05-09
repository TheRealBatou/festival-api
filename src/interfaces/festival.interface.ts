import { Festival } from "../entities/festival.entity";

// DTO to represent the festival list with all the information for the pagination
export interface FestivalListResult {
  data: Festival[];
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}
