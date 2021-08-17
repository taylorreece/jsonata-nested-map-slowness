const jsonata = require("jsonata");
const fs = require("fs");

const expression = `
$map($, function($customer) {
  {
    "Id": ($customer.id),
    "Name": ($customer.name),
    "Address": $map($customer.addresses, function($address) {
      {
          "Address1": ($address.addressLine1),
          "Address2": ($address.addressLine2)
      }
    })
  }
})
`;

const jsonataExpression = jsonata(expression);

const sampleObject = {
  id: 12345,
  name: "Test Name Here",
  addresses: [
    {
      addressLine1: "1234 Test Road Here",
      addressLine2: "Fake Town, USA",
    },
    {
      addressLine1: "456 Fake Road",
      addressLine2: "Real Town, CA",
    },
  ],
};

const inputSizes = [100, 200, 400, 600, 800, 1000, 2000, 3000, 4000, 5000];

inputSizes.forEach((count) => {
  const sampleInput = [];
  for (var i = 0; i < count; i++) {
    sampleInput.push(sampleObject);
  }

  // Check how long it takes to evaluate the input data:
  const startTime = new Date();
  jsonataExpression.evaluate(sampleInput);
  const endTime = new Date();

  console.log(
    `Input of size ${count} took ${endTime - startTime}ms to process.`
  );
});
