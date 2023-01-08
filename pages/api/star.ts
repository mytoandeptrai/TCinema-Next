import axiosLokLok from 'configs/axiosLokLok';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import catchAsync from 'utils/catchAsyncFromBE';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';

/** Get info star
 * @swagger
 * @path /star:
 *  get:
 *    summary: Get info star
 *    tags: [Star]
 *    parameters:
 *      - in: query
 *        name: starId
 *        required: true
 *        example: 18
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */

const getStarInfoApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { starId = 18 } = query;

  if (method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const data = await axiosLokLok.get(PATH_API.star, { params: { starId } });
  const response = {
    message: 'Get Star Info Successfully !',
    data
  };

  responseSuccess(res, response);
};

export default catchAsync(getStarInfoApi);
