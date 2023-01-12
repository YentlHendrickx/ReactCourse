import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { countries } from '../data';

export default function Game() {

    const [score, setScore] = useState(0);
    const [country, setCountry] = useState('');
    const [flags, setFlags] = useState([])

    useEffect(() => {
        nextCountry();;
    }, [])

    function nextCountry() {
        // Get random countries
        const randomCountries = pick3RandomCountries(countries);

        // Set flags
        setFlags(randomCountries);

        // Pick random country
        setCountry(randomCountries[Math.floor(Math.random() * 3)].name)
    }

    function pick3RandomCountries(countries) {
        const allCountries = [...countries];

        let the3Countries = [];

        for (let i = 0; i < 3; i++) {
            let randomPosition = Math.floor(allCountries.length * Math.random());
            let randomCountry = allCountries.splice(randomPosition, 1);
            the3Countries.push(...randomCountry);
        }

        return the3Countries;
    }

    function handlePress(guess) {
        if (flags[guess].name === country) {
            setScore(score + 1);
        }

        nextCountry();
    }

    return (
        <View>
            <Text style={[styles.white, styles.center]}>Choose the right flag!</Text>
            <Text style={[styles.white, styles.center]}>{country}</Text>

            <View style={styles.container}>
                <TouchableOpacity onPress={() => handlePress(0)}>
                    <Image style={styles.flag} source={flags[0].image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(1)}>
                    <Image style={styles.flag} source={flags[1].image} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(2)}>
                    <Image style={styles.flag} source={flags[2].image} />
                </TouchableOpacity>
            </View>

            <Text style={[styles.white, styles.center]}>Score: {score}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    white: {
        color: '#fff',
    },
    center: {
        textAlign: 'center',
    },
    flag: {
        width: 100,
        height: 100,
        resizeMode: 'stretch'
    }
});