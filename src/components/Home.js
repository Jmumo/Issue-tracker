import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchrepos } from "../actions/fetchRepos";
import github_data from "../constants/const.js";

export default function Home() {
  const repositories = useSelector((state) => state.repositories).repositories;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [key, setKey] = useState("");

  const dispatch = useDispatch();

  const getRepoAction = (username,key) => dispatch(fetchrepos(username,key));



  const getrepos = (e) => {
    e.preventDefault();
     getRepoAction(username, key);
    
  };

  const handleClick = (e) => {
    e.preventDefault();
    let repo = e.target.textContent;
    const query = `{
      repository (owner:"${username}",name: "${repo}"){
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
}`;
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
      .then((res) => setData(res.data.data.repository.issues.nodes));
  };

  return (
    <div className="row">
      <div className="col-md-4 d-flex flex-grow-column">
        <div className="card col-md-8 mt-3 ">
          <p className="lead text-capitalize">repositories</p>
          <span className="small text-info"> select a repository</span>
          <hr></hr>
          <form onSubmit={getrepos}>
            <input
              type="text"
              id="myInput"
              className="mt-2 mb-2 mx-auto form-control"
              placeholder="Github Username"
              onChange={(event) => setUsername(event.target.value)}
            ></input>
            <input
              type="text"
              id="myInput"
              className="mt-2 mb-2 mx-auto form-control"
              placeholder="Github Key"
              onChange={(event) => setKey(event.target.value)}
            ></input>
            <button type="submit" className="btn btn-info btn-sm">
              Fetch
            </button>
          </form>
          <hr></hr>
          <div>
            {repositories.map((repo) => (
              <p>
                <button
                  onClick={(e) => handleClick(e)}
                  className="btn btn-sm text-success"
                >
                  {repo.name}
                </button>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="card col-md-8">
        <div className="card-body mt-3">
          <hr></hr>
          <input
            type="text"
            id="myInput"
            className="mt-2 mb-2 mx-auto form-control"
            placeholder="Search for issues"
            onChange={(event) => setSearch(event.target.value)}
          ></input>

          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">createdAt</th>
                <th scope="col">closedAt</th>
                <th scope="col">State</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((issues) => {
                  if (search === "") {
                    return issues;
                  } else if (
                    issues.title.toLowerCase().includes(search.toLowerCase())
                  ){
                    return issues;
                  }else{
                    return issues
                  }
                })
                .map((issues) => (
                  <tr>
                    <td>{issues.number}</td>
                    <td className="">{issues.title}</td>
                    <td>{issues.createdAt}</td>
                    <td>{issues.closedAt}</td>
                    <td>{issues.state}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
