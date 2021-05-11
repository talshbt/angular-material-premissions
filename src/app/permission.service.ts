import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PermissionService {

  private permissionsChange = new Subject<any>();

  constructor() { }


  getPermission(){

  }

}