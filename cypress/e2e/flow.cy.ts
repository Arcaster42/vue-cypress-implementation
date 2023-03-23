describe('flow test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })
  it('visits the page', () => {
    cy.contains('PokeSprite').should('be.visible')
  })
  it('searched pikachu', () => {
    cy.intercept('GET', 'https://pokeapi.co/', (req) => {
      req.continue((res) => {
        expect(res.statusCode).to.eq(200)
      })
    })
    cy.get('[data-cy="search-input"]').type('pikachu')
    cy.get('[data-cy="search-button"]').click()
    cy.get('[data-cy="sprite-large"]').should('be.visible')
    // cy.wait('@FETCH')
  })
  it('should 404 searching non-pokemon', () => {
    cy.intercept('GET', 'https://pokeapi.co/', (req) => {
      req.continue((res) => {
        expect(res.statusCode).to.eq(404)
      })
    })
    cy.get('[data-cy="search-input"]').type('cheese')
    cy.get('[data-cy="search-button"]').click()
    cy.get('[data-cy="alert-wrapper"]').should('be.visible')
  })
})