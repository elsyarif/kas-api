import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attende {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column("int")
  no_akun: number;

  @Column()
  nip: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column("date")
  date: string;

  @Column("int")
  status: number;

  @Column("timestamp without time zone")
  waktu: string;

  @Column()
  kondisi: string;

  @Column("text")
  image: string;
}
