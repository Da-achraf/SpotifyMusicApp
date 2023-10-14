import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const start = Number.parseInt(<string>args[0]);
    const end = Number.parseInt(<string>args[1]);
    if (value.length <= end) return value
    return `${value.slice(start, end)}...`;
  }
}
