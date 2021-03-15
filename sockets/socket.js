const {io} = require('../index');

io.on("connection", (client) => {
  console.log("Cliente conectado");
  client.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log(payload);

    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });
});
