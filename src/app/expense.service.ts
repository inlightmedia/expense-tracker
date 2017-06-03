import { Expense } from './expense.model';
import uuidv4 from 'uuid/v4';
import Dexie from 'dexie';

export class ExpenseService extends Dexie {

  categories = ["Food", "Travel", "Business", "Other"];
  expensesHaveBeenAdded = false;
  newExpenseId;
  // make an indexedDB databse store or in this case Table with the type of Expense and the primary key type
  expenses: Dexie.Table<Expense, string>;

  constructor(){
  super('expense_tracker')
    this.version(1).stores({
      expenses: 'id, date' //only specify those to be indexed
    });
  }
getExpense(expenseId: string):Dexie.Promise<Expense>{
  return this.expenses.get(expenseId);

}

getExpenses():Dexie.Promise<Expense[]>{
  return this.expenses.toArray();
}

updateExpense(expense: Expense){
  return this.expenses.update(expense.id, expense);
}

addExpense(expense: Expense){

  // Generate a new univesal unique ID
  expense.id = uuidv4();
  return this.expenses.add(expense);

}

removeExpense(expenseId: string) {
  return this.expenses.delete(expenseId)

}


}
