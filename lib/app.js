class Model {
	constructor(){
		this.balance		
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

export {Model, View, Controller }
