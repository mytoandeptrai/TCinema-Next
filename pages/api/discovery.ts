import { IMediaPreview } from 'types/video.type';
import axiosLokLok from 'configs/axiosLokLok';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import catchAsync from 'utils/catchAsyncFromBE';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';

/** Get videos discovery
 * @swagger
 * /discovery:
 *  get:
 *    summary: Get videos discovery same other social media video ( tik tok or ...)
 *    tags: [Discovery]
 *    parameters:
 *      - in: query
 *        name: page
 *        example: 0
 *        schema:
 *          type: number
 *    responses:
 *        200:
 *          description: Success
 */

const getDiscoverApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { page = 0 } = query;

  if (method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const { data } = await axiosLokLok.get(PATH_API.discovery, { params: { page } });

  const payloadGetMedia = data.map((item: IMediaPreview) => {
    const { definitionList } = item.mediaInfo;

    return {
      contentId: item.id,
      episodeId: item.mediaInfo.id,
      category: item.category,
      definition: definitionList[definitionList.length - 1]?.code
    };
  });

  const request = await axiosLokLok.post(PATH_API.getPlayBathInfo, payloadGetMedia);

  const videoData = data.map((item: IMediaPreview, index: number) => ({
    ...item,
    mediaInfoUrl: request.data[index]
  }));

  const response = {
    message: 'Get Discovery Video Successfully !',
    data: videoData
  };

  responseSuccess(res, response);
};

export default catchAsync(getDiscoverApi);
