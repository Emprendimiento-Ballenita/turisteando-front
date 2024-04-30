import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { ComentariosService } from "../../services/comentarios.service";
import { Comentario } from "../../model/comentario.entity";
import { ComentarioCreateAndEditComponent } from "../../components/comentario-create-and-edit/comentario-create-and-edit.component";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-comentario-management',
  standalone: true,
  imports: [MatPaginator, MatSort,MatInputModule, MatIconModule, ComentarioCreateAndEditComponent, MatTableModule, NgClass],
  templateUrl: './comentario-management.component.html',
  styleUrl: './comentario-management.component.css'
})
export class ComentarioManagementComponent implements OnInit, AfterViewInit {
  // Attributes
  comentarioData: Comentario;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['idCom', 'nameGuia', 'numEstrellas', 'descripcion','fecha','actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  // Constructor
  constructor(private comentarioService: ComentariosService) {
    this.isEditMode = false;
    this.comentarioData = {} as Comentario;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.comentarioData = {} as Comentario;
  }

  // CRUD Actions

  private getAllComentarios() {
    this.comentarioService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createComentario() {
    this.comentarioService.create(this.comentarioData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((comentario: Comentario) => { return comentario; });
    });
  };

  private updateComentario() {
    let comentarioToUpdate = this.comentarioData;
    this.comentarioService.update(this.comentarioData.idCom, comentarioToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((comentario: Comentario) => {

        if (comentario.idCom === response.idCom) {
          return response;
        }
        return comentario;
      });
    });
  };

  private deleteComentario(comentarioId: number) {
    this.comentarioService.delete(comentarioId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((comentario: Comentario) => {
        return comentario.idCom !== comentarioId ? comentario : false;
      });
    });
  };

  // UI Event Handlers

  onEditItem(element: Comentario) {
    this.isEditMode = true;
    this.comentarioData = element;
  }

  onDeleteItem(element: Comentario) {
    this.deleteComentario(element.idCom);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllComentarios();
  }

  onComentarioAdded(element: Comentario) {
    this.comentarioData = element;
    this.createComentario();
    this.resetEditState();
  }

  onComentarioUpdated(element: Comentario) {
    this.comentarioData = element;
    this.updateComentario();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllComentarios();
  }
}
