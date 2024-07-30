import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Usuarios } from "./usuarios.model";
import { Producto } from "./producto.model";
import { Clientes } from "./clientes.model";
  
  @Entity()
  export class Ventas extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "int",
        nullable: false,

    })
    cantidad: number;

    @ManyToOne(() => Usuarios, (usuario) => usuario.ventas)
    usuario: Usuarios;

    @ManyToOne(() => Producto, (producto) => producto.venta)
    producto: Producto;

    @ManyToOne(() => Clientes, (cliente) => cliente.venta)
    cliente: Clientes; 

      
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    


  }