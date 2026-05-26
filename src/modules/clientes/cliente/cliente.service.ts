import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from './entity/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteRep: Repository<ClienteEntity>,
    ) {}

    async buscarClientePorTelefono(telefono:string){
        try {
            const cliente = await this.clienteRep.findOne({
                where: { telefono: telefono },
            })
            return cliente;
        } catch (error) {
            throw new NotFoundException('Cliente no encontrado');
        }
    }
}
