"use strict";
 Object.defineProperty(exports, "__esModule", { value: true });
//this is credential file
var config = {
   AWS_ACCESS_KEY_ID: '',
   AWS_SECRET_ACCESS_KEY: '',
   HOST: '',
   REGION: 'ap-south-1',
   PATH: '/graphql',
   ENDPOINT: '',
    
};
config.ENDPOINT = config.HOST;
//exporting to amazon .js 
exports.default = config;
