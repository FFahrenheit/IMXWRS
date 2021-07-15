import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilenamePipe } from './filename.pipe';
import { SizePipe } from './size.pipe';
import { DbcasePipe } from './dbcase.pipe';

@NgModule({
  declarations: [
    FilenamePipe,
    SizePipe,
    DbcasePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilenamePipe,
    SizePipe,
    DbcasePipe
  ],
  providers: [
    FilenamePipe
  ]
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
