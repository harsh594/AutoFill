const fs = require('fs');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const aws_exports = require('./aws-exports').default;

awsConnection("Hello");

function awsConnection(data, callback){
  console.log("Hello Bello Banana" );
  global.WebSocket = require('ws');

  global.window = global.window || {
     setTimeout: setTimeout,
     clearTimeout: clearTimeout,
     WebSocket: global.WebSocket,
     ArrayBuffer: global.ArrayBuffer,
     addEventListener: function () { },
     navigator: { onLine: true }
  };

  global.localStorage = {
    store: {},getItem: function (key) {
      return this.store[key]
    },setItem: function (key, value) {
      this.store[key] = value
    },
    removeItem: function (key) {
      delete this.store[key]
    }
  };

  const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
  const AWSAppSyncClient = require('aws-appsync').default;
  const url = aws_exports.ENDPOINT;
  const region = aws_exports.REGION;
  const type = AUTH_TYPE.API_KEY;

  const apiKey = '';
  const gql = require('graphql-tag');
  const query = gql(`
    query darpan{

  	getPost{
      category
    }
  }
    `);
  console.log(query);
  const client = new AWSAppSyncClient({
    url: url,
    region: region,
    auth: {
      type: type,
      apiKey:apiKey,
    }
  });


client.hydrated().then(function (client) {
    return client.query({query: query})
  }).then(function logData(data) {
    // fs.writeFileSync('notesdata.json', JSON.stringify(data))
    // var xxx=fs.readFileSync('notesdata.json');
    // var y=JSON.parse(xxx);
    // var z=y.data.getPost.name;
    // var res=z.substring(6);
    // var ne=res.substring(0,res.length-2);
    // var final=ne.split(",");
    var final = JSON.stringify(data);
    // fs.writeFileSync('notesdata.json', final);
    // console.log("Before final");
    // console.log(data.toString);
    console.log(final);
	callback(final);
  }).catch(console.error);


}

exports.awsConnection = awsConnection;
