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
		myView.balance = document.getElementById('balance')
		myView.moneyPlus = document.getElementById('money-plus')
		myView.moneyMinus = document.getElementById('money-minus')
		myView.list = document.getElementById('list')
		myView.form = document.getElementById('form')
		myView.text = document.getElementById('text')
		myView.amount = document.getElementById('amount')
	})
}

describe('View > displayTransactions():', () => {
	initBeforeEach()
	test('displayTransactions() should be defined', () => {
		myModel.addNewTransaction('Huy', 300)
		const transactions = myModel.getLocalStorageItems()
		myView.displayTransactions(transactions)
		expect(myView.list.innerHTML).toBe(`<li class="plus">
				Huy <span>+300</span> <button class="delete-btn">x</button>
			</li>`)
	})
})
