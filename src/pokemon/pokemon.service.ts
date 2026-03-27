import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    return this.pokemonModel.create({
      ...createPokemonDto,
      name: createPokemonDto.name.toLowerCase().trim(),
    });
  }

  async findAll() {
    return this.pokemonModel.find().sort({ no: 1 }).lean();
  }

  async findOne(id: string) {
    const pokemon = await this.pokemonModel.findById(id).lean();
    if (!pokemon) throw new NotFoundException(`Pokemon ${id} no encontrado`);
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const updated = await this.pokemonModel
      .findByIdAndUpdate(id, updatePokemonDto, { new: true })
      .lean();
    if (!updated) throw new NotFoundException(`Pokemon ${id} no encontrado`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.pokemonModel.findByIdAndDelete(id).lean();
    if (!deleted) throw new NotFoundException(`Pokemon ${id} no encontrado`);
    return { message: `Pokemon eliminado correctamente` };
  }
}
