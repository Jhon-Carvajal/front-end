/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    url_gateway:"http://127.0.0.1:7777",  //api  
    url_usuarios:"http://127.0.0.1:8080", //seguridad
    url_persona: "http://127.0.0.1:9999", //back
    
  firebaseConfig : {
  apiKey: "AIzaSyD_0EzU-t4zZ1kRPhLOKOlgsURmkwzsUPo",
  authDomain: "proyecto-coffe.firebaseapp.com",
  projectId: "proyecto-coffe",
  storageBucket: "proyecto-coffe.appspot.com",
  messagingSenderId: "1037113996312",
  appId: "1:1037113996312:web:7b313d22cf59a8ec26ff6d"
  }
  };