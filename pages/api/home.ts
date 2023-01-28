/* eslint-disable no-useless-escape */
import axiosLokLok from 'configs/axiosLokLok';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IResponseHome } from 'types';
import catchAsync from 'utils/catchAsyncFromBE';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';

/** Get data homepage
 * @swagger
 * /home:
 *  get:
 *    summary: Get data homepage
 *    tags: [Home]
 *    parameters:
 *      - in: query
 *        name: page
 *        example: 0
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */

const getHomeMoviesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { page = 0 } = query;

  if (method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const {
    page: currentPage,
    recommendItems,
    searchKeyWord
  }: IResponseHome = (await axiosLokLok(PATH_API.home, { params: { page } })).data;
  const homeSections = recommendItems?.filter(
    (section) => section.homeSectionType !== 'BLOCK_GROUP' && section.homeSectionName !== ''
  );

  const response = {
    message: 'Get Home Successfully !',
    data: {
      page: currentPage,
      searchKeyWord,
      homeSections: homeSections.map((section) => ({
        ...section,
        homeSectionName: section.homeSectionName.replace('Loklok', 'TCinema')
      }))
    }
  };

  responseSuccess(res, response);
};

export default catchAsync(getHomeMoviesApi);
