import { RandomQuestionGenerator } from './RandomQuestionGenerator'

function App() {

  return (
    <div className='bg-gradient-to-br from-yellow-800 to-amber-800 min-h-screen flex justify-center items-center flex-row no-scrollbar'>
      <div className='no-scrollbar' >
        <RandomQuestionGenerator/>
      </div>
    </div>
  );
}


export default App;