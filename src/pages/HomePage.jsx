import { useState } from 'react';
import DOMPurify from 'dompurify';

import { API_URL } from '../utils/env'

function HomePage() {
  const [requirements, setRequirements] = useState('');
  const [pdf, setPdf] = useState(null);
  const [result, setResult] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setResult('Loading...');
      const formData = new FormData();
      formData.append('requirements', requirements);
      formData.append('resume', pdf);

      const options = {
        method: 'POST',
        body: formData,
      };

      const response = await fetch(`${API_URL}`, options);

      const responseData = await response.json();
      const sanitizedHTML = DOMPurify.sanitize(responseData.message)
      
      // setResult(responseData.message);
      setResult(sanitizedHTML);

    } catch (e) {
      setResult('error');
      console.error(e);
    }
  }

  function handleRequirementsChange(e) {
    setRequirements(e.target.value);
  }

  function handlePdfChange(e) {
    setPdf(e.target.files[0]);
  }

  return (
    <>
      <header></header>
      <main>
        <section>
          <div className='max-w-7xl mx-auto my-12'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-4'>
                <input
                  type='text'
                  placeholder='Enter requirements'
                  className='border border-black'
                  value={requirements}
                  onChange={handleRequirementsChange}
                  required
                />
                <input
                  type='file'
                  accept='.pdf'
                  onChange={handlePdfChange}
                  required
                />
                <button
                  type='submit'
                  className='bg-red-300'>
                  Submit
                </button>
              </div>
            </form>
            <div>
              <h1>Result</h1>
              <div
                className="result"
                dangerouslySetInnerHTML={{ __html: result }}
              />
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default HomePage;
