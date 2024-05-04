import { browser } from 'wxt/browser';

const App = () => {
  return (
    <div className='text-center h-full flex flex-col items-center justify-center gap-4'>
        <h1>Productaser</h1>
        <button onClick={
            () => {
                browser.runtime.openOptionsPage();
            }
        }
            className="bg-slate-500 hover:opacity-80 text-white py-2 px-4 rounded-full transition-opacity"
        >
            edit websites
        </button>
    </div>
  )
}

export default App