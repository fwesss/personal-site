describe("hello", () => {
	beforeEach(() => {
		cy.visit("/")
	})

	it("should have the text Next on the screen", () => {
		cy.findByText("Welcome to")
	})
})
