import { StyleSheet } from "react-native-web";

export const Styles = StyleSheet.create({
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    overflowRow: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 5,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 500,
    },
    text: {
        fontSize: 15,
        fontWeight: 500,
    },
    errorText: {
        fontSize: 17,
        fontWeight: 500,
        color: 'red',
        textAlign: 'center',
    },
    tag: {
        borderRadius: 30,
        borderWidth: 1,
        paddingHorizontal: 5,
        alignItems: 'center',
        // marginHorizontal: 10,
    },
    tagText: {
        fontSize: 15,
        fontWeight: 700,
        color: 'black',
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    button: {
        borderRadius: 30,
        alignItems: 'center',
        // width: 100,
        paddingHorizontal: 5,
        borderWidth: 1,
    }
});