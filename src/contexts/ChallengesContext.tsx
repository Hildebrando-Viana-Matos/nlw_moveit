import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
//O ReactNode é uma propriedade do react que faz o react aceitar qualquer elemento filho
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
//Importando os desafios

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;//Temos que definir quais os dados que estão nesse objeto
    levelUp: () => void;
    startNewChallange: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData); //Criando Contexto
//Dizendo que esse contexto segue a interface ChallengesContextData

export function ChallengesProvider({ children, ...rest}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted,  setChallangesCompleted] = useState(rest.challengesCompleted ?? 0);//Estados
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    
    useEffect(() => {
        Notification.requestPermission();
    }, [])//Colocando um [] no useEfect significa que a função vai ser realizada uma vez quando for exibida em tela

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal (){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallange() {
       const randomChallangeIndex = Math.floor(Math.random() * challenges.length);//Importando um número aleatorio
       const challenge = challenges[randomChallangeIndex];

       setActiveChallenge(challenge);

       new Audio('/notification.mp3').play();
       //Se a minha permissão foi concedida
       if(Notification.permission == 'granted') {
        new Notification('Novo desafio!!!', {
            body: `Valendo ${challenge.amount}xp`
        })
       }

    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completedChallenge() {
        if(!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }
        setCurrentExperience(finalExperience)
        setActiveChallenge(null);
        setChallangesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{ 
            level, 
            currentExperience, 
            challengesCompleted, 
            levelUp,
            startNewChallange,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completedChallenge,
            closeLevelUpModal,
        }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}
//o Provider dá a opção de todos os elementos de ChallangesContext para toda a aplicação