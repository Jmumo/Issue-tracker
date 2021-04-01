

const query = ` {
   repository (owner: "", name: "") {
     name
     issues (last: 5, ) {
       totalCount
       edges {cursor}
       nodes {
         number
         title
        closedAt
        createdAt
        id
        state
        
       }
     }
   }
 }`

 module.exports = query