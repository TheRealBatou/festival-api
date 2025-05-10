import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * @swagger
 * components:
 *   schemas:
 *     Festival:
 *       type: object
 *       properties:
 *         festivalId:
 *           type: integer
 *           description: Unique identifier of the festival (generated)
 *           example: 1
 *         name:
 *           type: string
 *           description: Name of the festival
 *           example: Rock am Ring
 *         date:
 *           type: string
 *           format: date
 *           description: ISO 8601 formatted festival date
 *           example: 2025-06-10T10:00:00+02:00
 *         location:
 *           type: string
 *           description: Location of the festival
 *           example: Germany
 *         description:
 *           type: string
 *           nullable: true
 *           description: Optional description of the festival
 *           example: One of the biggest rock music festivals in Europe
 *         imageUrl:
 *           type: string
 *           format: string
 *           nullable: true
 *           description: Optional URL to an image representing the festival
 *           example: festival.jpg
 */
@Entity()
export class Festival {
  @PrimaryGeneratedColumn()
  festivalId!: number;

  @Column()
  name!: string;

  // Format: ISO 8601
  @Column()
  date!: string;

  @Column()
  location!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  imageUrl?: string;
}
