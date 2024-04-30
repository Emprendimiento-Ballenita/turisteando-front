import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { GuidesService } from "../../services/guides.service";
import { Guide } from "../../model/guide.entity";
import { GuideCreateAndEditComponent } from "../../components/guide-create-and-edit/guide-create-and-edit.component";
import { NgClass } from "@angular/common";
import { GuideDialogComponent } from "../../components/guide-dialog/guide-dialog.component";
import {MatCard, MatCardImage} from "@angular/material/card";

@Component({
  selector: 'app-guide-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, GuideCreateAndEditComponent, MatTableModule, NgClass,
    GuideDialogComponent, MatCard, MatCardImage],
  templateUrl: './guide-management.component.html',
  styleUrl: './guide-management.component.css'
})

export class GuideManagementComponent implements OnInit, AfterViewInit  {
  // Attributes
  guideData: Guide;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'destination', 'language', 'specialization',
    'availability', 'rate', 'price', 'experience', 'picture', 'actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  // Constructor
  constructor(private guideService: GuidesService) {
    this.isEditMode = false;
    this.guideData = {} as Guide;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.guideData = {} as Guide;
  }

  // CRUD Actions

  private getAllGuides() {
    this.guideService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createGuide() {
      this.guideService.create(this.guideData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((guide: Guide) => { return guide; });
    });
  };

  private updateGuide() {
    let guideToUpdate = this.guideData;
    this.guideService.update(this.guideData.id, guideToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((guide: Guide) => {
        if (guide.id === response.id) {
          return response;
        }
        return guide;
      });
    });
  };

  private deleteGuide(guideId: number) {
    this.guideService.delete(guideId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((guide: Guide) => {
        return guide.id !== guideId ? guide : false;
      });
    });
  };

  // UI Event Handlers

  onEditItem(element: Guide) {
    this.isEditMode = true;
    this.guideData = element;
  }

  onDeleteItem(element: Guide) {
    this.deleteGuide(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllGuides();
  }

  onGuideAdded(element: Guide) {
    this.guideData = element;
    this.createGuide();
    this.resetEditState();
  }

  onGuideUpdated(element: Guide) {
    this.guideData = element;
    this.updateGuide();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllGuides();
  }
}
