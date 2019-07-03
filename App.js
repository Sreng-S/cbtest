import React, { Component } from 'react'
import {
  SafeAreaView,
  Text,
  Button,
  View,
  ActivityIndicator
} from 'react-native'
import { ThemeContext, getTheme } from 'react-native-material-ui'
import Trivia from './src/Trivia'
import { Font } from 'expo'
import api from './src/api'
import styles from './src/styles'

const theme = getTheme()

export default class App extends Component {
  state = {
    question: [],
    token: '',
    loading: false,
    started: false,
    ready: false
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf')
    })
    this.setState({ ready: true })
  }
  start = async () => {
    await this.setState({ loading: true, started: false })
    const token = await api.token()
    const questionList = await api.questions(token)
    const questions = questionList.reduce(
      (map, question, i) => map.set(i, question),
      new Map()
    )
    this.setState({ token, questions, started: true, loading: false })
  }
  render() {
    if (!this.state.ready)
      return (
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      )
    return (
      <ThemeContext.Provider value={theme}>
        <SafeAreaView style={styles.container}>
          {!this.state.started && (
            <View style={styles.card}>
              <Text style={styles.title}>Trivia</Text>
              <Text style={styles.body}>☘ Crowdbotics Testing App ☘</Text>
              <View style={styles.buttonWrapper}>
                <Button
                  onPress={this.start}
                  title="Start quiz"
                  disabled={this.state.loading}
                />
              </View>
              {this.state.loading && <ActivityIndicator />}
            </View>
          )}
          {this.state.started && (
            <Trivia questions={this.state.questions} restart={this.start} />
          )}
        </SafeAreaView>
      </ThemeContext.Provider>
    )
  }
}
