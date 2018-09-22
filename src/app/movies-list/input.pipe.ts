import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'input'
})
export class InputPipe implements PipeTransform {

  transform(movies: any, input: any): any {

  }
}
