import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompareObjectsService {

  constructor() { }

  isEqual(obj1: any, obj2: any) {
    for(const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false
      }
    }
    return true
  }
}
