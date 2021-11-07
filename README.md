WearPakau

pip install virtualenv \
virtualenv venv  \
venv\Scripts\activate \
cd WearPakau \
pip install -r  requirements.txt \

***** 
!!!!!!!!!!!!!!!!!!! for development only !!!!!!!!!!!!!! \
cd templates  \
npm install \
cd ..  \
*******************

add credinitals in .env file \
py manage.py makemigrations \
py manage.py migrate \
py manage.py test \
py manage.py runserver