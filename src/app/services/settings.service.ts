import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CashflowCategory } from './../components/categories/categories.component';
import { SettingsState } from './../core/settings.state';

@Injectable()
export class SettingsService {

  constructor(private cashflowCategoryApi: CashflowCategoryApi,
              private settingsState: SettingsState,
    ) { }

    isUpdating$(): Observable<boolean> {
      return this.settingsState.isUpdating$;
    }

    // fetch the data from Store and passing it to component
    //  used with | async pipe to display data in html
    getCashflowCategories$(): Observable<CashflowCategory[]> {
      // Pass the state;
      // use to modify data from the state before passing it to
      // presentation components
      return this.settingsState.getCashflowCategories$;
    }

    // Fetch the data from API,
    // called on categories.component load
    loadCashflowCategories() {
      return this.cashflowCategoryApi.getCashflowCategories().pipe( tap((categories: CashflowCategory[]) => {
          return this.settingsState.setCashflowCategories(categories);
        }
      ));
    }

    // Optimistic Update:
    addCashflowCategory(category: CashflowCategory) {
      // update UI state
      this.settingsState.addCashflowCategory(category);

      // Call API
      this.cashflowCategoryApi.createCashflowCategory(category).subscribe(addedCategoryWithId => {
        // Update State's category with unique ID returned from server
        this.settingsState.updateCashflowCategoryId(category, addedCategoryWithId );
      },
        // if adding wasn't successful remove item from State;
        (error) => {
          this.settingsState.removeCashflowCategory(category);
          console.log('error occured ', error);
        }
      );
    }

    //  Pessimistic Update
    updateCashflowCategory(category: CashflowCategory) {
      // Notify State about updating
      // TODO: Why not Handle this in State method?
      this.cashflowCategoryApi.updateCashflowCategory(category).subscribe( (  ) => {
        this.settingsState.updateCashflowCategory(categoryToReplace);
      },
      (error) => console.log('Error ocurred while updating Cashflow category ', error ),

      () => this.settingsState.setUpdatingStatus(false)
      );
    }


}
