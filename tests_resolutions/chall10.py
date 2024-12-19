import requests
import os
import dotenv

dotenv.load_dotenv()
host = "https://chall10.challs.cihoche.fr"


def getseed():
    r = requests.get(host + "/random/getseed")
    return r.text.split("#")[0]


def getfaxed(tokenin):
    r = requests.get(host + '/administration/token/fax?token=' + tokenin,
                     headers={"Cookie": "sessionId=" + os.getenv("CHALL10ADMIN_COOKIE")})
    return r.text.split(':')[2].split(' |')[0]


def fibonacci(n):
    #     return Math.round((1.6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374847540880753868917521266338622235369317931800607667263544333890865959395829056383226613199282902678806752087668925017116962070322210432162695486262963136144381497587012203408058879544547492461856953648644492410 ** n) / Math.sqrt(5))
    return round((
                             1.6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374847540880753868917521266338622235369317931800607667263544333890865959395829056383226613199282902678806752087668925017116962070322210432162695486262963136144381497587012203408058879544547492461856953648644492410 ** n) / (
                             5 ** 0.5))


def calc_salt_from_seed():
    #     parseInt(fibonacci(seed).toString().charAt(3) + fibonacci(seed).toString().charAt(6)) + 16
    seed = int(getseed())
    fib = fibonacci(seed)
    salt = int(str(fib)[3] + str(fib)[6]) + 16
    return salt


def findkey():
    token = int("111111011111101111111", 2)
    seed = calc_salt_from_seed()
    result = int(getfaxed("111111011111101111111"), 2)
    totalkey = result ^ token
    key = totalkey - seed
    print(bin(key))
    return key


def fax(token, key, seed):
    # return Number(parseInt(token, 2) ^ (parseInt(key, 2) + parseInt(fibonacci(seed).toString().charAt(3) + fibonacci(seed).toString().charAt(6)) + 16)).toString(2);
    fib = fibonacci(seed)

    salt = int(str(fib)[3] + str(fib)[6]) + 16
    print(token)
    print((key + salt))
    print(token ^ (key + salt))
    return str(bin(token ^ (key + salt)))[2:]


def auth(key):
    print("start")
    r = requests.get(host + '/administration/verify/token', headers={"Cookie": "sessionId=" + os.getenv("CHALL10ADMIN_COOKIE")})
    # print(fax(int(r.text, 2), key, int(getseed())))
    r2 = requests.post(host + '/administration/verify', data={'result': fax(int(r.text, 2), key, int(getseed()))},
                       headers={"Cookie": "sessionId=" + os.getenv("CHALL10ADMIN_COOKIE")})
    print(r2.text)


print(getfaxed("111111011111101111111"))
auth(findkey())
# get()
