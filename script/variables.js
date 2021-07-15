const apiKey ="5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u"; //API KEY para requests.

const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g`
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

const like = document.createElement('img');
const download = document.createElement('img'); 
const maxImg = document.createElement('img');
const userTitle = document.createElement('h4');
const gifTitle = document.createElement('h5');

const logo = document.getElementById('mainLogo')
const favoritos = document.getElementById("favs")
const misGifos = document.getElementById("misGifos")
const gifCreateBtn = document.getElementById("createGif")

const divSearch = document.getElementById("searchContainer");
const inputSearch = document.getElementById("search");
const divSugerencia = document.getElementById("sugerencia");
const cancelSearch = document.createElement('img')
const searchDiv = document.getElementById('searchDiv');
const verMas = document.createElement('img');

const darkModeBtn = document.getElementById("nocturnoDiurnoLi");
const body = document.getElementById("body");
const html = document.getElementById('html');
const diurnoLi = document.getElementById("nocturnoDiurnoLi");
let setDarkMode = localStorage.getItem('darkMode');
const searchesDiv = document.getElementById('searches');
const darkStyle = localStorage.getItem('darkMode')
let mainLogo = document.querySelector("div.mainLogo");
mainLogo.style.cursor='pointer';
let logoTheme =document.createElement("img");
let createGifosBtn = document.getElementById("createGif");

const violetLayer = document.createElement('div');

//Social media:
const facebook = document.getElementById('facebook');
const twitter = document.getElementById('twitter');
const instagram = document.getElementById('instagram');
