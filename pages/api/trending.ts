import axiosLokLok from 'configs/axiosLokLok';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import catchAsync from 'utils/catchAsyncFromBE';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';

/** Get trending movie
 * @swagger
 * @path /trending:
 *  get:
 *    summary: Get trending movie
 *    tags: [Movie]
 *    responses:
 *      200:
 *        description: Success
 */

const getTopSearchesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const data = await axiosLokLok.get(PATH_API.trending);
  const response = {
    message: 'Get Top Searches Successfully !',
    data: data.data?.list
  };

  responseSuccess(res, response);
};

export default catchAsync(getTopSearchesApi);
