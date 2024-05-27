describe('Cadastro de Cidades', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/cadastroCidades/');
  });


  it('Permitir o preenchimento e envio do formulário', () => {
      cy.get('h1').should('contain', 'Cadastro de dados meteorológicos');
      cy.get('input[placeholder="Digite a cidade"]').type('São Paulo');
      cy.get('.ant-picker-input').click();
      cy.get('.ant-picker-cell-inner').contains('15').click();
      cy.get(':nth-child(1) > .ant-input-number-input-wrap > .ant-input-number-input').type('30');
      cy.get('.cadastroCidades_input_temperatura__NYfWQ > :nth-child(2) > .ant-input-number-input-wrap > .ant-input-number-input').type('20');
      cy.get('.cadastroCidades_precipitacao__3COgp > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('1');
      cy.get('.cadastroCidades_umidade__x-7MS > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('80');
      cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('10');
      cy.get('.ant-select-selector').click();
      cy.get('.ant-select-item-option').contains('ENSOLARADO').click();
      cy.get('.ant-radio-group input').check('MANHÃ');
      cy.get('button[type="submit"]').click();
      cy.get('.ant-message-notice').should('contain', 'Sucesso!');
  });

  it('Exibir mensagem de erro ao tentar enviar o formulário sem preencher os campos obrigatórios', () => {
      cy.get('button[type="submit"]').click();
      cy.get('.ant-message-notice').should('contain', 'Erro!');
  });
});