import axiosLokLok from 'configs/axiosLokLok';
import { PATH_API } from 'configs/path.api';
import { STATUS } from 'constants/status';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IMovieDetail, ISubtitle } from 'types';
import catchAsync from 'utils/catchAsyncFromBE';
import { ApiError, responseError, responseSuccess } from 'utils/responseFromBE';

/** Get data episode movie
 * @swagger
 * /episode:
 *  get:
 *    summary: Get data episode movie
 *    tags: [Movie]
 *    parameters:
 *      - in: query
 *        name: category
 *        required: true
 *        example: 1
 *        schema:
 *          type: number
 *      - in: query
 *        name: id
 *        required: true
 *        example: 23149
 *        schema:
 *          type: number
 *      - in: query
 *        name: episode
 *        required: true
 *        example: 130680
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */

const deletedUnnecessaryKey = [
  'collect',
  'drameTypeVo',
  'episodeRoomListVo',
  'contentTagResourceList',
  'reserved',
  'showSetName',
  'nameJson',
  'translateType',
  'upInfo',
  'areaNameList',
  'coverHorizontalUrlJson',
  'tagNameList'
];

const getEpisodeMediaApi = async (params: any) => {
  return await axiosLokLok.get(PATH_API.media, { params });
};

const getEpisodeApi = async (req: NextApiRequest, res: NextApiResponse) => {
  let { id, category = 0, episode = 0 } = req.query;
  episode = Number(episode);
  if (req.method !== 'GET') {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    return responseError(error, res);
  }

  const { data } = await axiosLokLok.get(PATH_API.detail, { params: { id, category, episode } });

  const movieDetails: IMovieDetail = data;
  if (!movieDetails) {
    const error = new ApiError(STATUS.NOT_FOUND, 'Not found movie');
    return responseError(error, res);
  }

  const { episodeVo } = movieDetails;
  let currentEpisode = episodeVo.find((el) => el.id === episode);
  if (!currentEpisode) currentEpisode = episodeVo[0];

  const { definitionList, subtitlingList } = currentEpisode;
  let totalDuration = 0;

  const qualities = await Promise.all(
    definitionList.map(async (definition) => {
      const paramsMedia = {
        category,
        contentId: id,
        episodeId: currentEpisode?.id,
        definition: definition.code
      };
      const { data } = await getEpisodeMediaApi(paramsMedia);
      totalDuration = data?.totalDuration;
      return {
        quality: Number(definition.description.replace(/[\p\P]/g, '')),
        url: data.mediaUrl.replace(/^http:\/\//i, 'https://')
      };
    })
  );

  const subTitles = subtitlingList
    .map((sub) => ({
      lang: sub.languageAbbr,
      language: `${sub.language}${sub.translateType ? ' (Auto)' : ''}`
    }))
    .reduce((acc: any, curr) => {
      if (curr.lang === 'en') return [curr, ...acc];
      return [...acc, curr];
    }, [] as ISubtitle[])
    .reduce((acc: any, curr: any) => {
      if (curr.lang === 'vi') return [curr, ...acc];
      return [...acc, curr];
    }, [] as ISubtitle[]);

  const hasNextEpisode = movieDetails.episodeVo.length > 1;

  const responseData: any = {
    ...movieDetails,
    episode: episode || currentEpisode.id,
    episodeVo: movieDetails.episodeVo.map((el) => ({ id: el.id, seriesNo: el.seriesNo })),
    likeList: movieDetails.likeList.map((movie) => ({
      id: movie.id,
      name: movie.name,
      coverVerticalUrl: movie.coverVerticalUrl,
      category: movie.category
    })),
    totalDuration: totalDuration || 0,
    currentEpName: hasNextEpisode ? `Ep ${currentEpisode.seriesNo}` : '',
    qualities,
    subTitles
  };

  deletedUnnecessaryKey.forEach((key) => delete responseData[key]);

  const response = {
    message: `Get info episode ${currentEpisode?.seriesNo} of ${movieDetails.name} successfully!`,
    data: responseData
  };

  responseSuccess(res, { data: response });
};

export default catchAsync(getEpisodeApi);
