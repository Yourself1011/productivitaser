import { browser } from 'wxt/browser';

const App = () => {
  return (
    <div className='text-center flex flex-col items-center justify-center p-16 h-[400px] w-[400px]'>
        <div className='bg-white p-4 rounded-lg border'>
            <h1 className='mb-2 text-2xl'>Productivitazer</h1>
            <p className='mb-2 text-[15px]'>H̶e̶l̶p̶i̶n̶g̶ Forcing you to break your bad habits</p>
            <button onClick={
                () => {
                    browser.runtime.openOptionsPage();
                }
            }
            >
                edit blocked sites
            </button>
        </div>
    </div>
  )
}

export default App