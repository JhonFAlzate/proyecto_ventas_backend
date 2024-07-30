import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Ventas } from "./ventas.model";
import { Inventario } from "./inventarioProducto.model";
  
  export enum TipoProducto {
    TORTAS  = 'TORTAS',
    HELADOS= 'HELADOS',
    OTROS = 'OTROS'
    
  }

  @Entity()
  export class Producto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar",{
        length: 50,
        nullable: false,
      })
    nombreProducto: string;

    @Column({
        type: 'enum',
        enum: TipoProducto,
        nullable: false,
      })
    tipoProducto: TipoProducto;

    @Column({
        type: 'int',
        nullable: false,
        
    })
    precioVenta: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 1
        
    })
    precioCompra: number;

    @OneToMany(() => Ventas, (venta) => venta.producto)
    venta: Ventas[]

    @OneToOne(() => Inventario, (inventario) => inventario.producto)
    inventario: Inventario;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

  }