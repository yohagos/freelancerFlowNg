import { Injectable } from '@angular/core';
import { formatDate } from "@angular/common";
import { registerLocaleData } from "@angular/common";
import localeDE from "@angular/common/locales/de";
import localeExtra from "@angular/common/locales/extra/de";

@Injectable({
  providedIn: 'root',

})
export class FormatDateService {
  format = 'dd.MM.yyyy'
  locale = 'de-DE'

  getFormatedDate(date: string | undefined) {
    if (date) {
      return formatDate(date, this.format, this.locale)
    }
    return ''
  }

  init() {
    registerLocaleData(localeDE, this.locale, localeExtra)
  }
}
