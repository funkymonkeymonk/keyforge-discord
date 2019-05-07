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

const getCardList = () => {
  return kc.get('/sets/1/cards/')
    .then(function (response) {
      // handle success
      const cardList = response.data
      return cardList
    })
    .catch(function (error) {
      // handle error
      console.log(error)
      console.log('Error ' + error.response.status);
    })
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
      const cardImage = new Attachment(card.front_image)
      msg.channel.send('Call of the Archons: ' + card.title, cardImage)
    } else {
      msg.channel.send('Card not found.')
    }
  }
})

client.login(process.env.BOT_TOKEN)