import { Expense } from './../../app/expense.model';
import { ExpenseService } from './../../app/expense.service';
import { AlertController, ToastController } from 'ionic-angular';

// Angular Imports
import { Component } from '@angular/core';


// Ionic Imports
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  newExpense = true;
  expense: Expense;
  categories: string[];
  choice;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private expenseService: ExpenseService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController
              ) {
    const expenseId = navParams.data.expenseId;
    // this.expense = navParams.data.expense;
    this.categories = this.expenseService.categories;

    // Initialize empty expense until async promise returns from the database to prevent undefined expense error
    this.newExpense = true;
    this.expense = {
      date: '',
      currency: 'CAD',
      amount: null,
      category: '',
      description: ''
    }

    if(expenseId){
      expenseService.getExpense(expenseId)
        .then(expense => {
          this.expense = expense;
          console.log(expense.date);
        })
        .catch(error => console.log(error));
      this.newExpense = false;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  onSave(){
    // take the form data and pass it to the updateExpense method of the expenseService
    if (this.newExpense === false) {
      this.expenseService.updateExpense(this.expense);
    } else {
      this.expenseService.addExpense(this.expense);
    }
    // Remove the current page from the page stack after updating
    this.navCtrl.pop();
  }

  showConfirm() {

      let confirm = this.alertCtrl.create({
        title: 'Remove this expense?',
        message: 'This cannot be undone.',
        buttons: [
          {
            text: 'Stop right there!',
            handler: () => {}
          },
          {
            text: 'Delete',
            handler: () => {
              console.log('Agree clicked');
              this.expenseService.removeExpense(this.expense.id)
                .then(result => this.navCtrl.pop())
                .catch(error => console.log(error));
            }
          }
        ]
      });
      confirm.present();

    }

    // presentToast() {
    //   let toast = this.toastCtrl.create({
    //     message: 'Expense removed successfully',
    //     duration: 3000,
    //     position: 'bottom',
    //     cssClass: 'toast'
    //   });

    //   toast.onDidDismiss(() => {
    //     console.log('Dismissed toast');
    //   });

    //   toast.present();
    // }
}
