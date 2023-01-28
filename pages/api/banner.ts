/* eslint-disable no-useless-escape */
import { IBanner } from 'types';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';
import catchAsync from 'utils/catchAsyncFromBE';

/** Get data banners
 * @swagger
 * /banner:
 *  get:
 *    summary: Get data banners
 *    tags: [Banner]
 *    responses:
 *      200:
 *        description: Success
 */

function getPosition(string: string, subString: string, index: number) {
  return string.split(subString, index).join(subString).length;
}

const getBannersApi = async () => {
  try {
    const response = await axios.get(PATH_API.loklok);
    const html = response.data;
    const $ = cheerio.load(html);
    let banners: IBanner[] = [];
    let scriptStr = $('#__nuxt + script').text();
    scriptStr = scriptStr.slice(
      scriptStr.indexOf('banners:[') + 8,
      scriptStr.indexOf(',indexData:')
    );
    scriptStr = scriptStr.replace(/[\[\]]/g, '');
    scriptStr = scriptStr.replace(/\\u002F/g, '\u002F');
    const arrayData = scriptStr.split('},');
    $('.swiper-wrap .swiper-slide', html).each(function (index, element) {
      const item = arrayData[index];
      const id = item.slice(item.indexOf('jumpParam:"') + 11, getPosition(item, ',', 4) - 1);
      const imageUrl = item.slice(item.indexOf('imgUrl:') + 8, item.indexOf('",'));
      const title = $(element).find('.footer-shadow').text();
      const jumpType = item.slice(item.indexOf('jumpType:') + 9, item.indexOf('jumpType:') + 10);
      banners.push({ id: Number(id), imageUrl, title, jumpType: jumpType === 'd' ? 1 : 0 });
    });
    return banners;
  } catch (error) {
    return error;
  }
};

const BannerApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const banners = await getBannersApi();
  const response = {
    message: 'Get Banners Successfully!',
    data: banners
  };
  responseSuccess(res, response);
};

export default catchAsync(BannerApi);
