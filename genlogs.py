"""
Générer des logs pour le challenge 3
"""
import os
import random
import datetime
import dotenv

dotenv.load_dotenv()

actions = [
    'Failed login: {username} - {password}',
    'Failed login: {username} - {password}',
    'Failed login: {username} - {password}',
    'Failed login: {username} - {password}',
    'Failed login: {username} - {password}',
    'Failed login: {username} - {password}',
    'Failed login: {username} - {password}',
    'Failed login: {username} - {password}',
    'Successful login: {username}',
    'Successful login: {username}',
    'Successful login: {username}',
    '404 {url} Not found',
    '404 {url} Not found',
    '404 {url} Not found',
    '404 {url} Not found',
    '404 {url} Not found',
    '404 {url} Not found',
    'User {username} logged out',
    'User {username} logged out',
    'User {username} logged out',
    'Server backup completed',
    'Server is up',
    'Server is up',
    'Server is up',
    'Server is up',
    'Server is up',
    'Server is up',
    'Server is up',
    'Server is up',
]

usernames = [
    "RooT",
    "Alice",
    "Alice",
    "Alice",
    "Jean",
    "Jean",
    "Jean",
    "Joe",
    "Pierre",
    "Pierre",
    "Pierre",
    "Kevin",
    "Kevin",
    "Kevin",
    "Kevin",
    "Kevin",
    "Kevin",
    "amin",
    "amin",
    "amin",
    "amin",
    "Yvonne",
    "Yvonne",
    "Yvonne",
    "Yvonne",
    "admin",
    "admin",
    "admin",
    "admin",
    "admin",
    "admin",
    "admin",
    "root",
    "root",
    "root",
    "root",
    "root",
]
passwords = ['12345"6', 'qwe| rty', 'a#})_|zerty', 'azq-erty+12~34', "@dm!n", "[Admin!]!", "ad|^|in123",
             "admin@1234.fr",
             "qefbiu45", "l#b5u^gds", "4*zq!?{zdz", "521zw", '#az&#qfq)fdwx']

urls = ['/flag',
        '/post/10',
        '/post/13',
        '/connexion',
        '/page/1158',
        '/exit',
        '/me',
        '/about',
        '/contact',
        '/register',
        '/admin'
        ]


def get_random_element(arr):
    return random.choice(arr)


def generate_log(initdate, ct):
    action_template = get_random_element(actions)
    if ct == 3245:
        secdate = initdate + datetime.timedelta(seconds=random.randint(41, 123))
        return f"{initdate.isoformat()} - Failed login: rOOt - {os.getenv('PW3')}\n{secdate.isoformat()} - Successful login: RooT"
    elif ct == 0:
        return f"{initdate.isoformat()} - Server started successfully !"
    else:
        action = action_template \
            .replace('{username}', get_random_element(usernames)) \
            .replace('{password}', get_random_element(passwords)) \
            .replace('{url}', get_random_element(urls))
        return f"{initdate.isoformat()} - {action}"


def generate_logs(count):
    tmplogs = []
    initdate = datetime.datetime(2019, 1, 2, 10, 43, 4)
    for ct in range(count):
        tmplogs.append(generate_log(initdate, ct))
        initdate = initdate + datetime.timedelta(minutes=random.randint(10, 800), seconds=random.randint(7, 43))
    return tmplogs


log_count = 7364  # Number of logs to generate
logs = generate_logs(log_count)
with open('www/chall3/logs.txt', 'w') as f:
    f.write('\n'.join(logs))
