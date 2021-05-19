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
  // dataMap = new Map<string, string[]>([
  //   ['Tribe', ['a', 'b', 'c']],
  //   ['Mesila', ['e', 'f', 'g']],
  //   ['Rest', ['h', 'i']],
  //   ['Web Client', ['j', 'k', 'l']]
  // ]);

  dataMap = new Map<string, { name: string; status: string }[]>([
    ['Tribe', [{ name: 'sfsx', status: 'success' }]]
  ]);

  //rootLevelNodes: string[] = ['Tribe', 'Mesila', 'Rest'];
  rootLevelNodes: string[] = [];

  /** Initial data from database */
  initialData(permissionData): DynamicFlatNode[] {
    this.rootLevelNodes = permissionData;
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(parent: string) {
    return this.dataMap.get(parent);
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
