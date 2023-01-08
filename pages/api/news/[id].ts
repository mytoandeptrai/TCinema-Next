import axiosLokLokSub from 'configs/axiosLokLokSub';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import { INewDetails } from 'types';
import catchAsync from 'utils/catchAsyncFromBE';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';

/** Get details news
 * @swagger
 * /news/{id}:
 *  get:
 *    summary: Get details news
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        example: 648
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */

const getNewsDetailApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id = 0 } = query;

  if (method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const { data }: INewDetails = await axiosLokLokSub.get(PATH_API.newsDetail, { params: { id } });
  const content = data.content.replace(/LOKLOK/g, 'TCinema');
  const response = {
    message: 'Get News Details Successfully!',
    data: { ...data, content }
  };

  responseSuccess(res, response);
};

export default catchAsync(getNewsDetailApi);
