import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

// tslint:disable-next-line: component-class-suffix
export class CashflowCategory {
  constructor() {}
}

export class CategoriesComponent implements OnInit {

  @Input() cashflowCategories$: CashflowCategory[];
  newCategory: CashflowCategory = new CashflowCategory();
  isUpdating$: Observable<boolean>;

  constructor(private settingsService: SettingsService) {

    this.isUpdating$ = settingsService.isUpdating$();
   }

  ngOnInit() {
    // Fetch the data from API
    this.settingsService.loadCashflowCategories();
  }

  addCategory(category: CashflowCategory) {
    this.settingsService.addCashflowCategory(category);
  }

  updateCategory(category: CashflowCategory) {
    this.settingsService.updateCashflowCategory(category);
  }

}
