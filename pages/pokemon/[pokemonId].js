import Image from "next/image"

import styles from '@/styles/Pokemon.module.css'

export const getStaticPaths = async() => {

    const maxPokemons = 250
    const api = 'https://pokeapi.co/api/v2/pokemon/'
    const res = await fetch(`${api}/?limit=${maxPokemons}`)

    const data = await res.json()

    //params
    const paths = data.results.map((poemon, index) => {
        return {
            params: { pokemonId: (index+1).toString() }
        }
    })

    return {
        paths, fallback: false
    }

}

export const getStaticProps = async(context) => {

    const id = context.params.pokemonId

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const data = await res.json()
    
    return {
        props: { pokemon: data }
    }

}


export default function Pokemon({ pokemon }){

    var pokemonId = 0

    if(pokemonId < 10){
        pokemonId = '00' + pokemon.id
    } 

    if(pokemonId > 9 && pokemonId < 100){
        pokemonId = '0' + pokemon.id
    }

    if(pokemonId > 99){
        pokemonId = pokemon.id
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>{pokemon.name}</h1>
            <Image 
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`}
                width='200'
                height='200'
                alt={pokemon.name}
            />
            <div>
                <h3>Numero: </h3>
                <p>#{pokemon.id}</p>
            </div>
            <div className={styles.types}>
                <h3>Tipo: </h3>
                <div>
                    {
                        pokemon.types.map((item,index) => (
                            <span 
                                key={index}
                                className={`${styles.type} ${styles['type_' + item.type.name]}`}
                            >{item.type.name}</span>
                        ))
                    }
                </div>
            </div>
            <div className={styles.data}>
                <div className={styles.data_height}>
                    <h4>Altura: </h4>
                    <p>{pokemon.height * 10} cm</p>
                </div>
                <div className={styles.data_wight       }>
                    <h4>Peso: </h4>
                    <p>{pokemon.weight/10} kg</p>
                </div>
            </div>
        </div>
    )
}