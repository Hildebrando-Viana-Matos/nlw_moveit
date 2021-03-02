import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import  styles from '../styles/components/ExperienceBar.module.css' //Importando o CSS dese componente e atribuindo o nome para ultilizar no código

export function ExperienceBar(){
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBar}> 
            <span>0 xp</span>
                <div> 
                    <div style={ { width: `${percentToNextLevel}%` } }></div>
                    <span className={styles.currentExperience} style={ { left: `${percentToNextLevel}%` } }>{currentExperience} xp</span>
                </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}

//<header className={styles.experienceBar}> - Aqui no lugar de digitar o nome da classe eu estou digitando o nome da importação e o nome na qual o elemento foi atribuido
