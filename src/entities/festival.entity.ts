import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Festival {
  @PrimaryGeneratedColumn()
  festivalId!: number;

  @Column()
  name!: string;

  // in the challenge this is set to string not a date(what's the best solution?)
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
