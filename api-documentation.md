
# API Routes

* All routes except the login route receive a token via headers.

## Authentication

POST: /login

```bash
  JSON body

  {
    "email": "string",
    "password": "string"
  }
```

## Dashboard

GET: /v1/dashboard/:days

```bash
  PARAMS

  days: number (filter data by the number of days)
```

## Categories

POST: /v1/categories

```bash
  JSON body
  
  {
    "title": "string"
  }
```

PUT: /v1/categories/:id

```bash
  PARAMS

  id: string (category id)

  JSON body

  {
    "title": "string"
  }
```

GET: /v1/categories

```bash
  Return all categories
```

GET: /v1/categories/:id

```bash
  PARAMS

  id: string (return just one category)
```

DEL: /v1/categories/:id

```bash
  PARAMS

  id: string (delete just one category)
```

## Carriers

POST: /v1/carriers

```bash
  JSON body
  
  {
    "name": "string",
    "region": "string"
  }
```

PUT: /v1/carriers/:id

```bash
  PARAMS

  id: string (carrier id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/carriers/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all carriers or filtered carriers if you pass query params.
```

GET: /v1/carriers/:id

```bash
  PARAMS

  id: string (return just one carrier)
```

DEL: /v1/carriers/:id

```bash
  PARAMS

  id: string (delete just one carrier)
```

## Stores

POST: /v1/stores

```bash
  JSON body
  
  {
    "name": "string",
    "type": "string"
  }
```

PUT: /v1/stores/:id

```bash
  PARAMS

  id: string (store id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/stores/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all stores or filtered stores if you pass query params.
```

GET: /v1/stores/:id

```bash
  PARAMS

  id: string (return just one store)
```

DEL: /v1/stores/:id

```bash
  PARAMS

  id: string (delete just one store)
```

## Providers

POST: /v1/providers

```bash
  JSON body
  
  {
    "name": "string",
    "email": "string",
    "tel": "string"
  }
```

PUT: /v1/providers/:id

```bash
  PARAMS

  id: string (provider id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/providers/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all providers or filtered providers if you pass query params.
```

GET: /v1/providers/:id

```bash
  PARAMS

  id: string (return just one provider)
```

DEL: /v1/providers/:id

```bash
  PARAMS

  id: string (delete just one provider)
```

## Users

POST: /v1/users

```bash
  JSON body
  
  {
    "name": "string",
    "email": "string",
    "unity": "string", (store id)
    "position": "string"
  }
```

PUT: /v1/users/:id

```bash
  PARAMS

  id: string (user id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/users/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all users or filtered users if you pass query params.
```

GET: /v1/users/:id

```bash
  PARAMS

  id: string (return just one user)
```

DEL: /v1/users/:id

```bash
  PARAMS

  id: string (delete just one user)
```

## Products

POST: /v1/products

```bash
  JSON body
  
  {
    "name": "string",
    "description": "string",
    "purchase_price": number,
    "sale_price": number,
    "category": "string", (category id)
    "unity": "string", (store id)
    "provider": "string", (provider id)
    "lot": number,
    "validity": "string", (date on format yyyy-mm-dd)
    "quantity": number
  }
```

PUT: /v1/products/:id

```bash
  PARAMS

  id: string (product id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/products/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all products or filtered products if you pass query params.
```

GET: /v1/products/:id

```bash
  PARAMS

  id: string (return just one product)
```

DEL: /v1/products/:id

```bash
  PARAMS

  id: string (delete just one product)
```

## Sellers

POST: /v1/sellers

```bash
  JSON body
  
  {
    "user": "string", (user id)
    "comission": number
  }
```

PUT: /v1/sellers/:id

```bash
  PARAMS

  id: string (seller id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/sellers/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all sellers or filtered sellers if you pass query params.
```

GET: /v1/sellers/:id

```bash
  PARAMS

  id: string (return just one seller)
```

DEL: /v1/sellers/:id

```bash
  PARAMS

  id: string (delete just one seller)
```

## Clients

POST: /v1/clients

```bash
  JSON body
  
  {
    "name": "string",
    "email": "string",
    "tel": "string",
    "cep": "string",
    "city": "string",
    "state": "string",
    "unity": "string" (store id)
  }
```

PUT: /v1/clients/:id

```bash
  PARAMS

  id: string (client id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/clients/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all clients or filtered clients if you pass query params.
```

GET: /v1/clients/:id

```bash
  PARAMS

  id: string (return just one client)
```

DEL: /v1/clients/:id

```bash
  PARAMS

  id: string (delete just one client)
```

## Tickets

POST: /v1/tickets

```bash
  JSON body
  
  {
    "title": "string",
    "description": "string",
    "unity": "string" (store id)
  }
```

PUT: /v1/tickets/:id

```bash
  PARAMS

  id: string (ticket id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/tickets/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all tickets or filtered tickets if you pass query params.
```

GET: /v1/tickets/:id

```bash
  PARAMS

  id: string (return just one ticket)
```

DEL: /v1/tickets/:id

```bash
  PARAMS

  id: string (delete just one ticket)
```

## Financial

POST: /v1/financial/registers

```bash
  JSON body
  
  {
    "type": number, (0 for output and 1 for input)
    "unity": "string", (store id)
    "value": number
  }
```

PUT: /v1/financial/registers/:id

```bash
  PARAMS

  id: string (register id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/financial/register/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all registers or filtered registers if you pass query params.
```

GET: /v1/financial/registers/:id

```bash
  PARAMS

  id: string (return just one register)
```

DEL: /v1/financial/registers/:id

```bash
  PARAMS

  id: string (delete just one register)
```

## Purchases

POST: /v1/purchases

```bash
  JSON body
  
  {
    "unity": "string", (store id)
    "provider": "string", (provider id)
    "product": "string", (product id)
    "quantity": number,
    "unit_price": number
  }
```

PUT: /v1/purchases/:id

```bash
  PARAMS

  id: string (product id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/purchases/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all purchases or filtered purchases if you pass query params.
```

GET: /v1/purchases/:id

```bash
  PARAMS

  id: string (return just one purchase)
```

DEL: /v1/purchases/:id

```bash
  PARAMS

  id: string (delete just one purchase)
```

## Sales

POST: /v1/sales

```bash
  JSON body
  
  {
    "product": "string", (product id)
    "unity": "string", (store id)
    "client": "string", (client id)
    "seller": "string", (seller id)
    "carrier": "string", (carrier id)
    "quantity": number
  }
```

PUT: /v1/sales/:id

```bash
  PARAMS

  id: string (sale id)

  JSON body

  Same data as POST route, but optional.
```

GET: /v1/sales/?page=&q=

```bash
  Query PARAMS

  page: next page to pagination
  q: text to search

  Return all sales or filtered sales if you pass query params.
```

GET: /v1/sales/:id

```bash
  PARAMS

  id: string (return just one sale)
```

DEL: /v1/sales/:id

```bash
  PARAMS

  id: string (delete just one sale)
```
