run:
	python manage.py runserver

tests:
	python manage.py test

migrations:
	python manage.py migrate crawler zero
	python manage.py makemigrations crawler
	python manage.py migrate crawler

crawl:
	python manage.py crawl
