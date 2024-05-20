import { Component } from '@angular/core';
import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Guide} from "../../model/guide.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

const THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;

@Component({
  selector: 'app-guide-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf, MatSelect, MatOption, MatIcon],
  templateUrl: './guide-create-and-edit.component.html',
  styleUrl: './guide-create-and-edit.component.css'
})
export class GuideCreateAndEditComponent {
  // Attributes
  @Input() guide: Guide;
  @Input() editMode: undefined | boolean = false;
  @Output() guideAdded = new EventEmitter<Guide>();
  @Output() guideUpdated = new EventEmitter<Guide>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('guideForm', {static: false}) guideForm!: NgForm;

  // Methods
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.guide = {} as Guide;
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
  }

  // Private methods
  private resetEditState() {
    this.guide = {} as Guide;
    this.editMode = false;
    this.guideForm.resetForm();
  }

  // Event Handlers

  onSubmit() {
    if (this.guideForm.form.valid) {
      let emitter = this.editMode ? this.guideUpdated : this.guideAdded;
      emitter.emit(this.guide);
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
