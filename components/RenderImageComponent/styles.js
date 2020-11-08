import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    heading: {
        marginTop: 10,
        textAlign: "center",
        fontWeight: "bold",
        color: "palegreen"
    },

    imageContainer: {
        alignSelf: "center",
        height: 200,
        width: 300,
        resizeMode: 'stretch',
        margin: 5
    },

    imageTitle: {
        marginTop: 10,
        textAlign: "center",
        fontWeight: "bold",
        color: "papayawhip"
    },

    imageDate: {
        marginTop: 10,
        textAlign: "center",
        fontWeight: "bold",
        color: "papayawhip"
    },

    imageExplanation: {
        marginTop: 30,
        color: "papayawhip",
        marginLeft: 20,
        marginRight: 20
    },

    showMoreText: {
        color: "papayawhip",
        padding: 20,
        fontWeight: "bold"
    }
})

export { styles }  