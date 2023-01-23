// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration ,OpenAIApi} from 'openai'



const configuration= new Configuration({
  apiKey:process.env.OPEN_API_KRY,
})

const openai=new OpenAIApi(configuration)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse

) {
  const prompt=req.query.prompt
  if(!prompt){
    return res.status(400).json({error:" missing prompt"})
  }
if(prompt.length>100){
  return res.status(400).json({error:"  prompt too long "})

}

const completion=await openai.createCompletion({
  model:"text-davinci-003",
  prompt:`create a cool business name  for ${ prompt}. \n
  Funny Business name is :
  `
,
max_tokens:500,
temperature:1,
presence_penalty:0,
frequency_penalty:0

})

console.log("data",completion.data.choices[0])

 const idea=completion.data.choices[0].text
console.log("idea",idea)
  res.status(200).json({ idea })


 
}

