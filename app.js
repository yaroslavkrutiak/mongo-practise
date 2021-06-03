'use strict';

const {mapUser, getRandomFirstName} = require('./util');

// db connection and settings
const connection = require('./config/connection');
let userCollection, articlesCollection, studentCollection;
run().catch(e => console.log(`run function error ${e}`));

async function run() {
  await connection.connect().catch(e => console.log(`connect function error ${e}`));
  await connection.get().createCollection('users')
  await connection.get().dropCollection('users');
  userCollection = connection.get().collection('users');

  await example1();
  await example2();
  await example3();
  await example4();

  await connection.get().createCollection('articles')
  await connection.get().dropCollection('articles');
  articlesCollection = connection.get().collection('articles');

  await article1();
  await article2();
  await article3();
  await article4();
  await article5();

  await connection.close();
}

// #### Users

// - Create 2 users per department (a, b, c)
async function example1() {

  try {
    const department = ['a', 'a', 'b', 'b', 'c', 'c'];
    const users = department.map(department => ({department: department})).map(mapUser);
    const {result} = await userCollection.insertMany(users);
    console.log(`Example 1, added: ${result.n} users`);

  } catch (err) {
    console.error(err);
  }
}

// - Delete 1 user from department (a)

async function example2() {
  try {
    const {result} = await userCollection.deleteOne({department: 'a'});
    console.log(`Example 2, deleted ${result.n} user`);
  } catch (err) {
    console.error(err);
  }
}

// - Update firstName for users from department (b)

async function example3() {
  try {
    const {result} = await userCollection.updateMany({department: 'b'}, {$set: {firstName: getRandomFirstName()}});
    console.log(`Example 3, updated ${result.n} users`);
  } catch (err) {
    console.error(err);
  }
}

// - Find all users from department (c)
async function example4() {
  try {
    const result = await userCollection.find({department: 'c'}).toArray();
    const bulkWrite = result.map(user => {
      console.log(user);
    });
  } catch (err) {
    console.error(err);
  }
}


async function article1() {
  try {

    const types = ['a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c'];
    const articles = types.map(type => ({
      name: 'Mongodb - introduction',
      description: 'Mongodb - text',
      type: type,
      tags: []
    }));

    const {result} = await articlesCollection.insertMany(articles);
    console.log(`Article 1, added ${result.n} articles`);
  } catch (err) {
    console.log(err);
  }
}


async function article2() {
  try {

    const TypeA = await articlesCollection.find({type: 'a'}).toArray();
    const bulkWrite = TypeA.map(article => ({
      updateOne: {
        filter: {
          _id: article._id,
          type: 'a'
        },
        update: {$set: {tags: ['tag1-a', 'tag2-a', 'tag3']}}
      }
    }));
    const {result} = await articlesCollection.bulkWrite(bulkWrite);
    console.log(`Article 2, updated ${result.nModified} articles`);
  } catch (err) {
    console.log(err);
  }
}


async function article3() {
  try {
    const NotTypeA = await articlesCollection.find({type: {$nin: ['a']}}).toArray();
    const bulkWrite = NotTypeA.map(article => ({
      updateOne: {
        filter: {_id: article._id},
        update: {$set: {tags: ['tag2', 'tag3', 'super']}}
      }
    }));
    const {result} = await articlesCollection.bulkWrite(bulkWrite);
    console.log(`Article 3, updated ${result.nModified} articles`);

  } catch (err) {
    console.log(err);
  }
}


async function article4() {
  try {
    const strictArticles = await articlesCollection.find({tags: {$in: ['tag2', 'tag1-a']}}).toArray();
    console.log(`Article 4, found ${strictArticles.length} articles`);
  } catch (err) {
    console.log(err);
  }
}


async function article5() {
  try {

    const {result} = await articlesCollection.updateMany(
      {},
      {$pull: {tags: {$in: ['tag2', 'tag1-a']}}},
      {multi: true}
    );
    console.log(`Article 5, found ${result.nModified} articles with tags given`);
  } catch (err) {
    console.log(err);
  }
}