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
