import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { model, input } = req.body;
      const response = await axios.post("https://thingproxy.freeboard.io/fetch/http://colormind.io/api/", {
        model,
        input,
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Error al hacer la solicitud." });
    }
  } else if (req.method === "GET") {
    try {
      const response = await axios.get("https://thingproxy.freeboard.io/fetch/http://colormind.io/list/");
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Error al hacer la solicitud." });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}