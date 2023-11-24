import React, { useState, useEffect } from 'react'
import styles from '../../../styles/games/Citypoints.module.css'; // Vérifie le chemin d'accès

const ScoreSummary = ({ scores }) => {
  const [bestDepartment, setBestDepartment] = useState(null)
  const [worstDepartment, setWorstDepartment] = useState(null)

  useEffect(() => {
    let bestScore = -Infinity
    let worstScore = Infinity
    let bestDept = null
    let worstDept = null

    for (const department in scores) {
      const score = scores[department]
      if (score > bestScore) {
        bestScore = score
        bestDept = department
      }
      if (score < worstScore) {
        worstScore = score
        worstDept = department
      }
    }

    setBestDepartment(bestDept)
    setWorstDepartment(worstDept)
  }, [scores])

  return (
<div className={styles.scoreSummaryContainer}>
  {bestDepartment && (
    <div className={styles.departmentText}>
      Le département où vous avez le plus vécu : <br></br> <br></br> <span className={styles.departmentNumber}>{bestDepartment}</span>
    </div>
  )}
  {worstDepartment && (
    <div className={styles.departmentText}>
      Le département où vous n'avez jamais vécu : <br></br> <br></br> <span className={styles.departmentNumber}>{worstDepartment}</span>
    </div>
  )}
</div>
  )
}

export default ScoreSummary
