## GLOBUS HOSPITAL'S PATIENT RECORD MANAGEMENT SYSTEM BACKEND

#### Technologies used for the project: <em>Node.js, Express.js, MongoDb</em>

## Project Goals:

1. Various Local Hospitals in India still maintain their patient's records physically in seperate files. These records contain documents having important information about the patient's medical history.

2. This project was dedicated to digitalising the patient record management system of a local hospital in Kanpur, India.

## Strategies Used:

1. Sequence is an important aspect associated with these documents and therefore, this project used a ***Linked List based design to model the document storage***.

2. The project models a ***Doubly Linked List*** by creating one to one relationships between the documents of a ***no-sql database, MongoDb*** in this case.

3. The ***documents in a patient's records*** are ***very different from each other***. Therefore, the ***schemaless property*** of ***MongoDb or No-Sql databases*** in general comes in great use.

## Implementations:

1. A Doubly ***Linked List Data Structure was implemented in MongoDb*** with all the associated important functions such as ***add, get, delete, update*** etc.

2. Basic ***CRUD*** operations where implemented to manage ***Schema Based Patient's Personal Information records*** in a ***seperate Patient Collection***. These documents became the ***head nodes of the Linked List***.

## Getting Started

Use the following command to run the server in production mode:

```bash
npm run start
```

Use the following command to run the server in debug mode:

```bash
npm run start:debug
```
