import axiosLokLokSub from 'configs/axiosLokLokSub';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import catchAsync from 'utils/catchAsyncFromBE';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';

/** Get news list
 * @swagger
 * /news:
 *  get:
 *    summary: Get news list
 *    tags: [News]
 *    parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        example: 0
 *        schema:
 *          type: number
 *      - in: query
 *        name: size
 *        required: true
 *        example: 10
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */

const getNewsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { page = 0, size = 12 } = query;

  if (method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const data = await axiosLokLokSub.get(PATH_API.news, { params: { page, size } });
  const response = {
    message: 'Get News Successfully !',
    data
  };

  responseSuccess(res, response);
};

export default catchAsync(getNewsApi);
