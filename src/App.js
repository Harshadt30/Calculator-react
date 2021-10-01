import React, { useState } from 'react'
import Button from './Components/Button';
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
		answer: ''
	}

	const [calc, setCalc] = useState(initialState)

	const resetHandler = e => {

		setCalc(initialState)
	}
	const invertHandler = e => {

		setCalc({

			...calc,
			value: calc.value * -1
		})
	}
	const factorialHandler = () => {

		if (calc.value === 1) {

			// setcalc to 1
		}
		const val = calc.value
		let fact = 1
		for (let i = 1; i <= val; i++) {
			fact *= i
		}

		setCalc({

			...calc,
			answer: fact,
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

		setCalc({
			...calc,
			answer: Number(calcAns(calc.firstValue, calc.value, calc.operator)),
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

		<div className="calc">
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
													: numberHandler
							} />
					))
				}
			</div>

		</div>

	)
}

export default App;