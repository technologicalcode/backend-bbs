import type { EntityManager } from 'typeorm';
import type { CitaGenerada } from './citas.interface';

export interface ICitasWriter {
  createCita(citas: CitaGenerada[], manager?: EntityManager): Promise<void>;
}
