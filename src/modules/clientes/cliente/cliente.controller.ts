import { Controller, Get, Param, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('clientes')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    @Public()
    @Get('buscar-cliente-tel/:telefono')
    buscarClientePorTelefono(@Param('telefono') telefono: string) {
        return this.clienteService.buscarClientePorTelefono(telefono);
    }
}
