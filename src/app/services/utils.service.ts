import { Injectable, ElementRef } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}
