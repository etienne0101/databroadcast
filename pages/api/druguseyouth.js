// pages/api/drugdata.js

import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  // Chemin vers ton fichier JSON
  const jsonDirectory = path.join(process.cwd(), '/data')
  const fileContents = fs.readFileSync(
    jsonDirectory + '/drug-policies/use/youth-world.json',
    'utf8'
  )

  // Parse le fichier JSON
  const data = JSON.parse(fileContents)

  // Récupère les query params
  const { country, substance, useperiod } = req.query

  // Filtrer les données et reformater
  let results = {}
  data.forEach((item) => {
    if (
      item['Country/ Territory'].toLowerCase() === country.toLowerCase() &&
      item['Substance'].toLowerCase() === substance.toLowerCase()
    ) {
      let year = item['Year of Estimate']
      let value = item[useperiod]
      if (value) {
        results[year] = value
      }
    }
  })

  // Vérifier si l'objet résultant est vide
  if (Object.keys(results).length > 0) {
    res.status(200).json(results)
  } else {
    res
      .status(404)
      .json({
        message: `Merde, aucune donnée trouvée pour ${country} avec la substance ${substance} pour la période ${useperiod}.`
      })
  }
}
