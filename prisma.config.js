require('dotenv').config()
const path = require('node:path')
const { defineConfig } = require('prisma/config')

module.exports = defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL,
  },
})