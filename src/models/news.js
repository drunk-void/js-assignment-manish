const mysql = require('../lib/mysql');

// Create News
const createNews = async params => {
    const { title, description, matchId, tourId } = params;

    let finalTourId = tourId;
    let finalSportId = null;
    if (matchId) {
        const [matchRows] = await mysql.query('SELECT tourId FROM matches WHERE id = ?', [matchId]);
        if (matchRows) {
            finalTourId = matchRows.tourId;
            const [tourRows] = await mysql.query('SELECT sportId FROM tours WHERE id = ?', [finalTourId]);
            if (tourRows) {
                finalSportId = tourRows.sportId;
            }
        }
    } else if (tourId) {
        const [tourRows] = await mysql.query('SELECT sportId FROM tours WHERE id = ?', [tourId]);
        if (tourRows) {
            finalSportId = tourRows.sportId;
        }
    }
    const statement = 'INSERT INTO news (title, description, matchId, tourId, sportId) VALUES (?, ?, ?, ?, ?)';
    const parameters = [title, description, matchId, finalTourId, finalSportId]
    return await mysql.query(statement, parameters);
}

// Fetch all news
const getAllNews = async () => {
    const statement = 'select * from news;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

// Fetch News by Match ID
const getNewsByMatchID= async params => {
    const statement = 'SELECT * FROM news WHERE matchId = ?';
    const parameters = [params.matchId];
    return await mysql.query(statement, parameters);
};

// Fetch News by Tour ID
const getNewsByTourID= async params => {
    const statement = 'SELECT * FROM news WHERE tourId = ?';
    const parameters = [params.tourId];
    return await mysql.query(statement, parameters);
};

// Fetch News by Sport ID
const getNewsBySportID= async params => {
    const statement = 'SELECT * FROM news WHERE sportId = ?';
    const parameters = [params.sportId];
    return await mysql.query(statement, parameters);
};


module.exports = {
    createNews: createNews,
    getAllNews: getAllNews,
    getNewsByMatchID: getNewsByMatchID,
    getNewsByTourID: getNewsByTourID,
    getNewsBySportID: getNewsBySportID,
}