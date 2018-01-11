
'use strict'

const Hapi = require('hapi');
const Request = require('request');
const Vision = require('vision');
const Handlebars = require('handlebars');
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');
var nodemailer = require('nodemailer');
const server = new Hapi.Server();

server.connection({
   host: '127.0.0.1',
   port: 3000
});


// Register vision for our views
server.register(Vision, (err) => {
   server.views({
       engines: {
           html: Handlebars
       },
       relativeTo: __dirname,
       path: './views',
   });
});

server.start((err) => {
   if (err) {
       throw err;
   }

   console.log(`Server running at: ${server.info.uri}`);
});

// server.js
 
// Show teams standings
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        Request.get('https://api.binance.com/api/v1/ticker/24hr?symbol=BTCUSDT', function (error, response, body) {
            if (error) {
                throw error;
            }
 
            const data = JSON.parse(body);
            console.log(data.priceChangePercent);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'brcryptomoedas@gmail.com',
                  pass: 'Y0Ei7yhgMI'
                }
              });
              
              var mailOptions = {
                from: 'brcryptomoedas@gmail.com',
                to: 'jorgedantas2@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

            reply.view('index', { result: data });
        });
    }
});
 
// A simple helper function that extracts team ID from team URL
//Handlebars.registerHelper('teamID', function (teamUrl) {
    //return teamUrl.symbol(38);
//});
 