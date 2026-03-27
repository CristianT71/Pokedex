import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
    @Prop({
        unique: true,
        index: true,
        required: true,
        trim: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
        required: true,
        min: 1,
    })
    no: number;

    @Prop({
        default: false, // por defecto sera falso
        index: true,
    })
    isCaptured: boolean;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
