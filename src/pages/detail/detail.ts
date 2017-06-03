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
    if(expenseId){
      this.expense = expenseService.getExpense(expenseId);
      this.newExpense = false;
    } else {
      this.newExpense = true;
      this.expense = {
        id: null,
        date: '',
        currency: '',
        amount: null,
        category: '',
        description: ''
      }
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

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Expense removed successfully',
    duration: 3000,
    position: 'bottom',
    cssClass: 'toast'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

  showConfirm() {

      let confirm = this.alertCtrl.create({
        title: 'Remove this expense?',
        message: 'This cannot be undone.',
        buttons: [
          {
            text: 'No Way!',
            handler: () => {
              console.log('Disagree clicked');
              this.choice = false;

            }
          },
          {
            text: 'Make it so',
            handler: () => {
              console.log('Agree clicked');
              this.expenseService.removeExpense(this.expense);
              this.navCtrl.pop();
              this.presentToast();
            }
          }
        ]
      });
      confirm.present();

    }

}
