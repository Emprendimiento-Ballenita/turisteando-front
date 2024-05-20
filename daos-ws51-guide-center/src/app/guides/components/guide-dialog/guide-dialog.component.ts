import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {GuideCreateAndEditComponent} from "../guide-create-and-edit/guide-create-and-edit.component";
import {Guide} from "../../model/guide.entity";
import {GuidesService} from "../../services/guides.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-guide-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './guide-dialog.component.html',
  styleUrl: './guide-dialog.component.css'
})
export class GuideDialogComponent {
  isEditMode: boolean;
  guideData: Guide;
  dataSource!: MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private guideService: GuidesService) {
    this.isEditMode = false;
    this.guideData = {} as Guide;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.guideData = {} as Guide;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentGuideDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.resetEditState();
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, GuideCreateAndEditComponent],
})
export class DialogContentGuideDialog {
  isEditMode: boolean;
  guideData: Guide;
  dataSource!: MatTableDataSource<any>;

  constructor(private guideService: GuidesService) {
    this.isEditMode = false;
    this.guideData = {} as Guide;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.guideData = {} as Guide;
  }

  onCancelEdit() {
    this.resetEditState();
  }

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


}
