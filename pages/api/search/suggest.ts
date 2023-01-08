import axiosLokLok from 'configs/axiosLokLok';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import catchAsync from 'utils/catchAsyncFromBE';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';

/** Get search suggests by keyword
 * @swagger
 * /search/suggest:
 *  get:
 *    summary: Get search suggests by keyword
 *    tags: [Search]
 *    parameters:
 *      - in: query
 *        name: keyword
 *        required: true
 *        example: batman
 *        schema:
 *          type: string
 *      - in: query
 *        name: size
 *        example: 10
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */

const getSuggestSearchingApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { keyword = '', size = 10 } = query;

  if (method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const data = await axiosLokLok.post(PATH_API.searchSuggest, {
    searchKeyWord: keyword,
    size
  });

  const response = {
    message: 'Get Suggest Searching Successfully !',
    data: {
      results: data.data?.searchResults
    }
  };

  responseSuccess(res, response);
};

export default catchAsync(getSuggestSearchingApi);
