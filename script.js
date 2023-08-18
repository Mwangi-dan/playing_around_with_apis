const html_news = document.querySelector('.news-container');

const userform = document.querySelector('#userform');
const cpair = document.querySelector('.cpair');
const button = document.querySelector('.button');

userForm.addEventListener("submit", async function(event) {
	event.preventDefault();
	const banner = document.querySelector('.title-c');
	banner.style.display = 'block';
	const selectOption1 = document.getElementById("selectOption1");
	const selectOption2 = document.getElementById("selectOption2");
	const cpair = document.querySelector('.cpair');


	const currency1 = selectOption1.value;
	const currency2 = selectOption2.value
	cpair.innerHTML = `${currency1}/${currency2}`;

	const url = `https://real-time-finance-data.p.rapidapi.com/currency-news?from_symbol=${currency1}&to_symbol=${currency2}&language=en`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '9fb66d6a18mshf0801c4fdb009cep14b82ejsnd0804f5c1798',
			'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
		}
	};

	async function getNews() {
		await fetch(url, options)
		.then(response => response.json())
		.then(newsData => {
			const news = newsData.data;
			const news_list = news.news;

			news_list.forEach(news => {
			var news_item = document.createElement('div');
			news_item.classList.add('news-item');

			var news_item_link = document.createElement('a');

			var news_title = document.createElement('h3');
			news_title.classList.add('news-title');
			news_title.innerText = news.article_title;

			var news_source = document.createElement('p');
			news_source.classList.add('news-source');
			news_source.innerText = news.source;

			var news_date = document.createElement('p');
			news_date.classList.add('news-date');
			news_date.innerText = news.post_time_utc.split(" ")[0];

			var img = document.createElement('img');
			img.src = news.article_photo_url;
			img.classList.add('news-img');

			var textBox = document.createElement('div');
			textBox.classList.add('text-box');
			textBox.appendChild(news_title);
			textBox.appendChild(news_source);
			textBox.appendChild(news_date);

			news_item.appendChild(img);
			news_item.appendChild(textBox);

			news_item_link.href = news.article_url;
			news_item_link.target = '_blank';
			news_item_link.appendChild(news_item);

			html_news.appendChild(news_item_link);
		});
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});


		setTimeout(() => {
            const footer = document.getElementById("footer");
            footer.style.display = "block";
        }, 2000);
	}

	getNews();


});