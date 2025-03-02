describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('A2E1 - Verifica o título da aplicação.', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  
  it('A2EE1 - Preenche os campos obrigatórios e envia o formulário.', () => {
    cy.get('#firstName').type('First_Name')
    cy.get('#lastName').type('Last_Name')
    cy.get('#email').type('email@example.com')
    cy.get('#open-text-area').type('Testing text box.')

    cy.get('.button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('A2EE2 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida.', () => {
    cy.get('#firstName').type('First_Name')
    cy.get('#lastName').type('Last_Name')
    cy.get('#email').type('email@example')
    cy.get('#open-text-area').type('Testing text box.')
    cy.get('.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('A2EE3 - Número de telefone só aceita números.', () => {
    cy.get('#phone').type('testing').should('be.empty')
  })

  it('A2EE4 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário.', () => {
    cy.get('#firstName').type('First_Name')
    cy.get('#lastName').type('Last_Name')
    cy.get('#email').type('email@example.com')
    cy.get('#open-text-area').type('Testing text box.')
    cy.get('#phone-checkbox').click()

    cy.get('.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('A2EE5 - Preenche e limpa os campos nome, sobrenome, email e telefone.', () => {
    var firstName = 'First_Name'
    cy.get('#firstName').type(firstName).should('have.value', firstName).clear().should('be.empty')

    var lastName = 'Last_Name'
    cy.get('#lastName').type(lastName).should('have.value', lastName).clear().should('be.empty')

    var email = 'email@example.com'
    cy.get('#email').type(email).should('have.value', email).clear().should('be.empty')
    
    var textBox = 'Testing text box.'
    cy.get('#open-text-area').type(textBox).should('have.value', textBox).clear().should('be.empty')
  })

  it('A2EE6 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.get('.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('A2EE7 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    const data = {
      firstName: 'First_Name',
      lastName: 'Last_Name',
      email: 'email@example.com',
      text: 'Testing text box.'
    }

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('A2EE8 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })


  it('A3E1 - Seleciona um produto (YouTube) por seu texto.', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('A3EE1 - Seleciona um produto (Mentoria) por seu valor.', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('A3EE2 - Seleciona um produto (Blog) por seu índice.', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('A4E1 - Marca o tipo de atendimento "Feedback".', () => {
    cy.get('input[type="radio"][value=feedback]').check().should('have.value', 'feedback')
  })

  it('A4EE1 - Marca cada tipo de atendimento.', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService).check().should('be.checked')
      })
  })

  it('A5E1 - Marca ambos checkboxes, depois desmarca o último.', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('A5EE1 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário.', () => {
    cy.get('#firstName').type('First_Name')
    cy.get('#lastName').type('Last_Name')
    cy.get('#email').type('email@example.com')
    cy.get('#open-text-area').type('Testing text box.')
    cy.get('#phone-checkbox').check()

    cy.get('.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('A6E1 - Seleciona um arquivo da pasta fixtures.', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('A6EE1 - Seleciona um arquivo simulando um drag-and-drop.', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('A6EE2 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias.', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('A7E1 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique.', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('A7EE1 - Acessa a página da política de privacidade removendo o target e então clicando no link.', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('A12E1 - Verifica se a mensagem de erro exibida ao submeter o formulário sem preencher os campos obrigatórios realmente dura 3 segundos.', () => {
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  Cypress._.times(5, () => {
    it('A12E2 - Verifica se a mensagem de erro exibida ao submeter o formulário sem preencher os campos obrigatórios realmente dura 3 segundos.', () => {
      cy.clock()
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
      cy.tick(3000)
      cy.get('.error').should('not.be.visible')
    })
  })

  it('A12E3 - Exibe e oculta as mensagens de sucesso e erro usando .invoke().', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
      
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('A12E3 - Preenche o campo da área de texto usando o comando invoke.', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Um texto qualquer.')
      .should('have.value', 'Um texto qualquer.')
  })

  it('A12E4 - Faz uma requisição HTTP.', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)

    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')

    cy.get('@getRequest')
        .its('body')
        .should('include', 'CAC TAT')
  })

  it('DESAFIO - Achar o gato.', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu amo gatos S2.')
  })

})
