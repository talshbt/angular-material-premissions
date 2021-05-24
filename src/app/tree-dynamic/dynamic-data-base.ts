import { Injectable, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import { DynamicFlatNode } from './dynamic-flat-node';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase implements OnInit {
  ngOnInit(): void {}

  constructor(private permissionService: PermissionService) {}
  // dataMap = new Map<string, string[]>([
  //   ['Tribe', ['a', 'b', 'c']],
  //   ['Mesila', ['e', 'f', 'g']],
  //   ['Rest', ['h', 'i']],
  //   ['Web Client', ['j', 'k', 'l']]
  // ]);

  dataMap = new Map<string, { name: string; status: string }[]>([
    [
      'Tribe',
      [
        { name: 'a', status: 'success' },
        { name: 'b', status: 'success' },
        { name: 'c', status: 'success' }
      ]
    ],
    [
      'Mesila',
      [
        { name: 'd', status: 'success' },
        { name: 'e', status: 'success' },
        { name: 'f', status: 'success' }
      ]
    ]
  ]);

  //rootLevelNodes: string[] = ['Tribe', 'Mesila', 'Rest'];
  rootLevelNodes: string[] = [];

  // childArray = ['Tribe', 'Mesila'];

  /** Initial data from database */
  initialData(permissionData): DynamicFlatNode[] {
    // console.log(this.dataMap);
    this.rootLevelNodes = permissionData;
    this.findChild('a');

    this.rootLevelNodes.forEach(parent => {});
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

  findChild(name) {
    this.rootLevelNodes.forEach(parent => {
      const children = this.dataMap.get(parent);
      // console.log(children);
      children.forEach(x => console.log(x.name == name));

      // this.children.forEach(parent => {
      // });
    });
  }
}
