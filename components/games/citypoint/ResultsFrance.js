import React from 'react';

const ResultsTable = ({ results }) => {
    if (results.length === 0) {
        return <p>Aucun résultat à afficher.</p>;
    }

    return (
        <div>
            <h2>Résultats</h2>
            <table>
                <thead>
                    <tr>
                        <th>Ville</th>
                        <th>Distance (km)</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.city}</td>
                            <td>{result.distance.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;
