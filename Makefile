run:
	python manage.py runserver

tests:
	python manage.py test

migrations:
	cd schedulator_backend ; \
	python manage.py makemigrations ; \
	python manage.py makemigrations scs_auth ; \
	python manage.py makemigrations crawler ; \
	python manage.py makemigrations api_core ; \
	python manage.py makemigrations api_reset_timetable ; \
	python manage.py makemigrations api_current_timetable ; \
	python manage.py makemigrations api_current_semester_status ; \
	python manage.py makemigrations api_static_timetables ; \
	python manage.py makemigrations api_enrollment_manager ; \
	python manage.py makemigrations api_export_timetable ; \
	python manage.py makemigrations api_custom_timetable_entries ; \
	python manage.py migrate	

crawl:
	cd schedulator_backend ; \
	python manage.py crawl ; \
	python manage.py formationtypes ; \
	python manage.py alias ; \
	python manage.py generatestatictables

deploy:
	cd schedulator_backend ; \
	. venv/bin/activate ; \
	pip install -r requirements.txt ; \
	python manage.py makemigrations ; \
	python manage.py migrate ; \
	python manage.py collectstatic --no-input
	rm -rf schedulator_frontend/build
	npm install --prefix schedulator_frontend
	npm run-script build --prefix schedulator_frontend
	systemctl restart gunicorn.socket
	systemctl restart gunicorn.service
	systemctl restart nginx
