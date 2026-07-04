import {
    Injectable,
    Logger,
    InternalServerErrorException,
    BadRequestException
} from "@nestjs/common";
import { IcreateServicio, IServicio } from "../interfaces/servicio.interface";
import { ServiciosEntity } from "../entity/servicios.entity";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { HttpException } from "@nestjs/common";
import { ServicioNegocioEntity } from "../entity/servicio_negocio.entity";


@Injectable()
export class ServiciosService implements IcreateServicio {
    private readonly logger = new Logger(ServiciosService.name)

    constructor(
        @InjectDataSource()
        private readonly datasrc: DataSource
    ) { }

    async findOneService(id_servicio: number): Promise<ServiciosEntity> {
        try {
            return await this.datasrc.transaction(async (manager) => {
                const servicioEncontrado =
                    await manager.findOne(ServiciosEntity,
                        { where: { id_servicio } }
                    );

                if (!servicioEncontrado) {
                    throw new BadRequestException(
                        'No se encontró un servicio con ese id'
                    );
                }
                return servicioEncontrado;
            }
            );

        } catch (e) {

            if (e instanceof HttpException) {
                throw e;
            }

            this.logger.error('No se pudo culminar la búsqueda del servicio',e);

            throw new InternalServerErrorException(
                'No se pudo encontrar el servicio'
            );
        }
    }

    async findAllServices(
        id_negocio: number
    ): Promise<ServicioNegocioEntity[]> {
        try {

            return await this.datasrc.manager.find(
                ServicioNegocioEntity,{
                    where: {
                        id_negocio
                    },
                    relations: {
                        servicio: true
                    }
                }
            );

        } catch (error) {

            this.logger.error('Error al obtener los servicios',error);

            throw new InternalServerErrorException('No se pudieron obtener los servicios');
        }
    }
    async createServicio(service: IServicio, user_id: number): Promise<void> {
        if (service.descripcion == null || service.nombre == null) {
            throw new BadRequestException('No se pudo crear servicio, Campos faltantes')
        }
        try {
            await this.datasrc.transaction(async (manager) => {
                const resultado = await manager.insert(ServiciosEntity, service)
            })

        } catch (e) {
            this.logger.error('Error al integrar un servicio', e)
            throw new InternalServerErrorException('No se pude registrar el servicio')
        }
    }

    async updateService(idservicio: number, serviciomod: IServicio): Promise<void> {
        try {

            await this.datasrc.transaction(async (manager) => {

                const servicio = await manager.findOne(
                    ServiciosEntity,
                    {
                        where: {
                            id_servicio: idservicio
                        }
                    }
                );
                if (!servicio) {
                    throw new InternalServerErrorException(
                        'Servicio no encontrado'
                    );
                }
                servicio.nombre = serviciomod.nombre;
                servicio.descripcion = serviciomod.descripcion;

                await manager.save(servicio);

            });


        } catch (error) {
            this.logger.error('Error no se puedo modificar servicio', error)
            throw new InternalServerErrorException('no se puedo modificar un servicio')
        }

    }


    async deleteServicio(id_servicio: number): Promise<void> {
        try {
            await this.findOneService(id_servicio);

            await this.datasrc.transaction(async (manager) => {
                await manager.delete(ServiciosEntity, {
                    id_servicio: id_servicio
                })
            })

        } catch (error) {
            this.logger.error('No se puedo eliminar el servicio', error)
            throw new InternalServerErrorException('No se pudo eliminar el servicio')
        }


    }
}