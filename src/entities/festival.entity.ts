import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
