import Image from "next/image"

import styles from '@/styles/About.module.css'

export default function About(){
    return(
        <div className={styles.container}>
            <h1>Sobre o Projeto</h1>
            <p>Pokenext criado com Next JS</p>

            <Image src='/images/charizard.png' width='300' height='300' alt="charizard"/>
        </div>
    )
}