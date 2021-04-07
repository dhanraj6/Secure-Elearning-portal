const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "m92fd3pfzj2prvm4",
  publicKey: "9mynjg22b66342dy",
  privateKey: "616501f9ca95c25a2719ff8f70cb6647"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.send(response)
        }
  });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.send(result)
        }
      });
}