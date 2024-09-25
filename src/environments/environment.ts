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
    url_usuarios:"http://62.72.7.11:8081", //seguridad
    url_persona: "http://127.0.0.1:9999", //back
};
  
/*export const environment = {
    production: true,
    url_gateway:"http://62.72.7.11:7777",  //api  
    url_usuarios:"http://62.72.7.11:8081", //seguridad
    url_persona: "http://62.72.7.11:9999", //back
  };
*/