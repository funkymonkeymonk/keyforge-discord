require('dotenv').config()
const { Client, Attachment } = require('discord.js')
const client = new Client()
const Fuse = require('fuse.js')

//TODO: Get card list from keyforge compendium
const getCardList = () => {
  return [
    {
      "title": "Anger",
      "card_type": "Action",
      "front_image": "https://cdn.keyforgegame.com/media/card_front/en/341_1_7C854VPW72RH_en.png",
      "text": "Play: Ready and fight with a friendly creature.",
      "traits": null,
      "amber": 1,
      "power": 0,
      "armor": 0,
      "rarity": "Common",
      "flavor_text": "“Don’t make them angry you say? Heh. The Brobnar are born angry.” –Old Bruno",
      "number": 1,
      "is_maverick": false,
      "cards_decks_count": 140797,
      "artist": "Melvin Chan",
      "house_name": "Brobnar",
      "faqs": [
        {
          "id": 3,
          "question": "Can Anger be used on a friendly creature from a non-active house?",
          "answer": "Yes. The only restriction is that the creature you select is \"friendly\" (i.e. under your control). Therefore, you can choose any friendly creature in play. That creature must fight, if possible.",
          "card_id": 127,
          "created_at": "2018-11-27T15:39:34.645Z",
          "updated_at": "2018-12-09T13:27:45.394Z",
          "rule_source_id": null,
          "source_id": null,
          "rule_id": null
        },
        {
          "id": 2,
          "question": "Can Anger be used on a friendly creature that is not exhausted?",
          "answer": "Yes. You always resolve as much of an ability as possible. Therefore, the creature would remain ready and then it would fight. If there are no enemy creatures to fight, the \"**Play:**\" ability would not resolve, but you would still get the Æmber bonus for playing Anger.",
          "card_id": 127,
          "created_at": "2018-11-27T15:36:47.904Z",
          "updated_at": "2018-12-12T11:55:45.314Z",
          "rule_source_id": null,
          "source_id": null,
          "rule_id": null
        },
        {
          "id": 4,
          "question": "What happens if Anger is used on a creature and there are no opposing creatures to fight?",
          "answer": "If the opponent has no creatures on their battleline, the creature is readied, but does not fight. Assuming the creature is usable -- e.g. via the active house or another ability -- you can then choose to use the creature in a different way, such as reap; otherwise, the creature is unable to be used.\r\n\r\nExample: if there are no enemy creatures in play and you choose Brobnar as your active house, you could reap with a Brobnar creature and play Anger to ready it. Since there are no enemy creatures to fight, you could choose to use the creature in another way, such as reaping again.",
          "card_id": 127,
          "created_at": "2018-11-27T15:39:58.713Z",
          "updated_at": "2018-12-14T11:47:56.292Z",
          "rule_source_id": null,
          "source_id": null,
          "rule_id": null
        },
        {
          "id": 254,
          "question": "If I don't have any creatures in play, may I still play Anger to gain the Æmber bonus?",
          "answer": "Yes. The first step in playing any card is to receive the Æmber bonus, if any. Therefore, you can always play action cards to get the Æmber bonus, but are still obligated to resolve as much of the action card as possible. If the \"**Play:**\" ability of the action card is not resolvable (e.g. there are no viable targets), you still keep the Æmber bonus.",
          "card_id": 127,
          "created_at": "2018-12-12T11:57:52.326Z",
          "updated_at": "2018-12-14T14:08:12.739Z",
          "rule_source_id": null,
          "source_id": null,
          "rule_id": null
        },
        {
          "id": 5,
          "question": "What happens if Anger is used on a stunned creature?",
          "answer": "The stunned creature would become exhausted and the stun token would be removed. No fight would take place, and no \"**Fight:**\" abilities would resolve. \r\n\r\nAny attempt to fight with a stunned creature will invoke the normal stun removal rules, even if circumstances wouldn't normally allow the creature to fight, such as no opposing creatures or a card ability that prevents creatures from being used to fight.  When a creature is stunned, the next time the creature is used (e.g. fight, reap, or another action) the only thing that happens is the creature exhausts and the stun token is removed. Whether you attempt to fight, reap, or perform another action, it does not resolve, nor do any abilities associated with that usage resolve (such as \"**Reap:**\" or \"**Fight:**\" abilities). Therefore, when using Anger on a stunned creature, the creature would become exhausted, the stun token would be removed, and no fight or \"**Fight:**\" abilities would resolve, regardless of the active house or circumstances that may prevent the creature from being used to fight normally.",
          "card_id": 127,
          "created_at": "2018-11-27T15:40:18.438Z",
          "updated_at": "2019-01-15T13:22:27.052Z",
          "rule_source_id": null,
          "source_id": 1,
          "rule_id": null
        }
      ],
      "tags": [
        {
          "id": 23,
          "name": "Actions",
          "description": "Cards with the \"action\" type",
          "hide_by_default": true,
          "created_at": "2018-12-12T15:33:23.473Z",
          "updated_at": "2018-12-17T13:24:00.964Z"
        },
        {
          "id": 1,
          "name": "Ambassadors",
          "description": "Cards that are usable regardless of the active house, or that let a player use cards outside the currently active house ",
          "hide_by_default": false,
          "created_at": "2018-12-12T15:33:00.348Z",
          "updated_at": "2018-12-21T15:22:03.330Z"
        },
        {
          "id": 29,
          "name": "Æmber Bonus",
          "description": "Cards with an Æmber bonus",
          "hide_by_default": false,
          "created_at": "2018-12-13T12:28:11.631Z",
          "updated_at": "2018-12-17T13:14:42.895Z"
        }
      ]
    },
    {
      "title": "Barehanded",
      "card_type": "Action",
      "front_image": "https://cdn.keyforgegame.com/media/card_front/en/341_2_53CXMQCJ46PP_en.png",
      "text": "Play: Put each artifact on top of its owner’s deck.",
      "traits": null,
      "amber": 1,
      "power": 0,
      "armor": 0,
      "rarity": "Rare",
      "flavor_text": null,
      "number": 2,
      "is_maverick": false,
      "cards_decks_count": 19221,
      "artist": "Michele Giorgi",
      "house_name": "Brobnar",
      "faqs": [
        {
          "id": 21,
          "question": "Does this affect only enemy artifacts?",
          "answer": "This affects ***every*** artifact, including your own.",
          "card_id": 288,
          "created_at": "2018-11-28T15:27:08.523Z",
          "updated_at": "2018-11-28T15:29:49.861Z",
          "rule_source_id": null,
          "source_id": null,
          "rule_id": null
        },
        {
          "id": 22,
          "question": "If a player has multiple artifacts in play when Barehanded is played, who decides the order in which the artifacts are placed on top of the deck?",
          "answer": "The active player chooses the order in which the artifacts are placed for both players.",
          "card_id": 288,
          "created_at": "2018-11-28T15:27:49.771Z",
          "updated_at": "2018-11-28T15:27:49.771Z",
          "rule_source_id": null,
          "source_id": null,
          "rule_id": null
        }
      ],
      "tags": [
        {
          "id": 23,
          "name": "Actions",
          "description": "Cards with the \"action\" type",
          "hide_by_default": true,
          "created_at": "2018-12-12T15:33:23.473Z",
          "updated_at": "2018-12-17T13:24:00.964Z"
        },
        {
          "id": 19,
          "name": "Recyclers",
          "description": "Cards that return one or more cards to a player's hand or deck",
          "hide_by_default": false,
          "created_at": "2018-12-12T15:33:13.808Z",
          "updated_at": "2018-12-17T13:45:05.267Z"
        },
        {
          "id": 29,
          "name": "Æmber Bonus",
          "description": "Cards with an Æmber bonus",
          "hide_by_default": false,
          "created_at": "2018-12-13T12:28:11.631Z",
          "updated_at": "2018-12-17T13:14:42.895Z"
        }
      ]
    }
  ]
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

const fuse = new Fuse(getCardList(), options)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content.startsWith('!kf')) {
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