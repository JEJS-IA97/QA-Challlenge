let time = 1500;
let data;

describe("CRUD Products", () => {

    let productsBefore;
     it("Get Products", () => {
        data=cy.request("http://localhost:5044/api/Product").should((response) => {
            expect(response.status).to.eq(200)
            productsBefore = response.body;
        })
    })

    it.only("Get Product by ID", () => {
        const productId = 1; 
        cy.request(`http://localhost:5044/api/Product/${productId}`).then((response) => {
            expect(response.status).to.eq(200);
    
            expect(response.body).to.have.property('id', productId); 
            expect(response.body).to.have.property('name');
            expect(response.body).to.have.property('price'); 
        });
    });
    

    it("Create Products", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:5044/api/Product",
            body: {
                "id": 1,
                "name":"Product 1",
                "price":"50"
            }
        }).then(response => {
            expect(response.status).to.eql(201)
        })
    })

    it("Insert multiple products in api", () => {
        for (let x = 0; x <= 10; x++) {
            let productName = "Product " + (1 + x);
    
            let randomPrice = Math.floor(Math.random() * 99) + 1;
    
            cy.request({
                method: "POST",
                url: "http://localhost:5044/api/Product",
                body: {
                    "id": 1 + x,
                    "name": productName,
                    "price": randomPrice
                }
            }).then(response => {
                expect(response.status).to.eql(201);

                cy.visit('http://localhost:3000/products'); 
                cy.contains(productName).should('exist')
            });
        }
    });

    it("Update Product", () => {
        cy.request({
            method: "PUT",
            url: "http://localhost:5044/api/Product/1",
            body: {
                "name": "Actual product",
                "price": "80"
            }
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })

    it("Delete Product", () => {
        cy.request({
            method: "DELETE",
            url: "http://localhost:5044/api/Product/10",
    
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })

    it.only("Delete multiple products in api", () => {
    for (let x = 4; x <= 5; x++) {
        cy.request({
            method: "DELETE",
            url: `http://localhost:5044/api/Product/${x}`,
        }).then(response => {
            expect(response.status).to.eql(204);
        });

        cy.contains(`Product ${x}`).should('not.exist'); 
    }
});
    
})