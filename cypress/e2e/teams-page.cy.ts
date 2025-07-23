describe('Team Page', () => {
  beforeEach(() => {
    cy.visit('/dashboard/teams');
  });

  it('should display the filters section', () => {
    cy.get('app-filter').should('exist');
  });

  it('should show loading spinner initially', () => {
    cy.get('.loading-state').should('exist');
    cy.get('.loading-spinner').should('exist');
  });

  it('should show team members if data is loaded', () => {
    cy.get('.members-grid app-team-card')
      .should('have.length.greaterThan', 0);
  });

  it('should allow switching to list view', () => {
    cy.contains('button', 'List').click();
    cy.get('.members-grid').should('have.class', 'list-view');
  });

  it('should allow switching back to grid view', () => {
    cy.contains('button', 'Grid').click();
    cy.get('.members-grid').should('have.class', 'grid-view');
  });

  it('should display empty state if no members are found', () => {
    cy.intercept('GET', '/assets/data/team.json', {
      statusCode: 200,
      body: [],
    }).as('getEmptyTeam');

    cy.reload();
    cy.wait('@getEmptyTeam');

    cy.get('.empty-state').should('exist');
    cy.contains('No team members found');
  });
});
