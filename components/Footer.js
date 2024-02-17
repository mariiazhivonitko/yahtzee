import { Text, View } from "react-native"
import style from '../style/style'

export default Footer = () => {
    return(
        <View style={style.footer}>
            <Text style={style.author}>
                opiskelija: Mariia Zhivonitko
            </Text>
        </View>
    )
}