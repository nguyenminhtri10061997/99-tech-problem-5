import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResourceModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description?: string;
}
