const dotenv = require('dotenv');
dotenv.config();

import express from 'express';
const chai = require('chai')
const { expect } = chai;
import 'graphql-import-node';
import testServer from './server'

it('Should get all users', async () => {
  const result = await testServer.executeOperation({
    query: `query{
      getUsers(search:"the king"
      exactMatch:"Yes"){
        status{
          code
          header
          description
        }
        data{
        pages
          count
          usersData{
            name
            description
          }
        }
      }
    }`
  });
  expect(result.data.getUsers.status.code).equal(1000);
});

it('Should get token by email', async () => {
  const result = await testServer.executeOperation({
    query: `query {
      token(email: "vinod@test.com")
    }`
  });
  expect(result.data);
});

it('Should create new record', async () => {
  const result = await testServer.executeOperation({
    query: `mutation {
      addUser(
        input: {
          email: "vinodd${Math.random()}@test.com"
          name: "vinod"
          provider: "self"
          contactType:"personal"
         phone :"999999999"
        }
      ) {
        status {
          code
          header
          description
          moreInfo
        }
        data {
          provider
        }
      }
    }`
  });
  expect(result.data.addUser.status.code)
});

it('Should get match', async () => {
  const result = await testServer.executeOperation({
    query: `query{
      localSearch(search:"the king"
      exactMatch:"no",page:1){
        status{
          code
          header
          description
        }
        data{
        pages
          count
          usersData{
            name
            description
          }
        }
      }
    }`
  });
  expect(result.data.localSearch.status.code).equal(1000);
});
