import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";

import {Comentario} from "../model/comentario.entity";


@Injectable({
  providedIn: 'root'
})
export class ComentariosService extends BaseService<Comentario> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/comentarios';
  }
}
