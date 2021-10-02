import React, { useState } from 'react'
import Button from './Components/Button';
import History from './Components/History';
import Screen from './Components/Screen';

const buttons = [
	'C', '+-', '!', '/',
	7, 8, 9, 'X',
	6, 5, 4, '+',
	1, 2, 3, '-',
	0, '.', '='
]

function App() {

	const initialState = {

		value: 0,
		operator: '',
		firstValue: 0,
		secondValue: 0,
		answer: '',
		history: []
	}

	const [calc, setCalc] = useState(initialState)

	const resetHandler = () => {

		setCalc({
			value: 0,
			operator: '',
			firstValue: 0,
			secondValue: 0,
			answer: '',
			history: [...calc.history]
		})
	}
	const invertHandler = e => {

		setCalc({

			...calc,
			value: calc.value * -1
		})
	}
	const factorialHandler = () => {

		if (calc.value === 0) {

			return
		}
		const val = calc.value
		let fact = 1
		for (let i = 1; i <= val; i++) {
			fact *= i
		}

		setCalc({

			...calc,
			answer: fact,
			history: [...calc.history, [`${calc.value}!`, fact]],
			value: 0
		})
	}

	const operatorHandler = e => {

		if (calc.value === 0) {
			return
		}

		let op = e.target.innerHTML;

		setCalc({
			...calc,
			operator: op,
			firstValue: calc.value,
			value: 0,
			answer: Number(0)
		})
	}

	const pointHandler = () => {

		let value = String(calc.value)
		if (!value.includes('.')) {

			const updateVal = value + "."

			setCalc({
				...calc,
				value: String(updateVal)
			})
		}
	}

	const answerHandler = e => {

		if (calc.operator === '') {
			return
		}

		if (calc.firstValue === 0 && calc.value === 0) {
			return
		}

		function calcAns(num1, num2, op) {

			switch (op) {
				case '/':
					return Number(num1) / Number(num2)
				case 'X':
					return Number(num1) * Number(num2)
				case '+':
					return Number(num1) + Number(num2)

				default:
					return Number(num1) - Number(num2)
			}
		}

		const ans = Number(calcAns(calc.firstValue, calc.value, calc.operator))

		setCalc({
			...calc,
			answer: ans,
			history:
				[...calc.history, [calc.firstValue, calc.operator === 'X' ? '*' : calc.operator, calc.value, ans]],
			value: 0,
			operator: '',
			firstValue: 0
		})
	}

	const numberHandler = e => {

		const val = e.target.innerHTML;
		setCalc({
			...calc,
			value: Number(calc.value + val),
			answer: ''
		})
	}


	return (
		<React.Fragment>

			<History history={calc.history} />
			< div className="calc" >
				<Screen
					value={calc.answer === '' ? calc.value : calc.answer} />
				<div className="keys">
					{
						buttons.map((button, i) => (
							<Button
								value={button}
								key={i}
								className={button === '=' ? 'equal' : ''}
								onClick={
									button === 'C'
										? resetHandler
										: button === '+-'
											? invertHandler
											: button === '!'
												? factorialHandler
												: button === '/' || button === 'X' || button === '+' || button === '-'
													? operatorHandler
													: button === '='
														? answerHandler
														: button === '.'
															? pointHandler
															: numberHandler
								} />
						))
					}
				</div>

			</div >
		</React.Fragment>

	)
}

export default App;