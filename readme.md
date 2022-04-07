# Xarerp - API

System to manage sales, inventory, employees, stores and more.

## Developed with

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Prisma](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)

This is just the back-end of the application, to have visual references and also get the front-end (created in React), go to: [Xarerp - Client](https://github.com/DanielMafra/xarerp-client)

## Running the API

After having cloned the repository and accessed its folder through the terminal, run the command below (remember to have installed Node + NPM and PostgreSQL)

```bash
  npm install
```

* Rename the .env.example file to just .env and replace the information value with your development environment.

* Make sure you activate your PostgreSQL and run the command below to create the tables

```bash
  npx prisma migrate dev
```

* After creating the tables in the database, run the command below to populate the tables with some initial data (don't skip this step)

```bash
  npx prisma db seed
```

The previous command has populated some data in the database, and by default you can use the following access credentials to login:

```bash
  e-mail: user@mail.com
  password: 1234
```

If all went well so far, the API will be ready to run.

* Run the command below to activate the API and test it on Insomnia, Postman or your favorite software.

```bash
  npm start
```

API routes are documented in the [api-documentation](https://github.com/DanielMafra/xarerp-api/blob/main/api-documentation.md) file, use it as a guide.

## Author

- Website - [Daniel Mafra](https://danielmafra.github.io)
- LinkedIn - [@danielmafradev](https://linkedin.com/in/danielmafradev)
- Instagram - [@danielmafradev](https://instagram.com/danielmafradev)
