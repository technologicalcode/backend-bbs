import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IcreateServicio, IServicio } from '../interfaces/servicio.interface';
import { ServiciosEntity } from '../entity/servicios.entity';
import { ServicioNegocioEntity } from '../entity/servicio_negocio.entity';

@Injectable()
export class ServiciosService implements IcreateServicio {
  constructor(
    @InjectRepository(ServiciosEntity)
    private readonly serviciosRepo: Repository<ServiciosEntity>,
    @InjectRepository(ServicioNegocioEntity)
    private readonly servicioNegocioRepo: Repository<ServicioNegocioEntity>,
  ) {}

  async findOneService(id_servicio: number): Promise<ServiciosEntity> {
    const servicio = await this.serviciosRepo.findOne({
      where: { id_servicio },
    });

    if (!servicio) {
      throw new NotFoundException('No se encontró un servicio con ese id');
    }

    return servicio;
  }

  async findAllServices(
    id_negocio: number,
  ): Promise<ServicioNegocioEntity[]> {
    return this.servicioNegocioRepo.find({
      where: { id_negocio },
      relations: { servicio: true },
    });
  }

  async createServicio(service: IServicio, _user_id: number): Promise<void> {
    this.validarServicio(service);

    await this.serviciosRepo.insert({
      nombre: service.nombre.trim(),
      descripcion: service.descripcion.trim(),
    });
  }

  async updateService(
    id_servicio: number,
    serviciomod: IServicio,
  ): Promise<void> {
    this.validarServicio(serviciomod);

    const servicio = await this.serviciosRepo.findOne({
      where: { id_servicio },
    });

    if (!servicio) {
      throw new NotFoundException('Servicio no encontrado');
    }

    servicio.nombre = serviciomod.nombre.trim();
    servicio.descripcion = serviciomod.descripcion.trim();

    await this.serviciosRepo.save(servicio);
  }

  async deleteServicio(id_servicio: number): Promise<void> {
    const { affected } = await this.serviciosRepo.delete({ id_servicio });

    if (!affected) {
      throw new NotFoundException('Servicio no encontrado');
    }
  }

  private validarServicio(service: IServicio): void {
    if (!service.nombre?.trim() || !service.descripcion?.trim()) {
      throw new BadRequestException(
        'No se pudo procesar el servicio: nombre y descripcion son obligatorios',
      );
    }
  }
}
