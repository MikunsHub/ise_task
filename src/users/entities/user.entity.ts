import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    firstname: string;
  
    @Column()
    lastname: string;
  
    @Column()
    password: string;
  
    @Column({ default: false })
    isVerified: boolean;
  
    @Column({ nullable: true })
    otp: string;
  
    @Column({ type: 'timestamp', nullable: true })
    otpExpires: Date;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  }
  