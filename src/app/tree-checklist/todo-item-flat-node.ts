import { Injectable, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';

export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}
