const db = require('../config/connection');
const { User, Card } = require('../models');
const userSeeds = require('./userSeeds.json');
const cardSeeds = require('./cardSeeds.json');

db.once('open', async () => {
  try {
    await Card.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < cardSeeds.length; i++) {
      const { _id, cardAuthor } = await card.create(cardSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: cardAuthor },
        {
          $addToSet: {
            cards: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
