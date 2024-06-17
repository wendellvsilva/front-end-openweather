describe('Cadastro de Cidades', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/cadastroCidades/");
    cy.get('h1').should('contain', 'Cadastro de dados meteorológicos');
  });

  it('Permitir o preenchimento e envio do formulário', () => {
    cy.get('.cadastroCidades_busca_cidades_data__dvyQC > :nth-child(1) > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input').type('Jaboatão dos Guararapes, Pernambuco');
    cy.get('.ant-picker-input').click();
    cy.get('.ant-picker-cell-inner').contains('15').click();
    cy.get(':nth-child(1) > .ant-input-number-input-wrap > .ant-input-number-input').type('30');
    cy.get('.cadastroCidades_input_temperatura__NYfWQ > :nth-child(2) > .ant-input-number-input-wrap > .ant-input-number-input').type('20');
    cy.get('.cadastroCidades_precipitacao__3COgp > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('1');
    cy.get('.cadastroCidades_umidade__x-7MS > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('80');
    cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('10');
    cy.get('.ant-select-selector').click();

    cy.get('.ant-select-item-option')
      .contains('ENSOLARADO')
      .click();

    cy.get('.ant-radio-group input').check('TARDE', { force: true });


    cy.get('.ant-btn-primary').click();
    cy.get('[style="margin-top: 20px; margin-left: 80px;"] > :nth-child(3) > div > .ant-input-group-wrapper > .ant-input-wrapper').type('Jaboatão dos Guararapes, Pernambuco').type('{enter}');



  });

});