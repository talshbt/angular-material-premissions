import { Injectable, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import { DynamicFlatNode } from './dynamic-flat-node';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase implements OnInit {
  ngOnInit(): void {
    // this.permissionService.getPermission().subscribe(permissionData => {
    //   this.rootLevelNodes.push(permissionData);
    // });
  }

  constructor(private permissionService: PermissionService) {}
  dataMap = new Map<string, string[]>([
    ['Tribe', ['Apple', 'Orange', 'Banana']],
    ['Mesila', ['Tomato', 'Potato', 'Onion']],
    ['Rest', ['Fuji', 'Macintosh']],
    ['Web Client', ['Yellow', 'White', 'Purple']]
  ]);

  //rootLevelNodes: string[] = ['Tribe', 'Mesila', 'Rest'];
  rootLevelNodes: string[] = [];

  /** Initial data from database */
  initialData(permissionData): DynamicFlatNode[] {
    this.rootLevelNodes = permissionData;
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  // addNode(newNode) {
  //   // console.log(x);
  //   this.rootLevelNodes.push(newNode.name);
  //   //  console.log(this.rootLevelNodes);
  // }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
