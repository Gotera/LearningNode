/* eslint-disable linebreak-style */
import incorrectRequisition from "../errors/incorrectRequisition.js";

async function paginate(req, res, next) {
  try {
    let { limit = 2, pag = 1, ordering = "_id:-1" } = req.query;
    let [orderingField, order] = ordering.split(":");
    const result = req.result;
    if (limit >= 0 && pag >= 0) {
      const paginatedResult = await result
        .find()
        .sort({ [orderingField]: order })
        .skip((pag - 1) * limit)
        .limit(limit)
        .populate("autor")
        .exec();
      res.status(200).json(paginatedResult);
    } else {
      next(new incorrectRequisition());
    }
  } catch (err) {
    next(err);
  }
}

export default paginate;
