import axios from 'axios';
import github_data from '../constants/const.js';


export function fetchrepos(username,key){
 return function (dispatch) {
   const query = `query { 
      user(login:"${username}"){
      repositories(last:10,affiliations: [OWNER] orderBy: {field:CREATED_AT,direction:DESC}){
      nodes {
      createdAt
      pushedAt
      name
    }
  }
}
}`;
console.log(query)
  axios
     .post(
       github_data.baseurl,
       { query: query },
       {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${key}`,
         },
       }
     )
     .then((res) => {
       dispatch({
         type: "FETCH_REPOS",
         payload: res.data.data.user.repositories.nodes,
       });
     })
     .catch((err) => {
       console.error(err);
     });
 };





//     return function (dispatch) {
//         const query = `query { 
//       user(login:"${github_data.username}"){
//       repositories(last:10,orderBy: {field:CREATED_AT,direction:DESC}){
//       nodes {
//       createdAt
//       pushedAt
//       name
//     }
//   }
// }
// }`;
//         axios.post(github_data.baseurl, {query: query}, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${github_data.key}`,
//                 }
//             }
//         ).then(res => {
//             dispatch({type: "FETCH_REPOS", payload: res.data.data.user.repositories.nodes});
//         }).catch(err => {
//             console.error(err);
//         });
//     }
}