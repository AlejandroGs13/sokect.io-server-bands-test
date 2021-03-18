const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Linkin park"));
bands.addBand(new Band("Coldplay"));
bands.addBand(new Band("U2"));

console.log(bands);
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());
  client.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log(payload);

    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload["id"]);
    io.emit("active-bands", bands.getBands());
  });

  client.on("new-band",(payload)=>{
     bands.addBand(new Band(payload['name']));
     io.emit("active-bands", bands.getBands());
  })

  client.on("delete-band",(payload)=>{
    bands.deleteBand(payload['id']);
    io.emit("active-bands", bands.getBands());
 })

  client.on("emitir-mensaje", (payload) => {
    // client.broadcast.emit("nuevo-mensaje", payload);
    client.broadcast.emit("nuevo-mensaje", payload);
  });
});
