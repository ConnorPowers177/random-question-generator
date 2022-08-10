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
		<div className='text-center items-center mx-auto' >
			<div className='bg-amber-900 lg:mb-4 mb-2 lg:w-48 lg:h-24 w-36 h-16 mx-auto shadow-xl ' >
				<h1 className='text-tiny text-slate-50' >{ fbQuestions?.[randIdx]?.title ?? ''  } </h1>
			</div>
			<textarea id='answer' defaultValue={answer} onChange={event => setAnswer(event.target.value)} autoComplete='false' className='flex mx-auto lg:w-64 lg:h-32 w-48 h-24 text-tiny rounded-lg border-none border-transparent focus:border-transparent focus:ring-0 focus:ring-transparent outline-none border-transparent focus:ring-0 focus:ring-transparent border border-sky-500 shadow-xl' ></textarea>
			<button onClick={setRandomIdx} className='flex mt-2 mx-auto px-1 py-0.25 lg:px-4 lg:py-1 border-none lg:text-lg rounded-full text-center text-slate-50 transition ease-in-out delay-150 bg-sky-600 hover:bg-sky-500 duration-300 shadow-xl' >New Question</button>
		</div>
	)
}