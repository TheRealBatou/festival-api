// DTO with all fields of a festival as optional for flexible handling of update calls
export interface FestivalUpdateDTO {
  name?: string;
  date?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
}
