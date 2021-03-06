// 라이브러리 로드
// import 변수명 from '라이브러리 이름'

// axios는 지속적으로 관리가 잘 되는 라이브러리라 내부적으로 타입 정의가 되어 있음.
import axios, { AxiosResponse } from 'axios';

// Could not find a declaration file for module 'chart.js'. '/Users/seolranlee/study/typescript/learn-typescript/project/node_modules/chart.js/dist/Chart.js' implicitly has an 'any' type.
// Try `npm i --save-dev @types/chart.js` if it exists or add a new declaration (.d.ts) file containing `declare module 'chart.js';`ts(7016)
// axios에 반해 chart.js는 그렇지 못함.

// Chart.js는 common.js기반의 형태로 구현된 라이브러리 => * as Chart로 가져온다.
import * as Chart from 'chart.js';

// 변수, 함수 임포트 문법
// import {} from '파일 상대 경로'

// 타입 모듈
import {
  CovidStatus,
  CovidSumaryResponse,
  CountrySummaryResponse,
  Country,
} from './covid/index';
// utils

// querySelector helper함수
// function $(selector: string): Element
// 타입추론으로 Element타입 반환
function $(selector: string) {
  return document.querySelector(selector);
}
function getUnixTimestamp(date: Date | string) {
  return new Date(date).getTime();
}

// DOM
// let a: Element | HTMLElement | HTMLParagraphElement;
const confirmedTotal = $('.confirmed-total') as HTMLSpanElement;
// 서로 호환할 수 있는 형태가 아님.
// HTMLParagraphElement = ELEMENT
// HTMLParagraphElement는 ELEMENT 타입이 더 구체화된 구조체이므로.
// const deathsTotal: HTMLParagraphElement = $('.deaths');
const deathsTotal = $('.deaths') as HTMLParagraphElement;
const recoveredTotal = $('.recovered') as HTMLParagraphElement;
const lastUpdatedTime = $('.last-updated-time') as HTMLParagraphElement;
const rankList = $('.rank-list');
const deathsList = $('.deaths-list');
const recoveredList = $('.recovered-list');
const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

function createSpinnerElement(id: string) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center'
  );
  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// state
let isDeathLoading = false;
const isRecoveredLoading = false;

// api
function fetchCovidSummary(): Promise<AxiosResponse<CovidSumaryResponse>> {
  const url = 'https://api.covid19api.com/summary';
  return axios.get(url);
}

function fetchCountryInfo<T>(
  countryName: string,
  status: CovidStatus
): Promise<AxiosResponse<T>> {
  // status params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryName}/status/${status}`;
  return axios.get(url);
}

// methods
function startApp() {
  setupData();
  initEvents();
}

// events
function initEvents() {
  rankList.addEventListener('click', handleListClick);
}

async function handleListClick(event: MouseEvent) {
  let selectedId;
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement.id;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const { data: deathResponse } = await fetchCountryInfo<
    CountrySummaryResponse<CovidStatus.Deaths>[]
  >(selectedId, CovidStatus.Deaths);
  const { data: recoveredResponse } = await fetchCountryInfo<
    CountrySummaryResponse<CovidStatus.Recovered>[]
  >(selectedId, CovidStatus.Recovered);
  const { data: confirmedResponse } = await fetchCountryInfo<
    CountrySummaryResponse<CovidStatus.Confirmed>[]
  >(selectedId, CovidStatus.Confirmed);
  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}

function setDeathsList(data: CountrySummaryResponse<CovidStatus.Deaths>[]) {
  const sorted = data.sort(
    (
      a: CountrySummaryResponse<CovidStatus.Deaths>,
      b: CountrySummaryResponse<CovidStatus.Deaths>
    ) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value: CountrySummaryResponse<CovidStatus.Deaths>) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    deathsList.appendChild(li);
  });
}

function clearDeathList() {
  deathsList.innerHTML = null;
}

function setTotalDeathsByCountry(
  data: CountrySummaryResponse<CovidStatus.Deaths>[]
) {
  deathsTotal.innerText = data[0].Cases.toString();
}

function setRecoveredList(
  data: CountrySummaryResponse<CovidStatus.Recovered>[]
) {
  const sorted = data.sort(
    (
      a: CountrySummaryResponse<CovidStatus.Recovered>,
      b: CountrySummaryResponse<CovidStatus.Recovered>
    ) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value: CountrySummaryResponse<CovidStatus.Recovered>) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'recovered');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    recoveredList.appendChild(li);
  });
}

function clearRecoveredList() {
  recoveredList.innerHTML = null;
}

function setTotalRecoveredByCountry(
  data: CountrySummaryResponse<CovidStatus.Recovered>[]
) {
  recoveredTotal.innerText = data[0].Cases.toString();
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

async function setupData() {
  // 객체의 특정 속성에 바로 접근하는 것: 구조 분해 할당: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  const { data } = await fetchCovidSummary();
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: any, labels: any) {
  const lineChart = $('#lineChart') as HTMLCanvasElement;
  const ctx = lineChart.getContext('2d');
  Chart.defaults.color = '#f5eaea';
  Chart.defaults.font.family = 'Exo 2';
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data,
        },
      ],
    },
    options: {},
  });
}

function setChartData(data: any) {
  const chartData = data.slice(-14).map((value: any) => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map((value: any) =>
      new Date(value.Date).toLocaleDateString().slice(5, -1)
    );
  renderChart(chartData, chartLabel);
}

// reduce: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// const heroes = [{name: 'capt', age: 100}, {name: 'thor', age: 1000}]
// heroes.reduce((total, currentItem) => {
//     total = total + currentItem.age
//     return total
// }, 0)

function setTotalConfirmedNumber(data: CovidSumaryResponse) {
  confirmedTotal.innerText = data.Countries.reduce(
    // ts가 추론해줌: (method) Array<Country>.reduce<any>(callbackfn: (previousValue: any, currentValue: Country, currentIndex: number, array: Country[]) => any, initialValue: any): any (+2 overloads)
    (total: number, current: Country) => (total += current.TotalConfirmed),
    0
  ).toString();
}

function setTotalDeathsByWorld(data: CovidSumaryResponse) {
  deathsTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalDeaths),
    0
  ).toString();
}

function setTotalRecoveredByWorld(data: CovidSumaryResponse) {
  recoveredTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalRecovered),
    0
  ).toString();
}

function setCountryRanksByConfirmedCases(data: CovidSumaryResponse) {
  const sorted = data.Countries.sort(
    (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed
  );
  sorted.forEach((value: Country) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);
    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed.toString();
    span.setAttribute('class', 'cases');
    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: CovidSumaryResponse) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
