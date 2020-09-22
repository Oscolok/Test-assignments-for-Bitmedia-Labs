const { UserModel } = require("./users.model");

exports.addUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ name: req.body.name });

    if (!user) {
      const users = await UserModel.find();
      const userId = users.length + 1;
      const newUser = await UserModel.create({
        _id: userId,
        ...req.body,
      });
      return res.status(201).send(newUser);
    }

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find().sort({ score: -1 }).limit(8);

    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};
