require('cypress-plugin-tab')
const FRONTEND_URL = "http://localhost:3000";
const API_URL = "http://localhost:5044"; 
let time = 1500

describe('Test login', () => {

    beforeEach(() => {
        cy.visit(FRONTEND_URL)
    });

    it('Verify the login is susccessful with valid credetials', ()=> {

        cy.get('#root > div > nav > ul > li:nth-child(1) > a').should('be.visible').and("have.text","Login").click()

        cy.wait(time)

        cy.get('#root > div > div > h2').should('be.visible').and("have.text","Login")
        cy.get('input[type=text]').should('be.visible').type("testuser")
        cy.get('input[type=password]').should('be.visible').type("password")

        cy.intercept("POST", `${API_URL}/api/User/login`).as("loginRequest");

        cy.contains("button", "Login").click();

        cy.wait("@loginRequest").then((interception) => {
        const { response } = interception;

        expect(response.statusCode).to.eq(200);

        expect(response.body).to.have.property("token");

        cy.log(`Token recibido: ${response.body.token}`);
    });

        cy.wait(time)

        cy.get("p").should("contain", "Logged in with token").then(()=>{
          cy.get(':nth-child(2) > a').click();
          cy.get('h2').should('be.visible').and("have.text","Dashboard");
          cy.get('p').should('be.visible').and("have.text","Welcome to the user dashboard!");
        });

        cy.wait(time)
    });

    it("Verify login with the correct username and the wrong password.", () => {

        cy.get('#root > div > nav > ul > li:nth-child(1) > a').should('be.visible').and("have.text","Login").click()

        cy.wait(time)
    
        cy.get('#root > div > div > h2').should('be.visible').and("have.text","Login")
        cy.get('input[type=text]').should('be.visible').type("testuser").tab().should('be.visible').type("password2")
    
        cy.intercept("POST", `${API_URL}/api/User/login`).as("loginRequest");
    
        cy.contains("button", "Login").click();
    
        cy.wait("@loginRequest").then((interception) => {
          const { response } = interception;
    
          expect(response.statusCode).to.eq(401);
    
          expect(response.body).to.have.property("title", "Unauthorized");
        });
    
        cy.get("p").should("contain", "Login failed");

        cy.wait(time)
      });

      it("Verify login with the wrong username and the correct password.", () => {

        cy.get('#root > div > nav > ul > li:nth-child(1) > a').should('be.visible').and("have.text","Login").click()

        cy.wait(time)
    
        cy.get('#root > div > div > h2').should('be.visible').and("have.text","Login")
        cy.get('input[type=text]').should('be.visible').type("testuser2").tab().should('be.visible').type("password")
    
        cy.intercept("POST", `${API_URL}/api/User/login`).as("loginRequest");
    
        cy.contains("button", "Login").click();
    
        cy.wait("@loginRequest").then((interception) => {
          const { response } = interception;
    
          expect(response.statusCode).to.eq(401);
    
          expect(response.body).to.have.property("title", "Unauthorized");
        });
    
        cy.get("p").should("contain", "Login failed");

        cy.wait(time)
      });

    it("Verify loin with the incorrect username and password.", () => {

        cy.wait(time)

        cy.get('#root > div > nav > ul > li:nth-child(1) > a').should('be.visible').and("have.text","Login").click()
    
        cy.get('#root > div > div > h2').should('be.visible').and("have.text","Login")
        cy.get('input[type=text]').should('be.visible').type("testuser2")
        cy.get('input[type=password]').should('be.visible').type("password2")
    
        cy.intercept("POST", `${API_URL}/api/User/login`).as("loginRequest");
    
        cy.contains("button", "Login").click();
    
        cy.wait("@loginRequest").then((interception) => {
          const { response } = interception;
    
          expect(response.statusCode).to.eq(401);
    
          expect(response.body).to.have.property("title", "Unauthorized");
        });
    
        cy.get("p").should("contain", "Login failed");

        cy.wait(time)
      });

      it("Verify login with empty password.", () => {

        cy.get('#root > div > nav > ul > li:nth-child(1) > a').should('be.visible').and("have.text","Login").click()

        cy.wait(time)
    
        cy.get('#root > div > div > h2').should('be.visible').and("have.text","Login")
        cy.get('input[type=text]').should('be.visible').type("testuser")
        cy.get('input[type=password]').should('be.visible').should('have.value', '');
    
        cy.intercept("POST", `${API_URL}/api/User/login`).as("loginRequest");
    
        cy.contains("button", "Login").click();
    
        cy.wait("@loginRequest").then((interception) => {
          const { response } = interception;
    
          expect(response.statusCode).to.eq(401);
    
          expect(response.body).to.have.property("title", "Unauthorized");
        });
    
        cy.get("p").should("contain", "Login failed");

        cy.wait(time)
      });

      it("Verify login with empty username.", () => {

        cy.get('#root > div > nav > ul > li:nth-child(1) > a').should('be.visible').and("have.text","Login").click()

        cy.wait(time)
    
        cy.get('#root > div > div > h2').should('be.visible').and("have.text","Login")
        cy.get('input[type=text]').should('be.visible').should('have.value', '');
        cy.get('input[type=password]').should('be.visible').type("password")
    
        cy.intercept("POST", `${API_URL}/api/User/login`).as("loginRequest");
    
        cy.contains("button", "Login").click();
    
        cy.wait("@loginRequest").then((interception) => {
          const { response } = interception;
    
          expect(response.statusCode).to.eq(401);
    
          expect(response.body).to.have.property("title", "Unauthorized");
        });
    
        cy.get("p").should("contain", "Login failed");
        
        cy.wait(time)
      });

      it("Verify login with both fields empty.", () => {

        cy.get('#root > div > nav > ul > li:nth-child(1) > a').should('be.visible').and("have.text","Login").click()

        cy.wait(time)
    
        cy.get('#root > div > div > h2').should('be.visible').and("have.text","Login")
        cy.get('input[type=text]').should('be.visible').should('have.value', '');
        cy.get('input[type=password]').should('be.visible').should('have.value', '');
    
        cy.intercept("POST", `${API_URL}/api/User/login`).as("loginRequest");
    
        cy.contains("button", "Login").click();
    
        cy.wait("@loginRequest").then((interception) => {
          const { response } = interception;
    
          expect(response.statusCode).to.eq(401);
    
          expect(response.body).to.have.property("title", "Unauthorized");
        });
    
        cy.get("p").should("contain", "Login failed");
        
        cy.wait(time)
      });

})