const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");
const app = express();
const port = 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// // Twilio credentials (replace with your own)
const accountSid = "AC794e0c589bb1d2fa83aa6e371654444b";
const authToken = "ae5050339bbf422e6c9d7f9330f7d4f3";
const twilioClient = twilio(accountSid, authToken);

app.use(bodyParser.json());

// Endpoint to send WhatsApp message
app.post("/send-whatsapp", async (req, res) => {
  const lat = req.query.latitude;
  const lng = req.query.longitude;

  try {
    await twilioClient.messages.create({
      from: "whatsapp:+14155238886", // Twilio's WhatsApp sandbox number
      to: "whatsapp:+919987602844",
      body: `Low Battery! check nearest charging stations latitude is: ${lat} and longitude is: ${lng}`,
      persistentAction: `geo:${lat},${lng}`,
    });

    res.status(200).json({ success: true, message: "WhatsApp message sent." });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send WhatsApp message." });
  }
});

app.post("/send-sms", async (req, res) => {
  const lat = req.query.latitude;
  const lng = req.query.longitude;

  try {
    await twilioClient.messages.create({
      from: "+13475354127", // Twilio's WhatsApp sandbox number
      to: "+919987602844",
      body: `Low Battery! check nearest charging stations latitude is: ${lat} and longitude is: ${lng}`,
      persistentAction: `geo:${lat},${lng}`,
    });

    res.status(200).json({ success: true, message: "SMS message sent." });
  } catch (error) {
    console.error("Error sending SMS message:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send SMS message." });
  }
});

// app.get("/nearby-charge");

// // const sendWhatsapp = async (req, res, next) => {
// //   const name = req.query.name;
// //   const lat = req.query.latitude;
// //   const lng = req.query.longitude;

// //   const client = require("twilio")(accountSid, authToken);
// //   try {
// //     await client.messages.create({
// //       body: `EMERGENCY! ${name} need help!. Please send assistance immediately. Thank you!.`,
// //       from: "whatsapp:+14155238886",
// //       to: "whatsapp:+919987602844",
// //       persistentAction: `geo:${lat},${lng}|${name}`,
// //     });
// //     res.send("Successful");
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Error initiating call");
// //   }
// // };

// // const sendMessage = async (req, res, next) => {
// //   const name = req.query.name;
// //   const lat = req.query.latitude;
// //   const lng = req.query.longitude;
// //   const client = require("twilio")(accountSid, authToken);

// //   try {
// //     await client.messages.create({
// //       body: `SOS Alert! ${name} needs help at this location : ${lat},${lng}`,
// //       from: "+13475354127",
// //       to: `+919987602844`,
// //       persistentAction: `geo:${lat},${lng}|${name}`,
// //     });
// //     res.send("Sms Successful");
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Error Sending sms");
// //   }
// //   //   .then(message => console.log);
// // };

// // Start the server
app.listen(5000, () => {
  console.log(`Server is running at http://localhost:5000`);
});

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const router = require("./routes");

// //Middleware
// app.use(express.json());
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// app.use("/", router);

// //localhost:5000/books
// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });
