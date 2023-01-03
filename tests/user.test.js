import request from 'supertest'
import app from '../server'

let user1 = {}
let user2 = {}
let conversationId = null

const emailUser1 = `test_user1_${Date.now()}@example.com`
const emailUser2 = `test_user2_${Date.now()}@example.com`

describe("POST /v1/users/register", () => {
  it("Should create a user 1", async () => {
    const res = await request(app).post("/v1/users/register").send({
      "name": "User2 UnitTest",
      "email": emailUser1,
      "password": "123123123@"
    })

    expect(res.statusCode).toBe(200)

    user1 = { id: res.body.data.id, token: res.body.data.token }
  })
})

describe("POST /v1/users/register", () => {
  it("Should create a user 2", async () => {
    const res = await request(app).post("/v1/users/register").send({
      "name": "User2 UnitTest",
      "email": emailUser2,
      "password": "123123123@"
    })

    expect(res.statusCode).toBe(200)
    user2 = { id: res.body.data.id, token: res.body.data.token }
  })
})

describe("POST /v1/users/login", () => {
  it("Should login a user", async () => {
    const res = await request(app).post("/v1/users/login").send({
      "email": emailUser1,
      "password": "123123123@"
    })

    expect(res.statusCode).toBe(200)
  })
})

describe("GET /v1/users", () => {
  it("Should result list user", async () => {
    const res = await request(app).get("/v1/users")

    expect(res.statusCode).toBe(200)
  })
})

describe("POST /v1/messages/send", () => {
  it("User able to send new message to other user (user1 to user2)", async () => {
    const res = await request(app).post("/v1/messages/send").set('Authorization', `Bearer ${user1.token}`).send({
      "user_id_receiver": user2.id,
      "message": "Test send message from user1 to user2"
    })

    expect(res.statusCode).toBe(200)
    conversationId = res.body.data.conversation_id
  })
})

describe("POST /v1/messages/send", () => {
  it("User able to reply message in existing conversation (user2 reply user1)", async () => {
    const res = await request(app).post("/v1/messages/send").set('Authorization', `Bearer ${user2.token}`).send({
      "user_id_receiver": user1.id,
      "message": "Test reply message from user2 to user1"
    })

    expect(res.statusCode).toBe(200)
  })
})

describe("GET /v1/conversations", () => {
  it("User able to list messages from specific user", async () => {
    const res = await request(app).get("/v1/conversations").set('Authorization', `Bearer ${user1.token}`)

    expect(res.statusCode).toBe(200)
  })
})

describe("GET /v1/conversations/:id", () => {
  it("User able to list conversation they are chatting with", async () => {
    const res = await request(app).get(`/v1/conversations/${conversationId}`).set('Authorization', `Bearer ${user1.token}`)

    expect(res.statusCode).toBe(200)
  })
})
