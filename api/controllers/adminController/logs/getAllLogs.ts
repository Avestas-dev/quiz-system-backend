import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetAllLogsRequestModel,
  GetAllLogsResponseModel,
} from "../../../models/logs/getAllLogsModel";
import {} from "../../../models/user/blockUserModel";

export const getAllLogs = async (
  req: GetAllLogsRequestModel,
  res: GetAllLogsResponseModel
) => {
  /* 	#swagger.tags = ['Admin-Logs']
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.description = 'Get All Logs.'
      #swagger.parameters['pageNumber'] = {
        in: 'query',
        description: 'Actual page number.',
      }
      #swagger.parameters['pageSize'] = {
        in: 'query',
        description: 'Actual page size.',
      }
      #swagger.responses[200] = {
        description: 'Logs successfully downloaded.',
        schema: { $ref: "#/definitions/GetAllLogsResponse" }
      }  
  */
  const { pageNumber: pageNumberString, pageSize: pageSizeString } = req.query;

  const pageNumber = Number(pageNumberString) || 1,
    pageSize = Number(pageSizeString) || 10;

  try {
    // Total pages calculation
    const { _count } = await prisma.logs.aggregate({
      _count: true,
    });
    const totalPages = Math.ceil(_count / pageSize);

    const logs = await prisma.logs.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    return res.json({
      items: logs,
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalPages: totalPages === 0 ? 1 : totalPages,
    });
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
