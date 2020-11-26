var express = require("express");
var router = express.Router();
var Bill = require("./../db/models/bill");
var User = require("./../db/models/user");
var Room = require("./../db/models/room");
var Login = require("./../db/models/login");

/**
 * Home page: loading all bill
 */
router.get("/", (req, res) => {
  res.render("index");
});
router.post("/", async (req, res) => {
  try {
    const login = await Login.find();
    login.forEach((element) => {
      if (
        element.usernamelogin == req.body.email &&
        element.passwordlogin == req.body.pass
      ) {
        res.redirect("/home");
      }
    });
  } catch (error) {
    console.log("err");
    res.redirect("/home");
  }
});
// router.get("/home", (req, res) => {
//   Bill.find({})
//     .then((bill) => {
//       res.render("home", { bills: bill });
//     })
//     .catch((err) => {
//       console.log("Error: ", err);
//       res.redirect("/home");
//     });
// });

router.get("/home", (req, res) => {
  if (req.query.search == undefined || req.query.search=="") {
    Bill.find({})
      .then((bill) => {
        res.render("home", { bills: bill });
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.redirect("/home");
      });
  }
  if (req.query.search != undefined) {
    Bill.find({ roomName: req.query.search })
      .then((bill) => {
        res.render("home", { bills: bill });
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.redirect("/home");
      });
  }
});
/**
 * Go to Add bill page
 */
router.get("/add-user", (req, res) => {
  res.render("add-user");
});

router.get("/add-bill", async (req, res) => {
  try {
    const user = await User.find();

    const room = await Room.find({ status: "Empty" });

    res.render("add-bill", { users: user, rooms: room });
  } catch (error) {
    res.redirect("/home");
  }
});

/**
 * Add new bill
 */
router.post("/add-bill", async (req, res) => {
  try {
    let newBill = await new Bill({
      roomName: req.body.roomName1,
      userName: req.body.userName1,
      Electricity_bill: req.body.electric,
      Water_bill: req.body.Water_bill1,
      Room_bill: req.body.Room_bill1,
      total: req.body.total1,
      status: "Full",
      pay: req.body.pay1,
    });
    await Room.findOneAndUpdate(
      { roomName: req.body.roomName1 },
      { status: "Full" },
      (err, data) => {
        if (err) console.log(err);
        console.log(data);
      }
    );

    newBill.save();
    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.redirect("/home");
  }
});
router.post("/add-user", async (req, res) => {
  try {
    let newUser = new User({
      userName: req.body.userName2,
      userAge: req.body.userAge2,
      userAddress: req.body.userAddress2,
      idCardNumber: req.body.idCardNumber2,
      phoneAddress: req.body.phoneAddress2,
    });

    await newUser.save();
    const users = await User.find();
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
});

/**
 * Go to Update bill page
 */
router.get("/update-bill/:billId", (req, res) => {
  Bill.findById(req.params.billId, (err, bill) => {
    if (err) {
      console.log(err);
      res.redirect("/home");
    }
    res.render("update-bill", { bill: bill });
  });
});

/**
 * Delete bill
 */
router.delete("/:billID", async (req, res) => {
  console.log(req.body);
  try {
    const check = await Bill.findById({ _id: req.params.billID });
    console.log(check);
    await Room.findOneAndUpdate(
      { roomName: check.roomName },
      { status: "Empty" }
    );
    await Bill.findByIdAndDelete(req.params.billID, (err, doc) => {
      if (err) throw err;
      res.send(doc);
    });
  } catch (error) {
    console.log("error");
    res.redirect("/home");
  }
});

/**
 * Update bill
 */
router.post("/:billID", async (req, res) => {
  try {
    let billId = req.params.billID;
    await Bill.findByIdAndUpdate(
      { _id: billId },
      {
        $set: {
          userName: req.body.userName3,
          Electricity_bill: req.body.Electricity_bill3,
          Water_bill: req.body.Water_bill3,
          Room_bill: req.body.Room_bill3,
          status: req.body.Status3,
          total: req.body.total3,
          pay: req.body.pay3,
        },
      }
    );

    await Room.findOneAndUpdate(
      { roomName: req.body.roomName3 },
      { status: req.body.Status3 }
    );

    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.redirect("/home");
  }
});

module.exports = router;
