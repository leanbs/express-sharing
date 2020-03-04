import { Router } from "express";

const router = Router();

// get all data
router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();

  return res.send(users);
});

// create data
router.post("/", async (req, res) => {
  const { username } = req.body;

  const user = await req.context.models.User.create({
    username
  });

  return res.send(user);
});

// get single data
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await req.context.models.User.findByPk(id);

  return res.send(user);
});

// delete single data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await req.context.models.User.destroy({
    where: { id }
  });

  return res.send(user);
});

// update single data
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await req.context.models.User.update(req.body, {
      where: { id }
    });

    if (user[0] === 1) {
      return res.send({
        ok: true,
        message: `user ${id} has successfully updated`
      });
    } else {
      return res.send({ ok: false, message: `update failed` });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
