import { Context } from '../models/context';
import { buildErrorResponse } from '../utils/buildErrorResponse';
import { successResponse } from '../utils/successResponse'
import{ HelperUtil } from '../utils/helper'
// const HelperUtil = new HelperUtil();
const Users = require('../models/users');
import jsonData from  '../constants/mock_data.json'


export class UsersController {
  async addUser(inputObject: any, ctx: Context) {
    try {
      const result = await Users.create(inputObject.input);
      return successResponse(result, 'created');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }
  async getUsers(inputObject: any, ctx: Context) {
    try {
      let result = [];
      let totalCount =0
      let limit = 5;  
      let skip = 0;
      let pages = 0
      let page  = inputObject.page;

  
     if (inputObject && inputObject.exactMatch === "Yes"){
       /**
        * this writtten for exact match
        */
      
      const totalRecords = await Users.find({ $text: { $search: `\"${inputObject.search}\"` } })
      totalCount =totalRecords.length
      pages = Math.ceil(totalCount / limit);
      skip = limit * (page - 1);
      result = await Users.find({ $text: { $search: `\"${inputObject.search}\"` } }).skip(skip).limit(limit);
     }else {
      /**
       * full text search
       */
    
      const totalRecords = await Users.find({ $text: { $search: inputObject.search } });
      totalCount =totalRecords.length
      pages = Math.ceil(totalCount / limit);
      skip = limit * (page - 1);

       result = await Users.find({ $text: { $search: inputObject.search } }).skip(skip).limit(limit);
     }
     const response = {
       count:totalCount,
       pages:pages,
       usersData:result
     }
      return successResponse(response, 'fetch');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }
  async updateUser(inputObject: any, ctx: Context) {
    try {
      const result = await Users.findOneAndUpdate({ _id: inputObject.id }, inputObject.input);
      if (result) {
        return successResponse(result, 'updated');
      }
      return successResponse(result, 'notUpdated');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }

  async deleteUser(inputObject: any, ctx: Context) {
    try {
      const result = await Users.findOneAndDelete({ _id: inputObject.id })
      return successResponse(result, 'deleted');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }


  async localSearch(inputObject: any, ctx: Context) {
    try {
      const result = await jsonData;
      /**
       * validation for page
       */
      if(inputObject.page < 1 || !inputObject.search){
        return buildErrorResponse(null);
      }
      /**
       * search query function
       */
      const searchQuery = await HelperUtil.searchInArray(inputObject.search, result,"name", inputObject.exactMatch, inputObject.page);
      const response = {
        count:searchQuery.total,
        pages:searchQuery.total_pages,
        usersData:searchQuery.data
      }
    
      return successResponse(response, 'fetch');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }
}

