import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversacionWspEntity } from '../entity/conversacion_wsp.entity';

@Injectable()
export class ConversacionWspService {
  constructor(
    @InjectRepository(ConversacionWspEntity)
    private readonly conversacionRepo: Repository<ConversacionWspEntity>,
  ) {}

  findByCliente(idCliente: number) {
    return this.conversacionRepo.find({
      where: { cliente: { id_cliente: idCliente } },
      relations: ['cliente', 'negocio'],
      order: { ultima_interaccion: 'DESC' },
    });
  }

  findByNegocio(idNegocio: number) {
    return this.conversacionRepo.find({
      where: { negocio: { id_negocio: idNegocio } },
      relations: ['cliente', 'negocio'],
      order: { ultima_interaccion: 'DESC' },
    });
  }

  findByNumero(numeroWsp: string) {
    return this.conversacionRepo.findOne({
      where: { numero_wsp: numeroWsp },
      relations: ['cliente', 'negocio'],
    });
  }
}
