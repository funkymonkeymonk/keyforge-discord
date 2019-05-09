require('dotenv').config()
const { Client, Attachment } = require('discord.js')
const client = new Client()
const Fuse = require('fuse.js')
const axios = require('axios')

const kc = axios.create({
  baseURL: 'https://keyforge-compendium.com/api/v1',
  auth: {
    username: process.env.KC_USER,
    password: process.env.KC_SECRET
  },
  headers: {
    Accept: '*/*'
  },
});

const getCardList = async () => {
  try {
    const [set1, set2] = await Promise.all([kc.get('/sets/1/cards/'), kc.get('/sets/2/cards/')]);
    return set1.data.concat(set2.data)
  } catch (e) {
    console.log(e)
    return []
  }
}

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title"
  ]
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  if (msg.content.startsWith('!kf')) {
    const list = await getCardList()
    const fuse = new Fuse(list, options)

    const searchTerm = msg.content.split(' ').slice(1).toString(' ')
    console.log(msg.content + ' - Searching for ' + searchTerm)
    const res = fuse.search(searchTerm)
    console.log(res.length + ' results found.')

    if (res.length > 0) {
      const card = res[0]
      console.log(card.title + ' selected')
      // Todo print fuse score
      const cardImage = new Attachment(card.front_image)
      msg.channel.send(card.title, cardImage)
    } else {
      msg.channel.send('Card not found.')
    }
  }
})

client.login(process.env.BOT_TOKEN)