export interface IServicio{
    id: number
    nombre : string
    descripcion : string
}

export interface IcreateServicio{
    createServicio(servicio : IServicio , user_id : number) : Promise<void>
}