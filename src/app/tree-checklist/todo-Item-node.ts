import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class TodoItemNode implements OnInit {
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }
// }
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}
