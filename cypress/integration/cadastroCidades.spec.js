describe('Cadastro de Cidades', () => {
    beforeEach(() => {
        cy.visit('/cadastroCidades');
    });

    it('Exibir o formulário de cadastro de cidades', () => {
        cy.get('h1').should('contain', 'Cadastro de dados meteorológicos');
    });

    it('Permitir o preenchimento e envio do formulário', () => {
        cy.get('input[placeholder="Digite a cidade"]').type('São Paulo');
        cy.get('.txt_data').click();
        cy.get('.ant-picker-cell-inner').contains('15').click();
        cy.get('input[placeholder="Máxima"]').type('30');
        cy.get('input[placeholder="Mínima"]').type('20');
        cy.get('input[placeholder="Precipitação"]').type('5');
        cy.get('input[placeholder="Umidade"]').type('80');
        cy.get('input[placeholder="Velocidade do vento"]').type('10');
        cy.get('.ant-select-selector').click();
        cy.get('.ant-select-item-option').contains('ENSOLARADO').click();
        cy.get('.ant-radio-group input').check('MANHÃ');

        cy.get('button[type="submit"]').click();

        cy.wait(500);

    
        cy.get('.ant-message-notice').should('contain', 'Sucesso!');
    });

    it('Exibir mensagem de erro ao tentar enviar o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click();
        cy.wait(500);
        cy.get('.ant-message-notice').should('contain', 'Erro!');
    });
});