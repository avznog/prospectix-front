import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frenchDatePipe'
})
export class FrenchDatePipePipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe
  ) { }
  transform(value: Date | null | string, ...args: unknown[]): unknown {
    let date = this.datePipe.transform(value, "EEEE dd MMMM YYYY");

    if (date?.includes("Monday"))
      date = date.replace("Monday", "Lundi")

    else if (date?.includes("Tuesday"))
      date = date.replace("Tuesday", "Mardi")

    else if (date?.includes("Wednesday"))
      date = date.replace("Wednesday", "Mercredi")

    else if (date?.includes("Thursday"))
      date = date.replace("Thursday", "Jeudi")
      
    else if (date?.includes("Friday"))
      date = date.replace("Friday", "Vendredi")

    else if (date?.includes("Saturday"))
      date = date.replace("Saturday", "Samedi")

    else if (date?.includes("Sunday"))
      date = date.replace("Sunday", "Dimanche")

    if (date?.includes("January"))
      date = date.replace("January", "Janvier")

    else if (date?.includes("February"))
      date = date.replace("February", "Février")

    else if (date?.includes("March"))
      date = date.replace("March", "Mars")

    else if (date?.includes("April"))
      date = date.replace("April", "Avril")
      
    else if (date?.includes("May"))
      date = date.replace("May", "Mai")

    else if (date?.includes("June"))
      date = date.replace("June", "Juin")

    else if (date?.includes("July"))
      date = date.replace("July", "Juillet")

    else if (date?.includes("August"))
      date = date.replace("August", "Août")

    else if (date?.includes("September"))
      date = date.replace("September", "Septembre")

    else if (date?.includes("October"))
      date = date.replace("October", "Octobre")

    else if (date?.includes("November"))
      date = date.replace("November", "Novembre")
      
    else if (date?.includes("December"))
      date = date.replace("December", "Décembre")


    return date;
  }

}
