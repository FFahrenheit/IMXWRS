import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilenamePipe } from './filename.pipe';
import { SizePipe } from './size.pipe';

@NgModule({
  declarations: [
    FilenamePipe,
    SizePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilenamePipe,
    SizePipe,
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
