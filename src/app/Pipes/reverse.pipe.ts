import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return ''; // Verifica se o valor é nulo ou indefinido

    return value.split('').reverse().join('');
  }
}
