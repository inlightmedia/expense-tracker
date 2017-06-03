import { Expense } from './expense.model';
import uuidv4 from 'uuid/v4';

export class ExpenseService {

  categories = ["Food", "Travel", "Business", "Other"];
  expensesHaveBeenAdded = false;
  newExpenseId;

   expenses:Expense[] = this.loadExpenses() || [];

getExpense(expenseId: string){
  //return the expense if it is true that the expense object has an id property with the value of expenseId (1,2, or 3 in this case)
  // return this.expenses.find(it => it.id === expenseId);

  // Can also return a copy of the expense so you are not editing the original memory space
  const expense = this.expenses.find(it => it.id === expenseId);
  return Object.assign({}, expense); // This takes the top level properties of the expense object and assigns them to a new empty object (different memory space)
}

updateExpense(expense: Expense){
  // determines which position i the expenses array our matching expense is so we can edit it
  const index = this.expenses.findIndex(it => it.id === expense.id)
  this.expenses[index] = expense;
  // Stores data in a local storage so that data will be present on app reset.
  this.storeExpenses();
}

addExpense(expense: Expense){

  // Generate a new univesal unique ID
  expense.id = uuidv4();
  if (!expense.currency) {
    expense.currency = 'CAD';
  }
  this.expenses.push(expense);
  this.storeExpenses();
  this.expensesHaveBeenAdded = true;
  console.log('The new Expense is:', expense);
}

removeExpense(expense: Expense) {
 console.log('This expense will be removed:', expense);
 const index = this.expenses.findIndex(it => it.id === expense.id)
  const itemRemoved = this.expenses.splice(index, 1);
  console.log('Expense removed:', itemRemoved);
  this.storeExpenses();
}

private loadExpenses(): Expense[] {
  return JSON.parse(localStorage.getItem('expenses'));
}

private storeExpenses() {
  localStorage.setItem('expenses', JSON.stringify(this.expenses));
}

}
