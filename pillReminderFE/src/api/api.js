 const apiData = {
   postJson : async function(url, data){
    console.log(url);
    return await fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      // .then(response => response.text())
      // .then(data => {
      //   return data;
      // })
      // console.log(response.json());
      // return JSON.stringify(response);
   }
 }
 
 
export default apiData;