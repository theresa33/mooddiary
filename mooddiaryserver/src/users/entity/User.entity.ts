import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import bcrypt from 'bcryptjs';
import { type } from "os";
import { Entry } from "src/entries/entity/Entry.entity";
import { Exclude } from "class-transformer";
import { Date } from "src/dates/entity/Date.entity";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @IsNotEmpty()
    @Column()
    username: string;

    @Column({unique: true})
    email: string;


    @IsNotEmpty()
    @Column()
    @Exclude()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @BeforeInsert()
    emailToLowerCase() {
      this.email = this.email.toLowerCase();
    }

    @OneToMany(type => Entry, entry => entry.user)
    entries: Entry[]

    @OneToMany(type => Date, date => date.user)
    dates: Date[]

    @CreateDateColumn()
    created_at: Date; 

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}


