import AuthStackNavigator from "../stack/AuthStackNavigator";
import useAuth from "@/hooks/queries/useAuth";
import TabNavigator from "../tab/TabNavigator";

function RootNavigator(){
    const isLogin = true;

    return <>{isLogin ? <TabNavigator/> : <AuthStackNavigator/>}</>
}

export default RootNavigator