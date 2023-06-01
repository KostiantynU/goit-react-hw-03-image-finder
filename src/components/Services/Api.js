const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35547171-cae5b6825d0c3932cea30e9cb';

export function getImages() {
  const answer = fetch(`${BASE_URL}key=${API_KEY}`).then(response => {
    console.log(response);
  });
}
