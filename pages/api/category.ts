import axiosLokLok from 'configs/axiosLokLok';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import catchAsync from 'utils/catchAsyncFromBE';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';

/** Search movie by category
 * @swagger
 * /category:
 *  get:
 *    summary: Search movie by category
 *    tags: [Search]
 *    parameters:
 *      - in: query
 *        name: area
 *        example: 44
 *        schema:
 *          type: number
 *      - in: query
 *        name: category
 *        example: 1
 *        schema:
 *          type: number
 *      - in: query
 *        name: order
 *        example: "up"
 *        schema:
 *          type: string
 *      - in: query
 *        name: params
 *        example: "TV,SETI,MINISERIES,VARIETY,TALK,COMIC,DOCUMENTARY"
 *        schema:
 *          type: string
 *      - in: query
 *        name: sort
 *        example: "1668495183036,27805"
 *        schema:
 *          type: string
 *      - in: query
 *        name: subtitles
 *        example: ""
 *        schema:
 *          type: string
 *      - in: query
 *        name: year
 *        example: "2019,2019"
 *        schema:
 *          type: string
 *    responses:
 *        200:
 *            description: Success
 */

const getCategoryApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const {
    size = 12,
    params = '',
    area = '',
    category = 1,
    year = '',
    subtitles = '',
    sort = '',
    order = 'up'
  } = query;

  if (method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const requestBody = {
    size,
    params,
    area,
    category,
    year,
    subtitles,
    sort,
    order
  };

  const searchWithCategory = axiosLokLok.post(PATH_API.searchWithCategory, requestBody);
  const searchGenres = axiosLokLok.get(PATH_API.genres);
  const results = await Promise.all([searchWithCategory, searchGenres]);

  const response = {
    message: 'Get Category Successfully !',
    data: { filters: results[1]?.data, results: results[0]?.data?.searchResults }
  };

  responseSuccess(res, response);
};

export default catchAsync(getCategoryApi);
