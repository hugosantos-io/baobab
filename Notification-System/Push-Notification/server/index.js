const path = require("path");
require("dotenv").config();

const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "../client"),
  prefix: "/", 
});

fastify.register(require("@fastify/formbody"));

fastify.register(require("@fastify/view"), {
  root: '../client',
  engine: {
    handlebars: require("handlebars"),
  },
});

const webpush = require("web-push");
webpush.setVapidDetails(
  "https://localhost",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

fastify.get("/", function (request, reply) {
  return { status: "ok"};
});

fastify.get("/push", function (request, reply) {
  let params = null;

  if (request.query.page){
    params = { page: request.query.page }
  }

  return reply.view("/src/pages/push.hbs", params);
});

fastify.post("/send-notifications", function (request, reply) {
  const body = request.body;
  
  const notification = JSON.stringify({
    title: body.message_title,
    body: `${body.message_body}`,
    data: {
      url: body.destination_url,
    },
  });
  
  const options = {
    TTL: 259200, // 3 days
  };
  
  const subscriptions = body.subscriptions;
  
  subscriptions.forEach((subscription) => {
    webpush
      .sendNotification(subscription, notification, options)
      .then((result) => {
        console.log(`Result: ${result.statusCode}`);
        reply.status(result.statusCode).send({'status': 'ok'}); })
      .catch((error) => {
        console.log(`Error: ${error} `);
        reply.status(500).send(error);
      });
  });
});

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
