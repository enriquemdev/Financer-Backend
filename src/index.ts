import { Hono } from 'hono'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { testTable } from './db/schema'

const app = new Hono()

// You can specify any property from the libsql connection options
const db = drizzle({ 
  connection: { 
    url: process.env.TURSO_DATABASE_URL!, 
    authToken: process.env.TURSO_AUTH_TOKEN!
  }
});

app.get('/', (c) => {
  return c.text('Hello Hono!!!')
})

app.get('/test', async (c) => {
  const record: typeof testTable.$inferInsert = {
    name: "Yes"
  }

  await db.insert(testTable).values(record);
  
  return c.text('tested db')
})

export default app
