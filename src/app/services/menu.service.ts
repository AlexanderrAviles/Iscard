import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private activeItem = new BehaviorSubject<string>('');
  activeItem$ = this.activeItem.asObservable();

  constructor(private router: Router) { }

  setActiveItem(itemName: string) {
    this.activeItem.next(itemName);
  }
  isActive(routePath: string): boolean {
    return this.router.isActive(routePath, true);
  }
}
