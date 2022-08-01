# Getting Started to lunch the server

''' Activating the environment '''
> py -3 -m venv venv
> venv\Scripts\activate

''' Install flask if not installed yet'''
>pip install Flask

''' setting up the environment '''
> set FLASK_APP=gtp_back
> set FLASK_ENV=development

''' launching server '''
> flask run

### Working Routes

" /register " to register a new user
" /login " to login and get the token
" /logout " 