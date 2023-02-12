import Head from 'next/head';
import useData from '../hooks/useData';
import { TableData } from '../components/TableMain';
import { useState } from 'react';
import getIndicatorByDate from './api/getIndicatorByDate';

export default function Home() {
	//USING CUSTOM HOOK
	const { dataAPI, setDataAPI } = useData();
	const [typeIndicator, setTypeIndicator] = useState('');
	const [date, setDate] = useState('');

	//LOADER
	if (!dataAPI) {
		return <div className='loader'>Cargando...</div>;
	}

	const handleSubmit = async e => {
		e.preventDefault();
		if (!typeIndicator || !date) {
			return;
		} else {
			await getIndicatorByDate(typeIndicator, date).then(data =>
				setDataAPI(data)
			);
		}
	};

	return (
		<>
			<Head>
				<title>Currency Advisor</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='main-container'>
				<div className='title-container'>
					<h1 className='title'>Currency Advisor</h1>
					<div className='gift'></div>
				</div>
				<form className='input-container' onSubmit={handleSubmit}>
					<label htmlFor='name-indicator' className='label-input'>
						Ingrese el Codigo: <br />
						<input
							type='text'
							className='input-text'
							id='name-indicator'
							value={typeIndicator}
							onChange={event => setTypeIndicator(event.target.value)}
							required
						/>
					</label>
					<label htmlFor='date-indicator' className='label-input'>
						Ingrese la fecha: <br />
						<input
							className='input-text'
							type='date'
							id='date-indicator'
							value={date}
							onChange={event => setDate(event.target.value)}
							required
						/>
					</label>
					<button className='btn-form' type='submit'>
						Consultar
					</button>
				</form>
				<TableData data={dataAPI} />
			</main>
		</>
	);
}
