// DTO with all fields of a festival as optional for flexible handling of update calls
/**
 * @swagger
 * components:
 *   schemas:
 *     FestivalUpdateDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           nullable: true
 *           example: Rock am See
 *         date:
 *           type: string
 *           nullable: true
 *           format: date-time
 *           example: 2025-06-10T10:00:00+02:00
 *         location:
 *           type: string
 *           nullable: true
 *           example: Germany
 *         description:
 *           type: string
 *           nullable: true
 *           example: Open-air festival with several bands
 *         imageUrl:
 *           type: string
 *           nullable: true
 *           format: uri
 *           example: festival.jpg
 */
export interface FestivalUpdateDTO {
  name?: string;
  date?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
}
