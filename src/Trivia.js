import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Question from './components/Question'
import Finish from './components/Finish'

const random = items => items[Math.floor(Math.random() * items.length)]
const randomQuestion = (questions, finishedQuestions) => {
  let eligibleQuestions = Array.from(questions).filter(
    ([index]) => !finishedQuestions.has(index)
  )
  return random(eligibleQuestions)
}

export default class Trivia extends Component {
  state = {
    score: 0,
    finished: false,
    averageTime: 0,
    answers: new Map(),
    timeStart: new Date().getTime(),
    question: [
      0,
      {
        category: '',
        type: '',
        difficulty: '',
        question: '',
        correct_answer: '',
        incorrect_answers: []
      }
    ]
  }
  constructor(props) {
    super(props)
    this.state.question = randomQuestion(props.questions, this.state.answers)
  }
  answer = async target => {
    if (this.props.questions.size === this.state.answers.size + 1) {
      this.setState({ finished: true })
    } else {
      const [index, question] = this.state.question
      const answers = this.state.answers
      const answered = question.correct_answer === target
      let score = this.state.score
      if (answered) {
        score += 10
      }
      const seconds = new Date().getTime() - this.state.timeStart
      answers.set(index, { answered, seconds })
      await this.setState({ answers })
      const newQuestion = randomQuestion(
        this.props.questions,
        this.state.answers
      )
      const timeStart = new Date().getTime()
      this.setState({ question: newQuestion, timeStart, score })
    }
  }
  render() {
    if (this.state.finished) {
      return (
        <Finish
          answers={this.state.answers}
          score={this.state.score}
          restart={this.props.restart}
        />
      )
      // FIXME concider computing score in finish component
    } else {
      return <Question question={this.state.question} answer={this.answer} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
