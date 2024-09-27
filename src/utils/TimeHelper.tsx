import moment from 'moment';

let taskRunOnceTimestamp = {};

class TimeHelper {
	state = {
		runOnceInTimestamp: 0,
	};

	getDaysInMonth(month: any, year: any) {
		var date = new Date(year, month, 1);
		var days = [];
		while (date.getMonth() === month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}

		days = days.map((e) => ({
			weekDay: moment(e).format('ddd'),
			day: moment(e).format('DD'),
			date: e
		}));

		return days;
	}

	waitDelay = (miliseconds: number) =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, miliseconds);
		});

	runOnceIn = (id = 'null', miliseconds: number) =>
		(func: any) => {
			let newTimestamp = new Date().getTime();
			if (
				!taskRunOnceTimestamp[id] ||
				newTimestamp - taskRunOnceTimestamp[id] > miliseconds
			) {
				taskRunOnceTimestamp[id] = newTimestamp;
				if (typeof func === 'function') return func();
			}
		};

	isWeekday(date: any) {
		const day = moment(date).isoWeekday();
		return (day === 6 || day === 7);
	}

	numberHourToMoment = (hour: string) => {
		let _hour = String(hour);
		if (_hour.length === 3) _hour = `0${_hour}`;
		return moment(_hour, 'HHmm');
	};

	convertNumberToTime = (data: any) => {
		if (!data) return undefined
		return moment(String(data).padStart(4, '0'), 'HHmm').format("HH:mm")
	}
}

export default new TimeHelper();
