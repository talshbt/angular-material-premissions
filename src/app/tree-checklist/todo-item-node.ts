import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
export interface TodoItemNode {
  children: TodoItemNode[];
  item: string;
}
