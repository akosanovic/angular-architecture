import { CashflowCategory } from './../components/categories/categories.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SettingsState {
  private updating$ = new BehaviorSubject<boolean>(false);
  private cashflowCategories$ = new BehaviorSubject<CashflowCategory[]>(null);

  isUpdating$: Observable<boolean> = this.updating$.asObservable();
  getCashflowCategories$: Observable<CashflowCategory[]> = this.cashflowCategories$.asObservable();

  // isUpdating$() {
  //   return this.updating$.asObservable;
  // }

  setUpdatingStatus(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  // on component load
  //  initial state setting

  // Is there any way to do this when response from
  setCashflowCategories(categories: CashflowCategory[]) {
    this.cashflowCategories$.next(categories);
  }

  updateCashflowCategory(categoryToReplace) {
    this.updating$.next(true);
    this.cashflowCategories$.next(Object.assign(this.cashflowCategories$.getValue(), categoryToReplace));
    this.updating$.next(false);
  }

  addCashflowCategory( category: CashflowCategory ) {
    this.cashflowCategories$.next( [...this.cashflowCategories$.getValue(), category] );
  }

  updateCashflowCategoryId(categoryToReplace: CashflowCategory, categoryWithId: CashflowCategory) {
    const categories = this.cashflowCategories$.getValue();
    const updatedCategoryIndex = categories.findIndex(category => category === categoryToReplace);
    categories[updatedCategoryIndex] = categoryWithId;
    this.cashflowCategories$.next([...categories]);
  }

  removeCashflowCategory(categoryToRemove) {
    const currentValue = this.cashflowCategories$.getValue();
    this.cashflowCategories$.next(currentValue.filter(category => categoryToRemove !== category));
  }

}