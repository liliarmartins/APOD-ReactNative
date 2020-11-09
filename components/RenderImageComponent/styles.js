import { StyleSheet, Dimensions } from 'react-native';
const win = Dimensions.get('window');

const styles = StyleSheet.create({

    heading: {
        marginTop: 10,
        textAlign: "center",
        fontWeight: "bold",
        color: "palegreen"
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

    imageContainer: {
        alignSelf: "center",
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        height: 4*(win.width)/7,
        width: 5*(win.width)/6,
        resizeMode: 'contain',
        borderColor: "papayawhip",
        borderWidth: 1,
        margin: 5
    },

    imageExplanation: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        color: "papayawhip"
    },

    showMoreText: {
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        color: "papayawhip",
        fontWeight: "bold"
    },

    imageCopyright: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        color: "palegreen"
    }
})

export { styles }  