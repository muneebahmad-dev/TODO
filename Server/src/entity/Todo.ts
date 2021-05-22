import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Description: string;
}
