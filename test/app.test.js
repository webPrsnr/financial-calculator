/**
 * @jest-environment jsdom
 */

const app = require('../lib/app.js')
let myModel = new app.Model()
let myView = new app.View()

const initBeforeEach = () => {
	beforeEach(() => {
		myModel = new app.Model()
		myView = new app.View()
		localStorage.clear()
	})
}

describe('Model > manipulating with localStorage:', () => {
	initBeforeEach()

	test('getLocalStorageItems should be defined', () => {
		const items = myModel.getLocalStorageItems()
		expect(items).toBeDefined()
		expect(items).not.toBeUndefined()
	})

	test('setLocalStorageItems should change localStorage', () => {
		const someObj = {id:1, transaction:"Buy flowers", amount:-15}
		myModel.setLocalStorageitems(someObj)
		const items = myModel.getLocalStorageItems()
		expect(items[0]).toEqual(someObj)
	})

})

describe('Model > addNewTransaction():', () => {
	initBeforeEach()
	test('should give new obj', () => {
		expect(myModel.getLocalStorageItems().length).toBe(0)
		myModel.addNewTransaction("Sell telephone", 50)
		expect(myModel.getLocalStorageItems().length).toBe(1)
		const expectedTransaction = {id:1, text:"Sell telephone", amount:50}
		expect(myModel.getLocalStorageItems()[0]).toEqual(expectedTransaction)
	})
})

describe('Model > deleteTransaction():', () => {
	initBeforeEach()
	test('should delete the transaction', () => {
		myModel.addNewTransaction("Buy ice cream", -3)
		myModel.addNewTransaction("Sell red t-shirt", 15)
		expect(myModel.getLocalStorageItems().length).toBe(2)
		myModel.deleteTransaction(2)
		expect(myModel.getLocalStorageItems().length).toBe(1)
		const expectedTransaction = {id:1, text:"Buy ice cream", amount:-3}
		expect(myModel.getLocalStorageItems()[0]).toEqual(expectedTransaction)
	})
})

describe('Model > calculateExpense():', () => {
	initBeforeEach()
	test('should calculate balance, income and expense', () => {
		myModel.addNewTransaction("Pay day", 1000)
		myModel.addNewTransaction("Buy glasses", -10)
		myModel.addNewTransaction("Hot dog", -5)
		expect(myModel.balance).toBe(985)
		expect(myModel.income).toBe(1000)
		expect(myModel.expense).toBe(-15)
		myModel.deleteTransaction(2)
		expect(myModel.balance).toBe(995)
		expect(myModel.expense).toBe(-5)
	})
		
})

describe('View > displayTransactions():', () => {
	initBeforeEach()
	//console.log(myView)
	test('displayTransactions() should be defined', () => {
				document.body.innerHTML = `
			    <h2>Expense Tracker</h2>

	    <div class="container">
	      <h4>Your Balance</h4>
	      <h1 id="balance">$0.00</h1>

	      <div class="inc-exp-container">
	        <div>
	          <h4>Income</h4>
	          <p id="money-plus" class="money plus">+$0.00</p>
	        </div>
	        <div>
	          <h4>Expense</h4>
	          <p id="money-minus" class="money minus">-$0.00</p>
	        </div>
	      </div>

	      <h3>History</h3>
	      <ul id="list" class="list">
	      </ul>

	      <h3>Add new transaction</h3>
	      <form id="form">
	        <div class="form-control">
	          <label for="text">Text</label>
	          <input type="text" id="text" placeholder="Enter text..." />
	        </div>
	        <div class="form-control">
	          <label for="amount"
	            >Amount <br />
	            (negative - expense, positive - income)</label
	          >
	          <input type="number" id="amount" placeholder="Enter amount..." />
	        </div>
	        <button class="btn">Add transaction</button>
	      </form>
	    </div>
		`
		require('../lib/app.js')
		myView.balance = document.getElementById('balance')
		myView.moneyPlus = document.getElementById('money-plus')
		myView.moneyMinus = document.getElementById('money-minus')
		myView.list = document.getElementById('list')
		myView.form = document.getElementById('form')
		myView.text = document.getElementById('text')
		myView.amount = document.getElementById('amount')
		
		myModel.addNewTransaction('Huy', 300)
		const transactions = myModel.getLocalStorageItems()
		myView.displayTransactions(transactions)
		expect(myView.list.innerHTML).toBe(`<li class="plus">
				Huy <span>+300</span> <button class="delete-btn">x</button>
			</li>`)
		
	})
	// omg it's so fucking dirty	
})
