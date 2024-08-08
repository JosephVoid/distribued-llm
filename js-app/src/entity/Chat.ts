import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 10000 })
  message: string;

  @Column()
  conversation_id: string;

  @Column()
  from: string;

  @Column()
  datetime: Date;

  @Column()
  model: string;
}
