import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Producto } from "./producto.model";
  
  @Entity()
  export class Inventario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
        
    })
    cantidadStock: number;

    @ManyToOne(() => Producto, (producto) => producto.inventario)
    productoId: Producto;
    // @JoinColumn()

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;


  }