import Content from '../../models/content';
import moment from 'moment';

/*
  POST /api/statistics/totalUserCount
  {
    "dateGte" : "2022-08-11",
    "dateLt" : "2022-08-14",
  }
*/
export const totalUserCount = async (ctx) => {
  const body = ctx.request.body || {};

  try {
    const aggregate = await Content.aggregate([
      {
        $match: {
          publishedDate: {
            $gte: new Date(moment(body.dateGte).startOf('day').format()),
            $lt: new Date(moment(body.dateLt).endOf('day').format()),
          },
        },
      },
      {
        $group: {
          _id: '$userId',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $count: 'totalCount',
      },
    ]);
    ctx.body = aggregate;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  POST /api/statistics/env
  {
    "dateGte" : "2022-08-11",
    "dateLt" : "2022-08-14",
    "filter" : {
      "contentId" : "MER_01_01",
    },
  }
*/
export const env = async (ctx) => {
  const body = ctx.request.body || {};

  try {
    const aggregate = await Content.aggregate([
      {
        $match: {
          contentId: body.contentId,
          publishedDate: {
            $gte: new Date(moment(body.dateGte).startOf('day').format()),
            $lt: new Date(moment(body.dateLt).endOf('day').format()),
          },
        },
      },
      {
        $project: {
          arrayofkeyvalue: {
            $objectToArray: '$$ROOT.data',
          },
        },
      },
      {
        $project: {
          dataValues: '$arrayofkeyvalue.v',
        },
      },
      {
        $group: {
          _id: 1,
          datas: {
            $push: '$dataValues',
          },
        },
      },
      {
        $unwind: '$datas',
      },
      {
        $unwind: '$datas',
      },
    ]);
    ctx.body = aggregate;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  POST /api/statistics/char
  {
    "dateGte" : "2022-08-11",
    "dateLt" : "2022-08-14",
    "dataKey" : "C5"    
  }
*/
export const char = async (ctx) => {
  const body = ctx.request.body || {};

  try {
    const aggregate = await Content.aggregate([
      {
        $match: {
          publishedDate: {
            $gte: new Date(moment(body.dateGte).startOf('day').format()),
            $lt: new Date(moment(body.dateLt).endOf('day').format()),
          },
        },
      },
      {
        $addFields: {
          data_key_value_list: {
            $objectToArray: '$$ROOT.data',
          },
        },
      },
      {
        $unwind: '$data_key_value_list',
      },
      {
        $match: {
          'data_key_value_list.k': {
            $eq: body.dataKey,
          },
        },
      },
      {
        $group: {
          _id: '$contentId',
          data_key_value_list: {
            $push: '$data_key_value_list',
          },
        },
      },
    ]);
    ctx.body = aggregate;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  POST /api/statistics/sex
  {
    "dateGte" : "2022-08-11",
    "dateLt" : "2022-08-14",
    "dataKey" : "C5",
    "sex" : "남"
  }
*/
export const sex = async (ctx) => {
  const body = ctx.request.body || {};

  try {
    const aggregate = await Content.aggregate([
      {
        $match: {
          publishedDate: {
            $gte: new Date(moment(body.dateGte).startOf('day').format()),
            $lt: new Date(moment(body.dateLt).endOf('day').format()),
          },
          sex: body.sex,
        },
      },
      {
        $addFields: {
          data_key_value_list: {
            $objectToArray: '$$ROOT.data',
          },
        },
      },
      {
        $unwind: '$data_key_value_list',
      },
      {
        $match: {
          'data_key_value_list.k': {
            $eq: body.dataKey,
          },
        },
      },
      {
        $group: {
          _id: '$contentId',
          data_key_value_list: {
            $push: '$data_key_value_list',
          },
        },
      },
    ]);
    ctx.body = aggregate;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  POST /api/statistics/age
  {
    "dateGte" : "2022-08-11",
    "dateLt" : "2022-08-14",
    "dataKey" : "C5",
    "ageGte" : 7,
    "ageLte" : 9
  }
*/
export const age = async (ctx) => {
  const body = ctx.request.body || {};

  try {
    const aggregate = await Content.aggregate([
      {
        $match: {
          publishedDate: {
            $gte: new Date(moment(body.dateGte).startOf('day').format()),
            $lt: new Date(moment(body.dateLt).endOf('day').format()),
          },
          age: {
            $gte: body.ageGte,
            $lte: body.ageLte,
          },
        },
      },
      {
        $addFields: {
          data_key_value_list: {
            $objectToArray: '$$ROOT.data',
          },
        },
      },
      {
        $unwind: '$data_key_value_list',
      },
      {
        $match: {
          'data_key_value_list.k': {
            $eq: body.dataKey,
          },
        },
      },
      {
        $group: {
          _id: '$contentId',
          data_key_value_list: {
            $push: '$data_key_value_list',
          },
        },
      },
    ]);
    ctx.body = aggregate;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  POST /api/statistics/address
  {
    "dateGte" : "2022-08-11",
    "dateLt" : "2022-08-14",
    "dataKey" : "C5",
    "address" : "서울 강남구"
  }
*/
export const address = async (ctx) => {
  const body = ctx.request.body || {};

  try {
    const aggregate = await Content.aggregate([
      {
        $match: {
          publishedDate: {
            $gte: new Date(moment(body.dateGte).startOf('day').format()),
            $lt: new Date(moment(body.dateLt).endOf('day').format()),
          },
          address: body.address,
        },
      },
      {
        $addFields: {
          data_key_value_list: {
            $objectToArray: '$$ROOT.data',
          },
        },
      },
      {
        $unwind: '$data_key_value_list',
      },
      {
        $match: {
          'data_key_value_list.k': {
            $eq: body.dataKey,
          },
        },
      },
      {
        $group: {
          _id: '$contentId',
          data_key_value_list: {
            $push: '$data_key_value_list',
          },
        },
      },
    ]);
    ctx.body = aggregate;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  POST /api/statistics/type
  {
    "dateGte" : "2022-08-11",
    "dateLt" : "2022-08-14",
    "dataKey" : "C5",
    "type" : "고등학교"
  }
*/
export const type = async (ctx) => {
  const body = ctx.request.body || {};

  try {
    const aggregate = await Content.aggregate([
      {
        $match: {
          publishedDate: {
            $gte: new Date(moment(body.dateGte).startOf('day').format()),
            $lt: new Date(moment(body.dateLt).endOf('day').format()),
          },
          type: body.type,
        },
      },
      {
        $addFields: {
          data_key_value_list: {
            $objectToArray: '$$ROOT.data',
          },
        },
      },
      {
        $unwind: '$data_key_value_list',
      },
      {
        $match: {
          'data_key_value_list.k': {
            $eq: body.dataKey,
          },
        },
      },
      {
        $group: {
          _id: '$contentId',
          data_key_value_list: {
            $push: '$data_key_value_list',
          },
        },
      },
    ]);
    ctx.body = aggregate;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  POST /api/statistics/addressAll
  {
    "dateGte" : "2022-08-11",
    "dateLt" : "2022-08-14",   
  }
*/
export const addressAll = async (ctx) => {
  const body = ctx.request.body || {};

  try {
    const aggregate = await Content.aggregate([
      {
        $match: {
          publishedDate: {
            $gte: new Date(moment(body.dateGte).startOf('day').format()),
            $lt: new Date(moment(body.dateLt).endOf('day').format()),
          }
        },
      },
      {
        $addFields: {
          data_key_value_list: {
            $objectToArray: '$$ROOT.data',
          },
        },
      },
      {
        $unwind: '$data_key_value_list',
      },
      {
        $group: {
          _id: '$address',
          data_key_value_list: {
            $push: '$data_key_value_list',
          },
        },
      },
    ]);
    ctx.body = aggregate;
  } catch (error) {
    ctx.throw(500, error);
  }
};

