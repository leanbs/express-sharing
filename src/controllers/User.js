import { Router } from "express";
import { hash, verify } from 'argon2';
import { authCheck } from '../middleware/isAuth';

const router = Router();

// register
router.post("/register", async (req, res) => {
  const { username, password } = req.body

  const hashedPassword = await hash(password)

  try {
    await req.context.models.User.create({
      username,
      password: hashedPassword
    });

    res.send({ ok: true, message: "user has been registered" })
  } catch (err) {
    console.log(err);
    res.send({ error: err })
  }
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await req.context.models.User.findOne({ where: { username } });

  if (!user) {
    res.send({ ok: false, error: { user: "couldn't find user" } });
  }

  const valid = await verify(user.password, password);

  if (!valid) {
    res.send({ ok: false, error: { user: 'bad password' } });
  }
  
  res.cookie('sid', 'cookie')
  res.send({ ok: true, message: 'logged in' })
});

// logout

router.get("/logout", async (req, res) => {
  res.clearCookie('sid');
  res.send({ ok: true, message: 'logged out' })
});

router.get("/protected-get", authCheck, async (req, res) => {
  const users = await req.context.models.User.findAll();

  return res.send(users);
})

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
