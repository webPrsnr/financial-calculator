class Model {
	constructor(){
		this.balance = new Number()
		this.income = new Number()
		this.expense = new Number()		
	}
	bindTransactionsChanged(callback) {
		this.transactionsChanged = callback
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
		this.transactionsChanged(this.getLocalStorageItems(), this.balance, this.income, this.expense)	
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
		this.balance = document.getElementById('balance')
		this.moneyPlus = document.getElementById('money-plus')
		this.moneyMinus = document.getElementById('money-minus')
		this.list = document.getElementById('list')
		this.form = document.getElementById('form')
		this.text = document.getElementById('text')
		this.amount = document.getElementById('amount')
//		this.button = document.getElementById('btn')
	}

	displayTransactions(transactions, balance, income, expense) {
		while (this.list.firstChild) {
			this.list.removeChild(this.list.firstChild)
		}

		transactions.forEach((el) => {
			const item = document.createElement('li')
			const sign = el.amount < 0 ? '-' : '+'
			
			//{id:1, text:'Buy chocolate', amount:-20}
			item.classList.add(el.amount < 0 ? 'minus' : 'plus')
			item.innerHTML = `
				${el.text} <span>${sign}${el.amount}</span> <button class="delete-btn">x</button>
			`;
			this.list.appendChild(item)
		})
		this.balance.innerText = `$${balance}`
		this.moneyMinus.innerText = `$${expense}`
		this.moneyPlus.innerText = `$${income}`

		this.text.value = ''
		this.amount.value = ''
	}

	bindAdd(handler) {
		this.form.addEventListener('submit', event => {
			event.preventDefault()
			handler(this.text.value, parseInt(this.amount.value))
		})
	}
}


class Controller{
	constructor(model, view){
		this.model = model
		this.view = view
		this.model.calculateExpense()
		this.view.bindAdd(this.handleAdd)
		this.transactionsChanged(this.model.getLocalStorageItems(), this.model.balance, this.model.income, this.model.expense)

		this.model.bindTransactionsChanged(this.transactionsChanged)
	}

	handleAdd = (text, amount) => {
		this.model.addNewTransaction(text, amount)
	}

	transactionsChanged = (transactions, balance, income, expense) => {
		console.log('1s')
		this.view.displayTransactions(transactions, balance, income, expense)		
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





