/**
 * @jest-environment jsdom
 */

const app = require('../lib/app.js')
let myModel = new app.Model()

const initBeforeEach = () => {
	beforeEach(() => {
		myModel = new app.Model()
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
		console.log(myModel.getLocalStorageItems()[0])
		expect(myModel.getLocalStorageItems().length).toBe(0)
		
	})
})
