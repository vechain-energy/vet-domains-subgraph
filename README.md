# vet.domains Subgraph

This Subgraph sources events from the vet.domains contracts. This includes the registry and any resolvers that are created and linked to domains. The resolvers are added through dynamic data sources. More information on all of this can be found at [The Graph Documentation](https://thegraph.com/docs/developer/quick-start/).

The original repository has been forked from: https://github.com/ensdomains/ens-subgraph

A deployment is available on: https://graph.vet/subgraphs/name/vns

# Example Queries

Here we have example queries, so that you don't have to type them in yourself eachtime in the graphiql playground:

```graphql
query Examples {
  domains(orderBy: createdAt, orderDirection: desc, first: 5, skip: 0) {
    name
    subdomainCount
    owner {
      id
    }
  }

  accounts {
    id
    domains(orderBy: createdAt, orderDirection: asc) {
      name
    }
  }

  textChangeds(orderBy: blockNumber, orderDirection: desc) {
    id
    key
    blockNumber
    value
    resolver {
      domain {
        name
      }
      addr {
        id
      }
    }
  }

  registrations(orderDirection: desc, orderBy: registrationDate, first: 5) {
    cost
    domain {
      name
    }
    registrant {
      id
    }
  }

  nameReneweds(first: 5, orderBy: blockNumber, orderDirection: desc) {
    id
    registration {
      domain {
        name
      }
      cost
    }
  }
}
```
