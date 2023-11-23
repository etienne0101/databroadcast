// pages/api/druguseyouth-countries.js
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  // Lire le fichier JSON
  const filePath = path.join(
    process.cwd(),
    'data',
    'drug-policies',
    'use',
    'youth-world.json'
  )
  const jsonData = fs.readFileSync(filePath)
  const data = JSON.parse(jsonData)

  if (req.query.action === 'listcountries') {
    // Créer un set pour éviter les doublons de pays
    const countries = new Set()
    data.forEach((item) => {
      countries.add(item['Country/ Territory'])
    })
    res.status(200).json(Array.from(countries))
  } else if (req.query.action === 'listsubstances') {
    // Créer un set pour éviter les doublons de substances
    const substances = new Set()
    data.forEach((item) => {
      substances.add(item['Substance'])
    })
    res.status(200).json(Array.from(substances))
  } else {
    // Si l'action n'est pas reconnue, renvoyer une erreur
    res.status(400).json({ error: 'Action not supported' })
  }
}
