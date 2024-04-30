import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Guide} from "../model/guide.entity";

@Injectable({
  providedIn: 'root'
})
export class GuidesService extends BaseService<Guide> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/guide-metric';
  }
}
