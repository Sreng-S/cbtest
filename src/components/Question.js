import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { Button } from 'react-native-material-ui'
import styles from '../styles'

const shuffle = items => items.sort(() => Math.random() - 0.5)
const computeAnswers = question =>
  shuffle([...question.incorrect_answers, question.correct_answer])

export default class Question extends Component {
  render() {
    const [index, question] = this.props.question
    const answers = computeAnswers(question).map((answer, i) => ({
      title: `${answer}`,
      key: `${i}`
    }))
    return (
      <View style={styles.card}>
        <Text style={styles.body}>{question.question}</Text>
        <View style={styles.buttonWrapper}>
          <FlatList
            data={answers}
            renderItem={({ item }) => (
              <View style={styles.buttonAlign}>
                <Button
                  primary
                  onPress={() => this.props.answer(item.title)}
                  text={`➡ ${item.title}`}
                />
              </View>
            )}
          />
        </View>
      </View>
    )
  }
}
