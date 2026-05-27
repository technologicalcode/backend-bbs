import { Injectable } from "@nestjs/common";

@Injectable()
export class CitaHelper {

    validarDt(data?:string):boolean{
        if(!data){
            return false
        }
        return true;
    }
}


