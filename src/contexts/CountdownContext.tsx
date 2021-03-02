import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";
//Aqui eu declaro o formato do retorno pelo typescript-
interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resertCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallange } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60); //Pegando o total de minutos e colocando em segundos para ter uma maior facilidade

    const [isActive, setIsActive] = useState(false);//Verificando se o startCountdown está ativo
    const [hasFinished,  setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);//Pegando o tempo e dividindo ele por 60 para dá o total de minutos
    const seconds = time % 60;

    function startCountdown(){
        setIsActive(true);
    }

    function resertCountdown(){
        clearTimeout(countdownTimeout);//A partir da variave global que eu criei eu vou cancelar o timeout para quando eu clicar no botão ele parar toda a execusão
        setIsActive(false);
        setTime(25 * 60);//Colocando o valor de novo para 25
        setHasFinished(false);
    }

    useEffect(() => {
        //Quando o active estiver ativo e o time for maior do que 0
        if (isActive && time > 0) {
            countdownTimeout =  setTimeout(() =>{
                setTime(time - 1);
            }, 1000);//Vai se repetir a cada 1 segundo
        }else if(isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallange();
        }
    }, [isActive, time]);
    //O useEffect é uma função do react que ativa uma função quando ao mudar na minha aplicação, e eu passo esse parametro a ele
    //E também quando o time mudar(que está mudando na propria useEffect) ele vai ativar a função de novo

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resertCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}