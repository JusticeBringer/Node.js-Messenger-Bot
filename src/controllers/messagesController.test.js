require("dotenv").config();
const getMessageWithGivenId = require('./messagesController');
const {MongoClient} = require('mongodb');

test("Function getMessageWithGivenId should return the text of the message with given id from all messages stored in DB", () => {
	let obj = [
		{
		_id: "5f58d5d6da331d003189ab09",
		text: [ 'Hi', 'Sure', 'Gabriel' ],
		senderId: '107576601087916'
		},
		{
		_id: "5f58d5fdda331d003189ab0c",
		text: [ 'Hi' ],
		senderId: '111019327407043'
		}
	];

	expect(getMessageWithGivenId(obj[0]._id, obj)).toBe(obj[0].text);
	expect(getMessageWithGivenId(obj[1]._id, obj)).toBe(obj[1].text);
});

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
    });
    db = await connection.db(process.env.DB_NAME);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a message into collection', async () => {
    const messages = db.collection(process.env.DB_COLLECTION);

    const mockMessage = {
		_id: "5f58d5d6da331d003189ab20",
		text: [ 'Hi', 'Sure' ],
		senderId: '107576601087987'
	};
    await messages.insertOne(mockMessage);

    const insertedUser = await messages.findOne({_id: mockMessage._id});
    expect(insertedUser).toEqual(mockMessage);
  });
});