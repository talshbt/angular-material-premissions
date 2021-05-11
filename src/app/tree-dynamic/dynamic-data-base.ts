import { Injectable } from "@angular/core";
import { DynamicFlatNode } from "./dynamic-flat-node";

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ['Tribe', ['Apple', 'Orange', 'Banana']],
    ['Mesila', ['Tomato', 'Potato', 'Onion']],
    ['Rest', ['Fuji', 'Macintosh']],
    ['Web Client', ['Yellow', 'White', 'Purple']]
  ]);


  rootLevelNodes: string[] = ['Tribe', 'Mesila','Rest'];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}