export const serverURI = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8000/';

export const imagesURL = (process.env.NODE_ENV === 'production') 
? '/upload/' 
: 'http://localhost:8000/upload/';