import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute/attribute.component';



@NgModule({
  declarations: [
    AttributeComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AttributeComponent,
  ]
})
export class SharedModule { }
