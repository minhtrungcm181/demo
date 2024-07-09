import { responseSend } from "../config/config.js";
import { logger } from "../logger.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/db_connector.js/index.js";

let models = initModels(sequelize);
export const getAllRestaurant = async (req, res) => {
  let data = await models.restaurant.findAll();
  responseSend(res, data, "Thành công !", 200);
};
export const likeRestaurant = async (req, res) => {
  let { user_id, res_id } = req.body;
  logger.info("(Create Like) API");
  let newResLike = {
    user_id,
    res_id,
    date_like: new Date(),
  };
  let checkLikedByUser = await models.like_res.findOne({
    where: {
      user_id,
      res_id,
    },
  });

  if (!checkLikedByUser) {
    await models.like_res.create(newResLike);
    responseSend(res, "", "Thành công !", 200);
  } else responseSend(res, "User Already Liked !", "Failed !", 400);
};
export const unlikeByUser = async (req, res) => {
  let { user_id, res_id } = req.body;
  logger.info("(Unlike) API");
  let checkLikedByUser = await models.like_res.findOne({
    where: {
      user_id,
      res_id,
    },
  });
  if (!checkLikedByUser) {
    responseSend(res, "", "Failed !", 400);
  } else {
    await models.like_res.destroy({
      where: {
        user_id,
        res_id,
      },
    });
    responseSend(res, "", "Thành công !", 200);
  }
};
export const getLikeByUser = async (req, res) => {
  const { user_id } = req.params;
  logger.info("(Get Like by User) API");
  let likedByUser = await models.like_res.findAll({
    where: {
      user_id,
    },
  });
  if (likedByUser.length === 0) {
    responseSend(res, "No liked found !", "", 200);
  } else {
    responseSend(res, likedByUser, "Success !", 200);
  }
};
export const getResLikeByUser = async (req, res) => {
  const { user_id } = req.params;
  logger.info("(Get Liked Restaurant by User) API");
  let reslikedByUser = await models.like_res.findAll({
    where: {
      user_id,
    },
    include: [
      {
        model: models.restaurant,
        as: "re", // Alias defined in the association
        attributes: ["res_name"], // Only fetch the restaurant name
      },
    ],
  });
  if (reslikedByUser.length === 0) {
    responseSend(res, "No liked found !", "", 200);
  } else {
    responseSend(res, reslikedByUser, "Success !", 200);
  }
};
export const getLikeByRestaurant = async (req, res) => {
  const { res_id } = req.params;
  logger.info("(Get Like by restaurant id) API");
  let likeOfRestaurant = await models.like_res.findAll({
    where: {
      res_id,
    },
  });
  if (likeOfRestaurant.length === 0) {
    responseSend(res, "No one like your restaurant !", "", 200);
  } else responseSend(res, likeOfRestaurant, "", 200);
};
