require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const campaign = match[1];
  const username = msg.from.username || "sem_username";
  const user_id = msg.from.id.toString();

  try {
    await axios.post(process.env.PIXELGRAM_API, {
      username,
      user_id,
      campaign
    });

    await bot.sendMessage(chatId, `✅ Cadastro feito!\n\nClique abaixo para acessar o canal:\n\n${process.env.LINK_CHANNEL}`);
  } catch (err) {
    console.error("Erro:", err.message);
    await bot.sendMessage(chatId, "❌ Erro ao registrar. Tente novamente.");
  }
});
