import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ventas } from "./ventas.model";
import { bcryptAdapter } from "../../../config/bcrypt.adapter";

export enum RolDeUsuario {
  ADMIN = "ADMIN",
  VENDEDOR = "VENDEDOR",
  CLIENTE = "CLIENTE",
}

@Entity()
export class Usuarios extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    length: 30,
    nullable: false,
  })
  nombre: string;

  @Column("varchar", {
    length: 30,
    nullable: false,
  })
  apellido: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  password: string;

  @BeforeInsert()
  encryptPassword() {
    this.password = bcryptAdapter.hash(this.password);
  }

  @Column({
    type: "enum",
    enum: RolDeUsuario,
    default: RolDeUsuario.VENDEDOR,
  })
  role: RolDeUsuario;

  @OneToMany(() => Ventas, (venta) => venta.usuario)
  ventas: Ventas[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
