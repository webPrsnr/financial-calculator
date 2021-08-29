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

