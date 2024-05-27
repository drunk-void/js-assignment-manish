const NewsModel = require("../models/news");

const getAllNews = async () => {
  return await NewsModel.getAllNews();
};

const createNews = async (params) => {
  const { title, description, matchId, tourId } = params;
  if (!title) {
    throw new Error("Missing required parameter: title");
  }
  if (!description) {
    throw new Error("Missing required parameter: description");
  }
  if (!tourId && !matchId) {
    throw new Error("Missing required parameter: tourId or matchId");
  }
  return await NewsModel.createNews(params);
};

const getNews = async (params) => {
  const {matchId, tourId, sportId} = params;
  if (matchId){
    return await NewsModel.getNewsByMatchID(params);
  } else if (tourId) {
    return await NewsModel.getNewsByTourID(params);
  } else if (sportId) {
    return await NewsModel.getNewsBySportID(params);
  } else {
    throw new Error("Missing required parameter: sportId, tourId or matchId");
  }
}
module.exports = {
  getAllNews: getAllNews,
  createNews: createNews,
  getNews: getNews
};
