import axios from 'axios';

const test = () => {
    return (
        <>
            <button
                style={{ height: '100px' }}
                type="button"
                onClick={() => {
                    throw new Error('Sentry Frontend Error');
                }}
            >
                Throw error
            </button>
            <button onClick={() => axios.post('/api/test', {})}>send to handler</button>
        </>
    );
};

export default test;
