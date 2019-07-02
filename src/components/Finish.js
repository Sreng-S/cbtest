import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-material-ui'
import styles from '../styles'

const computeAverage = answers =>
  Array.from(answers).reduce(
    (value, [index, answer]) => value + answer.seconds,
    0
  ) / answers.size
const conj = (number, noun) =>
  `${number} ${noun}${number > 1 || number === 0 ? 's' : ''}`

export default class Finish extends Component {
  render() {
    const average = Math.floor(computeAverage(this.props.answers) / 1000)
    const score = this.props.score
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Finished!</Text>
        <Text style={styles.body}>Average time: {conj(average, 'second')}</Text>
        <Text style={styles.body}>Score: {conj(score, 'point')}</Text>
        <View style={styles.buttonWrapper}>
          <Button primary text="Play again?" onPress={this.props.restart} />
        </View>
      </View>
    )
  }
}
