import { Expense } from './../../app/expense.model';
import { ExpenseService } from './../../app/expense.service';
import { DetailPage } from './../detail/detail';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenses: Expense[];

  constructor(private navCtrl: NavController, private expenseService: ExpenseService) {


  }

  onItemClick(expense: Expense) {
    console.log(expense.description);
    this.navCtrl.push(DetailPage, {
      expenseId: expense.id
    });
  }
  onAddClick(){
    this.navCtrl.push(DetailPage);

  }

  ionViewWillEnter(){
    // Called whenever the page is about to be displayed - ionic lifecycle hook
    this.expenseService.getExpenses()
      .then(expenses => this.expenses = expenses);
  }

}
