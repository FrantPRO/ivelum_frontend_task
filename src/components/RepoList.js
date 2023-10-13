import React, {useState, useEffect} from 'react';
import Divider from '@mui/material/Divider';
import axios from 'axios';

function RepoList() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios({
                url: 'https://api.github.com/graphql',
                method: 'post',
                headers: {
                    'Authorization': `bearer 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`
                },
                data: {
                    query: `
                    {
                      search(query: "is:public", type: REPOSITORY, first: 10) {
                        edges {
                          node {
                            ... on Repository {
                              name
                              nameWithOwner
                              description
                              url
                              updatedAt
                              primaryLanguage {
                                name
                              }
                              mainBranch: object(expression: "main:") {
                                ... on Tree {
                                  entries {
                                    name
                                    size
                                  }
                                }
                              }
                              masterBranch: object(expression: "master:") {
                                ... on Tree {
                                  entries {
                                    name
                                    size
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
        `
                }
            });

            setRepos(response.data.data.search.edges);
            console.log(response.data.data.search.edges);
        };

        fetchData();
    }, []);

    return (
        <div>
            {repos.map(repo => (
                <div key={repo.node.url}>
                    <h2>{repo.node.name}</h2>
                    <p><strong>{repo.node.primaryLanguage?.name} </strong>
                        Updated on: {new Date(repo.node.updatedAt).toLocaleString("en-US",
                            {month: 'short', day: 'numeric', year: 'numeric'})}</p>
                    <strong>{repo.node.nameWithOwner}</strong><br/>
                    <a href={repo.node.url}>link</a>
                    <Divider />
                </div>
            ))}
        </div>
    );
}

export default RepoList;
