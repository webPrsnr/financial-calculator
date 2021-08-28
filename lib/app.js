class Model {
	constructor(){
		this.balance = new Number()
		this.income = new Number()
		this.expense = new Number()		
	}

	calculateExpense() {
		const transactions = this.getLocalStorageItems()
		this.balance = transactions.reduce((sum, current) => {
			return sum + current.amount
		}, 0)
		this.income = transactions.filter((el) => el.amount > 0).reduce((sum, current) => sum + current.amount, 0) || 0
		this.expense = transactions.filter((el) => el.amount < 0).reduce((sum, current) => sum + current.amount, 0) || 0
	}

	getLocalStorageItems(){
		const transactions = (localStorage.getItem('transactions') !== null) ? JSON.parse(localStorage.getItem('transactions')) : []
		return transactions
	}

	setLocalStorageitems(someObj){
		let transactions = this.getLocalStorageItems()
		transactions.push(someObj)
		localStorage.setItem('transactions', JSON.stringify(transactions))
	}
	//{id:1, text:'Buy chocolate', amount:-20}
	addNewTransaction(text, amount) {
		const transactions = this.getLocalStorageItems()
		const newTransaction = {
			id: (transactions.length === 0) ? 1 : transactions[transactions.length - 1].id + 1,
			text: text,
			amount: amount
		}
		
		this.setLocalStorageitems(newTransaction)
		this.calculateExpense()	
	}

	deleteTransaction(id) {
		const transactions = this.getLocalStorageItems()
		localStorage.clear()
		transactions.filter((transaction) => transaction.id !== id).map((el) => this.setLocalStorageitems(el))
		this.calculateExpense()
	}

}

class View {
	constructor(){
		
	}
}


class Controller{
	constructor(model, view){
		this.model = model
		this.view = view
	}
}

const app = new Controller(new Model(), new View())

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Model: Model,
    View: View,
    Controller: Controller
  }
}





