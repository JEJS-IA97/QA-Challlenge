let time = 1500;
let data;

describe("CRUD Orders", () => {

    let productsBefore;
     it("Get Orders", () => {
        data=cy.request("http://localhost:5044/api/Order").should((response) => {
            expect(response.status).to.eq(200)
            productsBefore = response.body;
        })
    })

    it("Get Order by ID", () => {
        const OrderId = 1; 
        cy.request(`http://localhost:5044/api/Order/${OrderId}`).then((response) => {
            expect(response.status).to.eq(200);
    
            expect(response.body).to.have.property('id', OrderId); 
            expect(response.body).to.have.property('productName');
            expect(response.body).to.have.property('quantity'); 
            expect(response.body).to.have.property('status');
        });
    });
    

    it("Create Order", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:5044/api/Order",
            body: {
                "id": 1,
                "productName":"Product 1",
                "quantity":1,
                "status": "Done"
            }
        }).then(response => {
            expect(response.status).to.eql(201)
        })
    })

    it("Insert multiple Orders in api", () => {
        for (let x = 0; x <= 10; x++) {
            const Order = "Product " + (1 + x);
            const Quantity = Math.floor(Math.random() * 30);
            const statuses = ["Created", "Progress","Done"]
            const Status = statuses[Math.floor(Math.random() * statuses.length)];
    
            cy.request({
                method: "POST",
                url: "http://localhost:5044/api/Order",
                body: {
                    "id": 1 + x,
                    "productName": Order,
                    "quantity": Quantity,
                    "status": Status
                }
            }).then(response => {
                expect(response.status).to.eql(201);

                cy.visit('http://localhost:3000/orders'); 

            });
        }
    });

    it("Update Order", () => {
    
        cy.request({
            method: "PUT",
            url: "http://localhost:5044/api/Order/1",
            body: {
                "id": 2,
                "productName": "Order",
                "quantity": 5,
                "status": "Done"
            }
        }).then(response => {
            expect(response.status).to.eql(204)
        })
    })

    it("Delete Order", () => {
        cy.request({
            method: "DELETE",
            url: "http://localhost:5044/api/Order/10",
    
        }).then(response => {
            expect(response.status).to.eql(204)
        })
    })

    it("Delete multiple orders in api", () => {
    for (let x = 4; x <= 5; x++) {
        cy.request({
            method: "DELETE",
            url: `http://localhost:5044/api/Order/${x}`,
        }).then(response => {
            expect(response.status).to.eql(204);
        });
        cy.contains(`Order ${x}`).should('not.exist'); 
    }
});
    
})