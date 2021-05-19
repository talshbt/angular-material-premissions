import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import { DynamicDatabase } from './dynamic-data-base';
import { DynamicDataSource } from './dynamic-data-source';
import { DynamicFlatNode } from './dynamic-flat-node';

@Component({
  selector: 'app-tree-dynamic',
  templateUrl: './tree-dynamic.component.html',
  styleUrls: ['./tree-dynamic.component.css']
})
export class TreeDynamicComponent implements OnInit {
  constructor(
    private database: DynamicDatabase,
    private permissionService: PermissionService
  ) {}
  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, this.database);

    this.permissionService.getPermission().subscribe(permissionData => {
      this.dataSource.data = this.database.initialData(permissionData);
    });
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}
