import { Component } from '@angular/core';

import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Comentario} from "../../model/comentario.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-comentario-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './comentario-create-and-edit.component.html',
  styleUrl: './comentario-create-and-edit.component.css'
})
export class ComentarioCreateAndEditComponent {
  // Attributes
  @Input() comentario: Comentario;
  @Input() editMode = false;
  @Output() comentarioAdded = new EventEmitter<Comentario>();
  @Output() comentarioUpdated = new EventEmitter<Comentario>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('comentarioForm', {static: false}) comentarioForm!: NgForm;

  // Methods
  constructor() {
    this.comentario = {} as Comentario;
  }

  // Private methods
  private resetEditState() {
    this.comentario = {} as Comentario;
    this.editMode = false;
    this.comentarioForm.resetForm();
  }

  // Event Handlers

  onSubmit() {
    if (this.comentarioForm.form.valid) {
      let emitter = this.editMode ? this.comentarioUpdated : this.comentarioAdded;
      emitter.emit(this.comentario);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
