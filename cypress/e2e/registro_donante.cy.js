describe('Flujo de Inicio de Sesión - Banco de Sangre', () => {

  // Antes de cada prueba, Cypress va a abrir tu página de login
  beforeEach(() => {
    // ⚠️ Cambia este puerto si tu frontend corre en el 5173 (Vite) u otro.
    cy.visit('http://localhost:3000/login'); 
  });

  it('Debería mostrar un error si el usuario ingresa credenciales incorrectas', () => {
    // 1. Buscamos el campo de email y escribimos un correo falso
    cy.get('input[type="email"]').type('correo_falso@bancodesangre.com');
    
    // 2. Buscamos el campo de contraseña y escribimos cualquier cosa
    cy.get('input[type="password"]').type('123456');
    
    // 3. Hacemos clic en el botón de Iniciar Sesión
    cy.get('button[type="submit"]').click();

    // 4. Afirmamos que la página debe mostrar un mensaje de error
    // (Ajusta el texto "Credenciales inválidas" al error real que muestre tu página)
    cy.contains('Credenciales inválidas').should('be.visible');
  });

  it('Debería iniciar sesión correctamente con un usuario válido y redirigir al inicio', () => {
    // 1. Ingresamos un correo real que exista en tu base de datos de prueba de PostgreSQL
    cy.get('input[type="email"]').type('donante_real@email.com');
    
    // 2. Ingresamos la contraseña correcta
    cy.get('input[type="password"]').type('PasswordSeguro123!');
    
    // 3. Hacemos clic en el botón
    cy.get('button[type="submit"]').click();

    // 4. Afirmamos que el usuario fue redirigido a la página principal o panel
    cy.url().should('include', '/'); 
    // O si redirige a un panel: cy.url().should('include', '/dashboard');

    // 5. Verificamos que ahora aparezca el botón de "Cerrar Sesión" o el nombre del usuario
    cy.contains('Cerrar Sesión').should('be.visible');
  });

});