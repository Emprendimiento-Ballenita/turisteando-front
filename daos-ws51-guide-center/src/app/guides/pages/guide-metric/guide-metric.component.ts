import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from "@angular/material/paginator";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort } from "@angular/material/sort";
import { Guide } from "../../model/guide.entity";
import { GuidesService } from '../../services/guides.service';
import {elementAt} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-guide-metric',
  standalone: true,
  imports: [MatFormFieldModule, MatSort, MatInputModule, MatPaginator, MatTableModule, MatCardModule, NgForOf],
  templateUrl: './guide-metric.component.html',
  styleUrl: './guide-metric.component.css'
})
export class GuideMetricComponent {
  guides: Array<Guide> = [];
  displayedColumns: string[] = ['tourist_id', 'tourist_image', 'tours', 'satisfaction', 'rate', 'comment'];
  dataSource!: MatTableDataSource<any>;

  constructor(private guideService: GuidesService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  private getAllGuides() {
    this.guideService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };
  ngOnInit(): void {
    this.getAllGuides();
  }

  protected readonly elementAt = elementAt;
}
