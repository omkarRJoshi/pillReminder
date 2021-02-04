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
   },

   getJson : async function(url) {
    try{
      const response = await fetch(url);
      const mideicalHistory = response.json();
      return mideicalHistory;
    }
    catch(e){
      console.log("Error while fetching api : ", e);
    }
   },

   delete : async function(url){
    return await fetch(url, {
      method: 'Delete', // or 'PUT'
      headers: {
      'Content-Type': 'application/json',
      },
      })
   }
 }
 
 
export default apiData;