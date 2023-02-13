import Express from "express";
import UserSchema from "../models/Users.js";

const Users = UserSchema;

const app = Express();

app.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/", async (req, res) => {
  const user = new Users({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    address: {
      street: req.body.address.street,
      suite: req.body.address.suite,
      city: req.body.address.city,
      zipcode: req.body.address.zipcode,
      geo: {
        lat: req.body.address.geo.lat,
        lng: req.body.address.geo.lng,
      },
    },
    phone: req.body.phone,
    website: req.body.website,
    company: {
      name: req.body.company.name,
      catchPhrase: req.body.company.catchPhrase,
      bs: req.body.company.bs,
    },
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/many", async (req, res) => {
  const users = req.body;
  try {
    const savedUsers = await Users.insertMany(users);
    res.json(savedUsers);
  } catch (err) {
    res.json({ message: err });
  }
});

export default app;
