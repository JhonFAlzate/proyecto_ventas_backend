import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
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
import { RolDeUsuario, Status } from "./@types/usuarios.types";

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
    nullable: false,
    unique: true,
    length: 10,
  })
  telefono: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.ACTIVO,
  })
  status: Status;

  @BeforeUpdate()
  encryptPasswordUpdate() {
    this.password = bcryptAdapter.hash(this.password);
  }

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
