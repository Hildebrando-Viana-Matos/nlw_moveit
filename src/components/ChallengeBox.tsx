import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext);
    const { resertCountdown } = useContext(CountdownContext);

    function handChallengeSucceded() {
        completedChallenge()
        resertCountdown()
    }

    function handChallengeFailed() {
        resetChallenge();
        resertCountdown();
    }

    return (
        <div className={styles.ChallengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.ChallengeActive}>
                    <header>Ganhe { activeChallenge.amount } xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Corpo"/>
                        <strong>Novo desafio</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>

                    <footer>
                        <button type="button" className={styles.challangeFailedButton} onClick={handChallengeFailed} >Falhei</button>
                        <button type="button" className={styles.challangeSucceedButton} onClick={handChallengeSucceded}>Completei</button>
                    </footer>

                </div>
            ) : (
            <div className={styles.ChallengeBoxNotActive}>
                <strong>Finalize um ciclo para recener um desafio</strong>

                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completendo desafios
                </p>
            </div>
            ) }
        </div>
    )
}