import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortFrenchDate'
})
export class ShortFrenchDatePipe implements PipeTransform {

  constructor(
    private readonly datePipe: DatePipe
  ) {}
  transform(value: Date | null | string, ...args: unknown[]): unknown {
    let date = this.datePipe.transform(value, "EEE dd MMMM YYYY", "fr-FR")
    console.log(date)
    if (date?.includes("Mon"))
      date = date.replace("Mon", "Lun")

    else if (date?.includes("Tue"))
      date = date.replace("Tue", "Mar")

    else if (date?.includes("Wed"))
      date = date.replace("Wed", "Mer")

    else if (date?.includes("Thu"))
      date = date.replace("Thu", "Jeu")
      
    else if (date?.includes("Fri"))
      date = date.replace("Fri", "Ven")

    else if (date?.includes("Sat"))
      date = date.replace("Sat", "Sam")

    else if (date?.includes("Sun"))
      date = date.replace("Sun", "Dim")

      if (date?.includes("January"))
      date = date.replace("January", "Jan")

    else if (date?.includes("February"))
      date = date.replace("February", "Fév")

    else if (date?.includes("March"))
      date = date.replace("March", "Mars")

    else if (date?.includes("April"))
      date = date.replace("April", "Avr")
      
    else if (date?.includes("May"))
      date = date.replace("May", "Mai")

    else if (date?.includes("June"))
      date = date.replace("June", "Juin")

    else if (date?.includes("July"))
      date = date.replace("July", "Juil")

    else if (date?.includes("August"))
      date = date.replace("August", "Août")

    else if (date?.includes("September"))
      date = date.replace("September", "Sept")

    else if (date?.includes("October"))
      date = date.replace("October", "Oct")

    else if (date?.includes("November"))
      date = date.replace("November", "Nov")
      
    else if (date?.includes("December"))
      date = date.replace("December", "Déc")
    return date;
    return null;
  }

}
