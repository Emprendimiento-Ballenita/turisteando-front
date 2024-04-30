import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from "@angular/material/paginator";
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort } from "@angular/material/sort";
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import { Guide } from "../../model/guide.entity";
import { GuidesService } from '../../services/guides.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [MatExpansionModule, MatCheckboxModule, FormsModule, MatRadioModule, MatFormFieldModule, MatSort,
    MatInputModule, MatPaginator, MatTableModule, MatCardModule, MatListModule, MatSliderModule],
  templateUrl: './guide-list.component.html',
  styleUrl: './guide-list.component.css'
})
export class GuideListComponent implements OnInit {
  guides: Array<Guide> = [];
  displayedColumns: string[] = ['id', 'name', 'destination', 'language', 'specialization', 'availability', 'rate',
    'price', 'experience', 'experience', 'picture'];
  dataSource!: MatTableDataSource<any>;
  typesOfLanguages: string[] = ['Español', 'Inglés', 'Francés', 'Portuqués', 'Alemán'];
  settings: string[] = ['Disponibilidad', 'Destinos nacionales', 'Destinos internacionales', 'Puntuación'];
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 5;
  thumbLabel = false;
  value = 0;
  sliderMin = 0;
  sliderMax = 5;
  slider = 0;
  constructor(private guideService: GuidesService, private router: Router) {
    this.dataSource = new MatTableDataSource<any>();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  redirectToGuide(guideId: number) {
    this.router.navigate(['/guide', guideId]);
  }
  private getAllGuides() {
    this.guideService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };
  ngOnInit(): void {
    this.getAllGuides();
  }
}
