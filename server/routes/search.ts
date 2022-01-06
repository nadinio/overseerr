import { Router } from 'express';
import TheMovieDb from '../api/themoviedb';
import Media from '../entity/Media';
import logger from '../logger';
import { mapSearchResults } from '../models/Search';

const searchRoutes = Router();

searchRoutes.get('/', async (req, res, next) => {
  const tmdb = new TheMovieDb();

  try {
    const results = await tmdb.searchMulti({
      query: req.query.query as string,
      page: Number(req.query.page),
      language: req.locale ?? (req.query.language as string),
    });

    const media = await Media.getRelatedMedia(
      results.results.map((result) => result.id)
    );

    return res.status(200).json({
      page: results.page,
      totalPages: results.total_pages,
      totalResults: results.total_results,
      results: mapSearchResults(results.results, media),
    });
  } catch (e) {
    logger.debug('Something went wrong retrieving search results', {
      label: 'API',
      errorMessage: e.message,
      query: req.query.query,
    });
    return next({
      status: 500,
      message: 'Unable to retrieve search results.',
    });
  }
});

export default searchRoutes;
