import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/Hildebrando-Viana-Matos.png" alt="Hildebrando Viana Matos"/>
            <div>
                <strong>Hildebrando Viana Matos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}

//<img src="icons/level.svg" alt="Level"/> Independente onde a imagem está, se ela está na página public ela autómaticamete fica publica, ou seja, não precisa escrever totalmente o diretorio