import { render } from 'react-dom';
import Routes from './routes';
import '../dist/css/style.css';
import { API_KEY } from './config';

// Don't forget the API key!
filepicker.setKey(API_KEY);

render (Routes, document.getElementById('app'));
