/* eslint-disable react-hooks/exhaustive-deps */
import { onSnapshot, query, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { db } from './Firebase'

const useStoreBackedState = (key, defaultVal = undefined) => {
	key = `store-backed-state-cache:${key}`;
	let cur = defaultVal;
	try {
		if (localStorage.getItem(key))
			cur = JSON.parse(localStorage.getItem(key))
	} catch {}
	const [s, setS] = useState(cur);
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(s))
	}, [s]);

	return [s, setS]
}
export const RandomQuestionGenerator = () => {
	const [fbQuestions, setFbQuestions] = useStoreBackedState('fb-questions', []);
	const [answer, setAnswer] = useStoreBackedState('user-answer', '');
	const generateRandIdx = () => Math.floor((Math.random() * fbQuestions.length));
	const [randIdx, setRandomIdxRaw] = useStoreBackedState('rand-question-idx', generateRandIdx());
	const setRandomIdx = () => {
		let checkIdx = generateRandIdx()
		if(checkIdx !== randIdx) {
			setRandomIdxRaw(checkIdx)
		}
		else setRandomIdx()
	}

	useEffect(() => {
		const ref = collection(db, 'Pages', 'Page 1', 'Page1 Questions');
		const q = query(ref);
		

		const closer = onSnapshot(q, snap => {
			const res = []
			snap.forEach(d => {
				console.log('the-data', d.data())
				res.push(d.data())
			})
			console.log('res', res)
			setFbQuestions(res)
		})
		


		return closer;
	}, [])

	return (
		<div>
			<div>
				<h1 >{ fbQuestions?.[randIdx]?.title ?? ''  } </h1>
			</div>
			<textarea id='answer' defaultValue={answer} onChange={event => setAnswer(event.target.value)} autoComplete='false'></textarea>
			<button onClick={setRandomIdx}>New Question</button>
		</div>
	)
}