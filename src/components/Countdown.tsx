import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const { minutes, seconds, hasFinished, isActive, startCountdown, resertCountdown} = useContext(CountdownContext);
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secoundsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
    //Atribuindo as variaveis e transformando elas em uma string e verificando se ele começa com 2 números pra depois repartir me 2, caso eles tenham apenas 1 número, vão colocar um 0 no inicio e depois repartir em 2 para mostrar o resultado
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secoundsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

    
            { hasFinished ? /*Caso tenha encerrado o circulo ele vai ficar desabilidado*/ (
                <button disabled className={styles.CountdownButton}>
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button onClick={resertCountdown} type="button" className={`${styles.CountdownButton} ${styles.CountdownButtonActive} `}>
                            Abandonar ciclo
                        </button>
                    )  : (
                        <button onClick={startCountdown} type="button" className={styles.CountdownButton}>
                            Iniciar um ciclo
                        </button>
                    )/*Se estiver ativo mostre o abandonar ciclo, e não mostre o iniciar ciclo */}
                </>
            ) }
            
        </div>
    )
}