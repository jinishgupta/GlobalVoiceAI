import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getTranslate = async(req, res) => {
    const {text, targetLanguage, sourceLanguage} = req.body;
    const url = 'https://api.murf.ai/v1/text/translate';
    const data = {
      texts: [text],
      targetLanguage
    };
    if (sourceLanguage) {
      data.sourceLanguage = sourceLanguage;
    }

    try {
      const response = await axios.post(url, data, {
      headers: {
        'api-key': process.env.MURF_API_KEY,
        'Content-Type': 'application/json'
      }
      });
      res.json(response.data);
    } catch (error) {
      console.error(error.response?.data || error);
      res.status(500).json({ error: error.message });
    }
}

export {getTranslate}