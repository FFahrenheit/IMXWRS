const url = window.location.origin.includes('localhost')? 
'http://localhost:33001' : 
'http://10.52.2.34:33001' ;

console.log('Current Backend Server : ' + url);

export const environment = {
  production: true,
  base_url: url
};
