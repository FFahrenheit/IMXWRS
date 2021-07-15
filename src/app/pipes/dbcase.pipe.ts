import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dbcase'
})
export class DbcasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => {
        return str.toUpperCase();
      });
  }

}
