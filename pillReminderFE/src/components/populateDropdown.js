import apiData from "../api/api";
import cookie from "../cookies/cookiesOps"

const populateDropdown = {
  setRelations : async function(selfReq){
    const relations = await this.getRelations();
    console.log(relations);
    const dependentRelations = `
    ${selfReq == true ? `<li><a href="#" id = ${cookie.get("userId")} class="foo">self</a></li>` : ''}
      ${
        relations.map(relation =>
          `
          <li><a href="#" id = ${relation[0]} class="foo">${relation[1]}</a></li>
          `
          ).join("")
      }
    `;
    return dependentRelations;
  },
  getRelations : async function(){
    const userId = cookie.get("userId");
    const url = new URL("http://localhost:8081/user/relations");
    const params = {userId:userId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const relations = await apiData.getJson(url);
    // console.log(relations);
    return relations;
  }
  
}

export default populateDropdown;