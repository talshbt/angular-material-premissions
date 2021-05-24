import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { FILTER_TREE_DATA } from './filter-tree';
import { FilterTreeItemFlatNode } from './filter-tree-item-flat-node';

/**
 * Node for to-do item
 */
export class FilterTreeItemNode {
  children: FilterTreeItemNode[];
  item: string;
  code: string;
}

/** Flat to-do item node with expandable and level information */

/**
 * The Json object for to-do list data.
 */

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<FilterTreeItemNode[]>([]);
  treeData: any[];
  get data(): FilterTreeItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.treeData = FILTER_TREE_DATA;
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(FILTER_TREE_DATA, '0');
    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */

  buildFileTree(obj: any[], level: string): FilterTreeItemNode[] {
    return obj
      .filter(
        o =>
          (<string>o.code).startsWith(level + '.') &&
          (o.code.match(/\./g) || []).length ===
            (level.match(/\./g) || []).length + 1
      )
      .map(o => {
        const node = new FilterTreeItemNode();
        node.item = o.text;
        node.code = o.code;
        const children = obj.filter(so =>
          (<string>so.code).startsWith(level + '.')
        );
        if (children && children.length > 0) {
          node.children = this.buildFileTree(children, o.code);
        }
        return node;
      });
  }

  public filter(filterText: string) {
    let filteredTreeData;
    if (filterText) {
      console.log(this.treeData);
      filteredTreeData = this.treeData.filter(
        d =>
          d.text.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) >
          -1
      );
      Object.assign([], filteredTreeData).forEach(ftd => {
        let str = <string>ftd.code;
        while (str.lastIndexOf('.') > -1) {
          const index = str.lastIndexOf('.');
          str = str.substring(0, index);
          if (filteredTreeData.findIndex(t => t.code === str) === -1) {
            const obj = this.treeData.find(d => d.code === str);
            if (obj) {
              filteredTreeData.push(obj);
            }
          }
        }
      });
    } else {
      filteredTreeData = this.treeData;
    }

    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    // file node as children.
    const data = this.buildFileTree(filteredTreeData, '0');
    // Notify the change.
    this.dataChange.next(data);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-filter-tree',
  templateUrl: './filter-tree.component.html',
  styleUrls: ['./filter-tree.component.css'],
  providers: [ChecklistDatabase]
})
export class FilterTreeComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FilterTreeItemFlatNode, FilterTreeItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<FilterTreeItemNode, FilterTreeItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: FilterTreeItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<FilterTreeItemFlatNode>;

  treeFlattener: MatTreeFlattener<FilterTreeItemNode, FilterTreeItemFlatNode>;

  dataSource: MatTreeFlatDataSource<FilterTreeItemNode, FilterTreeItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<FilterTreeItemFlatNode>(
    false /* multiple */
  );

  constructor(private database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<FilterTreeItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: FilterTreeItemFlatNode) => node.level;

  isExpandable = (node: FilterTreeItemFlatNode) => node.expandable;

  getChildren = (node: FilterTreeItemNode): FilterTreeItemNode[] =>
    node.children;

  hasChild = (_: number, _nodeData: FilterTreeItemFlatNode) =>
    _nodeData.expandable;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: FilterTreeItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new FilterTreeItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.code = node.code;
    flatNode.expandable = node.children && node.children.length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: FilterTreeItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FilterTreeItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: FilterTreeItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

  filterChanged(filterText: string) {
    this.database.filter(filterText);
    if (filterText) {
      this.treeControl.expandAll();
    } else {
      this.treeControl.collapseAll();
    }
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
