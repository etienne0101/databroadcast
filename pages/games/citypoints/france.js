import dynamic from 'next/dynamic';

// Importe dynamiquement le composant France, avec le rendu désactivé côté serveur
const DynamicFrance = dynamic(() => import('../../../components/games/citypoint/France'), {
    ssr: false
});

const MapPage = () => {
    return <DynamicFrance/>;
};

export default MapPage;
