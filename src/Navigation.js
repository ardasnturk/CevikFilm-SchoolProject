import React from 'react';
import { createStackNavigator, 
    createBottomTabNavigator, 
    createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from './Splash';
import LoginScreen from './Stacks/LoginRegisterStacks/Login';
import MainScreen from './Stacks/MainStacks/Main';
import SearchScreen from './Stacks/MainStacks/Search';
import FilmDetailScreen from './Stacks/MainStacks/FilmDetailPage';
import CategoryScreen from './Stacks/CategoryStacks/Category';
import CategorySectionScreen from './Stacks/CategoryStacks/CategorySection';
import ProfileScreen from './Stacks/ProfileStacks/Profile';
import AddFilmScreen from './Stacks/ProfileStacks/AddFilm';

const LoginStacks = createStackNavigator(
    {
        Splash: SplashScreen,
        Login: LoginScreen
    }, 
    {
        defaultNavigationOptions: ({ navigation }) => ({
            header: null
        })
    }
);

const MainTabs = createStackNavigator(
    {
        HomeScreen: MainScreen,
        Search: SearchScreen,
        FilmDetail: FilmDetailScreen,
        AddFilm: AddFilmScreen
    },
    {
        defaultNavigationOptions: {
            title: 'Ana Sayfa',
            headerStyle: {
                backgroundColor: '#333333',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: '500',
            },
          },
    }
)

const CategoryTabs = createStackNavigator(
    {
        Category: CategoryScreen,
        CategorySection: CategorySectionScreen,
        FilmDetail: FilmDetailScreen,
        AddFilm: AddFilmScreen
    },
    {
        defaultNavigationOptions: {
            title: 'Kategori',
            headerStyle: {
                backgroundColor: '#333333',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: '500',
            },
          },
    }
)

const ProfileTabs = createStackNavigator(
    {
        Profile: ProfileScreen,
        FilmDetail: FilmDetailScreen,
        AddFilm: AddFilmScreen
    }, 
    {
        defaultNavigationOptions: {
            title: 'Profil',
            headerStyle: {
                backgroundColor: '#333333',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: '500',
            },
          },
    }
)

const BottomTabs = createBottomTabNavigator(
    {
        AnaSayfa: MainTabs,
        Kategori: CategoryTabs,
        Profil: ProfileTabs
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'AnaSayfa') {
                    iconName = 'home';
                } else if (routeName === 'Kategori') {
                    iconName = 'film';
                } else if (routeName === 'Profil') {
                    iconName = 'user';
                }
                return <Icon name={iconName} size={25} color={tintColor} />
            },
            
        }),
        tabBarOptions: {
            style: {
                backgroundColor: '#333333'
            },
            activeTintColor: '#E8B706',
            inactiveTintColor: 'grey',
            showLabel: false
        }
    }
)

const RootStack = createStackNavigator(
    {
        // LoginStacks: LoginStacks,
        Main: BottomTabs
    }, 
    {
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default createAppContainer(RootStack);