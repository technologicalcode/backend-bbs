export interface CitaGenerada {
  id_bb: number;
  fecha: string;
  hora_cita_inicio: string;
  hora_cita_fin: string;
}

/** Fila devuelta por GET cargar-citas (citas disponibles + datos del barbero). */
export interface CitaDisponibleView {
  id_cita: number;
  id_bb: number;
  id_cliente: number | null;
  fecha_cita: Date;
  hora_cita_inicio: string;
  hora_cita_fin: string;
  estado_cita: number;
  barbero: string;
  alias: string;
}
