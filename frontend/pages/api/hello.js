// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import csrf from "../../src/csrf"

export default async function handler(req, res) {
  try {
    await csrf(req, res)
  } catch (e){
    return res.status(401).json({message: "No"})
  }
  res.status(200).json({ name: 'John Doe' })
}

