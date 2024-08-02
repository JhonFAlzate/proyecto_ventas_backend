import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ventas } from "./ventas.model";
import { RolCliente } from "./@types/clientes.types";

@Entity()
export class Clientes extends BaseEntity {
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
    nullable: false,
    unique: true,
    length: 10,
  })
  telefono: string;

  @Column({
    type: "enum",
    enum: RolCliente,
    default: RolCliente.MOSTRADOR,
  })
  role: RolCliente;

  @OneToMany(() => Ventas, (venta) => venta.cliente)
  venta: Ventas;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
