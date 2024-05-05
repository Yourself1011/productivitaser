import { browser } from 'wxt/browser';

const App = () => {
  return (
    <div className='text-center flex flex-col items-center justify-center p-16 h-[400px] w-[400px]'>
        <div className='bg-white p-4 rounded-lg border'>
            <h1 className='mb-2 text-2xl'>Productaser</h1>
            <p className='mb-2 text-[15px]'>Combatting procrastination with pain</p>
            <button onClick={
                () => {
                    browser.runtime.openOptionsPage();
                }
            }
            >
                edit websites
            </button>
        </div>
    </div>
  )
}

export default App