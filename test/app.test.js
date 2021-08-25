/**
 * @jest-environment jsdom
 */

const app = require('../lib/app.js')

let myModel
const initBeforeEach = () => {
	beforeEach(() => {
		myModel = new app.Model()
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


