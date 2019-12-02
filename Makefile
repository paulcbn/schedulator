run:
	python manage.py runserver

tests:
	python manage.py test

migrations:
	python manage.py migrate crawler zero
	python manage.py makemigrations crawler
	python manage.py migrate crawler
	python manage.py migrate api zero
	python manage.py makemigrations api
	python manage.py migrate api

crawl:
	python manage.py crawl

deploy:
	. venv/bin/activate ; \
	pip install -r requirements.txt ; \
	python manage.py makemigrations ; \
	python manage.py migrate ; \
	python manage.py collectstatic --no-input
	rm -rf web/build
	npm install --prefix web
	npm run-script build --prefix web
	systemctl restart gunicorn.socket
	systemctl restart gunicorn.service
	systemctl restart nginx
