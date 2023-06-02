const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=35547171-cae5b6825d0c3932cea30e9cb';
const ORIENTATION = 'orientation=horizontal';
const IMAGE_TYPE = 'image_type=photo';

export async function getImages(searchString) {
  return await fetch(`${BASE_URL}${API_KEY}&${ORIENTATION}&${IMAGE_TYPE}&${searchString}`).then(
    response => {
      return response.json();
    }
  );
}
// image_type=photo&orientation=horizontal
